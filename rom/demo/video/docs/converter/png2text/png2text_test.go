package png2text

import (
	"image/png"
	"os"
	"testing"
)

func TestTranspile(t *testing.T) {
	type test struct {
		imagePath      string
		expectedSource string
		tag            string
	}
	tests := []test{
		{imagePath: "../fixtures/palette.png", expectedSource: "0,1,2,3,4,5,6,7,", tag: "palette"},
	}
	for _, tc := range tests {
		imageFile, _ := os.Open(tc.imagePath)
		defer imageFile.Close()
		image, _ := png.Decode(imageFile)
		actualSource := NewTranspiler(image).Transpile()
		if actualSource != tc.expectedSource {
			t.Errorf("expected:%s actual:%s (%s)", tc.expectedSource, actualSource, tc.tag)
		}
	}
}
