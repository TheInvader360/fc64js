# based on https://stackoverflow.com/questions/65185061/how-to-get-a-list-of-frequencies-in-a-wav-file

import sys
from scipy.io import wavfile as wav
import numpy as np

if len(sys.argv) != 3:
    print("Usage: {0} <filename> <segment-duration-millis>".format(sys.argv[0]))
    print("Example: python3 {0} ./samples/sfxCoin.wav 50".format(sys.argv[0]))
    sys.exit(1)

filename = sys.argv[1]
segmentDurationMillis = int(sys.argv[2])
rate, data = wav.read(filename)

# calculate the length of our segments in the np.array using sample rate
segmentLength = int(rate * segmentDurationMillis / 1000)
# total number of segments in the audio data
segmentCount = int(len(data) / segmentLength)

def getFrequencyHzForSegment(segmentIndex):
    # start and end positions of the segment
    start = (segmentLength * segmentIndex)
    end = (start + segmentLength)
    # extract segment from the audio data
    sliced = data[start:end]
    w = np.fft.fft(sliced)
    frequencies = np.fft.fftfreq(len(w))
    # find the peak in the coefficients
    idx = np.argmax(np.abs(w))
    frequency = frequencies[idx]
    frequencyHz = abs(frequency * rate)
    return frequencyHz

segmentFrequencies = [getFrequencyHzForSegment(segmentIndex) for segmentIndex in range(segmentCount)]

print("{0} - {1}ms segment frequencies:\n{2}".format(sys.argv[1], sys.argv[2], str(segmentFrequencies)))
