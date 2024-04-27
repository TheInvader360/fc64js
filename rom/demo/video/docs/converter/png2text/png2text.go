package png2text

import (
	"image"
)

type Transpiler struct {
	image image.Image // source image
}

func NewTranspiler(image image.Image) *Transpiler {
	return &Transpiler{
		image: image,
	}
}

func (t *Transpiler) Transpile() string {
	source := ""
	bounds := t.image.Bounds()
	for y := 0; y < bounds.Max.Y; y++ {
		for x := 0; x < bounds.Max.X; x++ {
			r, g, b, _ := t.image.At(x, y).RGBA()
			r = r >> 8
			g = g >> 8
			b = b >> 8
			if r == 0 && g == 0 && b == 0 {
				source += "0," // #000000
			}
			if r == 34 && g == 34 && b == 34 {
				source += "1," // #222222
			}
			if r == 68 && g == 68 && b == 68 {
				source += "2," // #444444
			}
			if r == 102 && g == 102 && b == 102 {
				source += "3," // #666666
			}
			if r == 136 && g == 136 && b == 136 {
				source += "4," // #888888
			}
			if r == 170 && g == 170 && b == 170 {
				source += "5," // #aaaaaa
			}
			if r == 204 && g == 204 && b == 204 {
				source += "6," // #cccccc
			}
			if r == 238 && g == 238 && b == 238 {
				source += "7," // #eeeeee
			}
		}
	}
	return source
}
