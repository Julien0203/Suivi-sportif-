// Usage : swiftc -O tools/cutout.swift -o /tmp/cutout && /tmp/cutout photo.jpg img/exos/mon-exo.jpg 400 F4F4F4
// Détoure le sujet (personne + agrès tenus) d'une photo et le pose sur fond blanc, recadré et carré.
import Foundation
import Vision
import CoreImage
import CoreImage.CIFilterBuiltins
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count >= 3 else { print("usage: cutout in.jpg out.jpg [size]"); exit(1) }
let inURL = URL(fileURLWithPath: args[1]), outURL = URL(fileURLWithPath: args[2])
let size = args.count > 3 ? CGFloat(Double(args[3]) ?? 512) : 512
// couleur de fond facultative (hex RRGGBB), blanc par défaut
let hex = args.count > 4 ? args[4] : "FFFFFF"
let hv = Int(hex, radix: 16) ?? 0xFFFFFF
let bgColor = CIColor(red: CGFloat((hv >> 16) & 255)/255, green: CGFloat((hv >> 8) & 255)/255, blue: CGFloat(hv & 255)/255)

guard let src = CIImage(contentsOf: inURL) else { print("read fail"); exit(2) }
let handler = VNImageRequestHandler(ciImage: src)
let req = VNGenerateForegroundInstanceMaskRequest()
do { try handler.perform([req]) } catch { print("vision fail \(error)"); exit(3) }
guard let obs = req.results?.first else { print("no subject"); exit(4) }
let maskBuf = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
let mask = CIImage(cvPixelBuffer: maskBuf)

// sujet sur fond blanc
let white = CIImage(color: bgColor).cropped(to: src.extent)
let blend = CIFilter.blendWithMask()
blend.inputImage = src; blend.backgroundImage = white; blend.maskImage = mask
var out = blend.outputImage!.cropped(to: src.extent)

// boîte englobante du masque → recadrage carré avec marge
let ctx = CIContext()
let mCG = ctx.createCGImage(mask, from: mask.extent)!
let w = mCG.width, h = mCG.height
var minX = w, minY = h, maxX = 0, maxY = 0
let data = CFDataGetBytePtr(mCG.dataProvider!.data)!
let bpr = mCG.bytesPerRow, bpp = mCG.bitsPerPixel / 8
for y in 0..<h { for x in 0..<w { if data[y*bpr + x*bpp] > 40 { minX = min(minX,x); maxX = max(maxX,x); minY = min(minY,y); maxY = max(maxY,y) } } }
if maxX <= minX { minX = 0; minY = 0; maxX = w-1; maxY = h-1 }
let bw = CGFloat(maxX - minX), bh = CGFloat(maxY - minY)
var side = max(bw, bh) * 1.12
let cx = CGFloat(minX) + bw/2, cyTop = CGFloat(minY) + bh/2
let cy = CGFloat(h) - cyTop   // CoreImage : origine en bas
var rect = CGRect(x: cx - side/2, y: cy - side/2, width: side, height: side)
// étend le fond blanc si le carré dépasse l'image
let canvas = CIImage(color: bgColor).cropped(to: rect.union(src.extent))
out = out.composited(over: canvas).cropped(to: rect)
let scale = size / side
out = out.transformed(by: CGAffineTransform(translationX: -rect.minX, y: -rect.minY)).transformed(by: CGAffineTransform(scaleX: scale, y: scale))
let cg = ctx.createCGImage(out, from: CGRect(x: 0, y: 0, width: size, height: size))!
let dest = CGImageDestinationCreateWithURL(outURL as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, cg, [kCGImageDestinationLossyCompressionQuality: 0.78] as CFDictionary)
CGImageDestinationFinalize(dest)
print("ok \(outURL.lastPathComponent)")
