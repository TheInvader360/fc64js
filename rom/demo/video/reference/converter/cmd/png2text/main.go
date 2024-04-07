package main

import (
	"errors"
	"flag"
	"fmt"
	"image/png"
	"os"
	"path/filepath"
	"strings"

	"converter/png2text"
)

func main() {
	imagePath := flag.String("source", "fixtures/image/palette.png", "source image path")
	outDir := flag.String("outdir", "output/", "output directory path")
	flag.Parse()

	inFilename := filepath.Base(*imagePath)
	outPathFilename := fmt.Sprintf("%s/%s.txt", strings.TrimSuffix(*outDir, "/"), strings.TrimSuffix(inFilename, filepath.Ext(inFilename)))

	inFile, err := os.Open(*imagePath)
	if err != nil {
		panic(err)
	}
	defer inFile.Close()

	image, err := png.Decode(inFile)
	if err != nil {
		panic(err)
	}

	source := png2text.NewTranspiler(image).Transpile()
	if len(source) == 0 {
		panic(errors.New("zero length output"))
	}
	err = os.WriteFile(outPathFilename, []byte(source), 0777)
	if err != nil {
		panic(err)
	}
}
