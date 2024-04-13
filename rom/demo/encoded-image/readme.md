# Encoded Image (fc64js demo rom)

An encoded image demo rom for the [fc64js](https://github.com/TheInvader360/fc64js) fantasy console

* By default an image is drawn using an unencoded pixel color array (i.e. what ```DrawImage()``` expects as an argument after ```x```, ```y```, ```width```, and ```height```)
* If A is pressed exactly the same image is drawn, but the pixel color data will have been decoded from a [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) encoded string
* If B is pressed exactly the same image is drawn, but the pixel color data will have been decoded from a [Base64](https://en.wikipedia.org/wiki/Base64) encoded string

To give an idea of the space savings involved - the example parrot image (30x30px, 8 colors, 130 transparent pixels) takes up 2,764 bytes when saved to file in a nicely formatted integer array "grid", 1,932 bytes as an integer array stripped of all whitespace and the trailing comma, 903 bytes as a hex encoded string, and 603 bytes as a b64 encoded string

[Live preview](https://theinvader360.github.io/fc64js/rom/demo/encoded-image/)

## Example

Nicely formatted integer array grid (333 bytes):

```js
[
  -1,-1,-1, 0, 0, 0, 0,-1,-1,-1,
  -1,-1, 0, 7, 7, 7, 7, 0,-1,-1,
  -1, 0, 7, 7, 7, 7, 7, 7, 0,-1,
   0, 7, 7, 0, 7, 7, 0, 7, 7, 0,
   0, 7, 7, 0, 7, 7, 0, 7, 7, 0,
   0, 7, 7, 7, 7, 7, 7, 7, 7, 0,
   0, 7, 7, 0, 7, 7, 0, 7, 7, 0,
  -1, 0, 7, 7, 0, 0, 7, 7, 0,-1,
  -1,-1, 0, 7, 7, 7, 7, 0,-1,-1,
  -1,-1,-1, 0, 0, 0, 0,-1,-1,-1,
]
```

The same integer array stripped of whitespace and trailing comma (225 bytes):

```js
[-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,0,7,7,7,7,0,-1,-1,-1,0,7,7,7,7,7,7,0,-1,0,7,7,0,7,7,0,7,7,0,0,7,7,0,7,7,0,7,7,0,0,7,7,7,7,7,7,7,7,0,0,7,7,0,7,7,0,7,7,0,-1,0,7,7,0,0,7,7,0,-1,-1,-1,0,7,7,7,7,0,-1,-1,-1,-1,-1,0,0,0,0,-1,-1,-1]
```

The same integer array as a hex encoded string (102 bytes):

```js
'fff0000fffff077770fff07777770f0770770770077077077007777777700770770770f07700770fff077770fffff0000fff'
```

The same integer array as a b64 encoded string (69 bytes):

```js
'//AAD///B3dw//B3d3cPB3B3B3AHcHcHcAd3d3dwB3B3B3DwdwB3D/8Hd3D///AAD/8'
```

## ~~FAQ~~ Questions that nobody has asked

**Q: What's the point?**

**A:** The aim is to offer a means of reducing rom file sizes without impacting image quality

**Q: Does encoding then decoding degrade the image in any way?**

**A:** No, this method is completely lossless - the resulting image data having encoded then decoded is exactly the same as the original source data

**Q: Could you reduce file sizes further by using different encoding strategies?**

**A:** Yes, a larger alphabet would result in smaller encoded data. Base64 is nice as it only relies on a very small set of ascii characters that are ubiquitous and weigh in at a single byte each

**Q: Could you reduce file sizes further by binary encoding the data?**

**A:** Maybe binary data would be smaller, but hex/b64 encoded strings are easily handled by javascript, source control, and to some degree human brains...

**Q: Could you reduce file sizes further by only encoding the 3 color bits for each pixel?**

**A:** In some scenarios just the 3 bits would be enough, but as soon as you need the ability to mark pixels as "transparent" you need a fourth bit. Packing the data for two 4 bit pixels into each byte is probably a lot easier to follow than packing the data for eight 3 bit pixels into sets of 3 bytes too...

**Q: 8 colors plus a no draw option per pixel - doesn't that leave some unused space if packing the data for 2 pixels into each byte?**

**A:** It sure does! 4 binary digits offer 16 possibilities (2^4), 8 slots are used to specify the pixel's color, 1 slot is used to specify transparency, 7 slots are unused. This allows scope to extend the fc64js palette in future while remaining 100% backwards compatible

**Q: Any plans to extend the color palette?**

**A:** The default fc64js color palette matches the 8 "bright" zx spectrum colors. The full [zx spectrum palette](https://en.wikipedia.org/wiki/ZX_Spectrum_graphic_modes#/media/File:Zx-colors.png) is ostensibly 16 colors - 8 bright, 8 non-bright, however bright and non-bright black are both #000 (while bright/non-bright white are actually white and a shade of grey), so really it's 15 colors. fc64js could match the full zx spectrum palette by default and still offer transparency support using just 4 bits per pixel. This is a change I might be tempted to make in the future...

**Q: Could you reduce file sizes further using compression?**

**A:** Probably, but hex/b64 string encoding offers huge (comparatively speaking) space savings, for very low effort, and in an easy to understand way. Since fc64js roms are likely to have very few images, and all of them are likely to be very small, this is almost certainly good enough

**Q: What's the performance like?**

**A:** I haven't gone to the effort of trying to measure the overhead, and there has to be *some* overhead, but it's imperceptible. You can mitigate this by decoding image data once only on rom init, as can be seen in the demo. Memory is plentiful on modern machines, and fc64js roms are usually going to be pretty small and with very little image data - this won't be a problem. That said, I've played with the [video demo](https://theinvader360.github.io/fc64js/rom/demo/video/), both decoding all frames up front in ```romInit``` and decoding on the fly each tick in ```romLoop```, and performance was identical to the human eye, even when playing at 1 tick per frame (i.e. the fastest possible 4x speed)

**Q: Are there any disadvantages?**

**A:** I can think of only one, and that's that the nicely formatted integer array grid is somewhat discernible if you squint at it just right - see if you can "see" a smiley face in the example image above. The same is not true of the encoded strings. It's also not true of the stripped integer array

**Q: Should I bother encoding images in my rom?**

**A:** It's up to you. If you have a rom with very little image data in it ([example](https://github.com/TheInvader360/fc64js/blob/main/rom/demo/a-simple-game/main.js)) it's probably not worth the bother. If you have a rom with quite a lot of image data in it ([example](https://github.com/TheInvader360/fc64js/blob/main/rom/demo/video/data.js)) maybe it is worth the bother. An extreme example of 55 full screen images results in a reduction from about 670kb for nicely formatted grids (```(((64×3+3)×64)+3)×55 = 686,565 bytes```) down to about 147kb when b64 encoded (```((2731+6)×55)+3 = 150,538 bytes```) - this is a huge comparative reduction, but in absolute terms a few kilobytes doesn't really amount to much in most scenarios these days...

**Q: How can I encode my images?**

**A:** Very easily, the [fc64js image tool](https://github.com/TheInvader360/fc64js/tree/main/tools/image-tool) has been updated to include both hex and b64 encoded strings in the image summary output. You could also take the encoding functions from there (or the reference notes accompanying this demo) and embed in your own tool chain if you like

**Q: Will a means of drawing encoded images be added to the fc64js library?**

**A:** Maybe. If I find that it gets used a lot and the ```hexStringToPixelColors()``` / ```b64StringToPixelColors()``` functions keep getting copied and pasted into lots of roms I might add them to the library itself. In the meantime copy and paste away :D

## Credits

* Code by TheInvader360
