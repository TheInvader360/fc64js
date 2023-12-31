const img = [
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 6, 7, 7, 6, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 6, 0, 4, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 7, 6, 7, 7, 6, 7, 6, 6, 7, 6, 7, 6, 7, 7, 7, 7, 7, 7, 6, 6, 7, 6, 7, 6, 7, 7, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 6, 2, 6, 2, 6, 6, 7, 6, 2, 6, 7, 6, 7, 6, 6, 7, 6, 7, 6, 6, 7, 6, 7, 6, 6, 6, 6, 7, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 6, 2, 7, 6, 7, 6, 2, 6, 7, 6, 6, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 6, 2, 7, 6, 7, 6, 7, 6, 6, 7, 6, 6, 7, 6, 6, 7, 6, 7, 6, 7, 2, 6, 7, 6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 7, 2, 7, 6, 2, 7, 2, 2, 6, 2, 6, 2, 6, 7, 6, 6, 7, 6, 6, 2, 6, 7, 6, 6, 2, 6, 6, 7, 6, 7, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 5, 0,
   7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 7, 7, 7, 2, 7, 2, 6, 2, 6, 2, 6, 7, 6, 7, 2, 6, 2, 7, 6, 7, 6, 7, 6, 7, 6, 7, 6, 6, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 6, 0, 0, 4, 0,
   7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 2, 7, 6, 7, 6, 2, 6, 6, 2, 6, 2, 6, 2, 7, 2, 6, 7, 6, 7, 6, 7, 6, 6, 0, 0, 0, 0, 0, 6, 0, 6, 5, 0, 4, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 2, 2, 2, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 6, 2, 6, 2, 6, 7, 6, 7, 2, 7, 2, 2, 6, 2, 2, 7, 6, 7, 6, 2, 7, 6, 6, 0, 0, 4, 0, 5, 0, 6, 7, 6, 0, 7, 4, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 2, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 2, 7, 6, 7, 6, 2, 2, 6, 2, 6, 2, 7, 2, 6, 7, 2, 6, 2, 7, 6, 6, 6, 7, 0, 0, 0, 0, 0, 4, 0, 4, 0, 7, 4, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 2, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 7, 2, 7, 6, 7, 6, 2, 7, 6, 6, 6, 7, 6, 7, 2, 6, 2, 7, 2, 7, 2, 6, 2, 0, 0, 0, 0, 0, 0, 0, 6, 0, 4, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 6, 2, 7, 2, 6, 2, 2, 7, 6, 2, 7, 6, 7, 2, 6, 2, 2, 7, 2, 6, 2, 6, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 6,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 7, 2, 7, 6, 7, 2, 2, 6, 2, 2, 6, 7, 2, 2, 7, 2, 6, 2, 7, 2, 2, 6, 7, 7, 7, 7, 6, 0, 0, 0, 0, 0, 0, 7, 5, 7,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 2, 7, 6, 7, 6, 7, 6, 7, 2, 7, 2, 2, 2, 2, 2, 2, 7, 2, 6, 7, 2, 7, 6, 7, 7, 2, 7, 0, 6, 0, 0, 6, 0, 4, 0, 6,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 7, 2, 6, 2, 7, 6, 2, 7, 6, 2, 2, 7, 2, 2, 2, 2, 7, 2, 2, 7, 2, 7, 7, 7, 7, 7, 6, 2, 7, 6, 0, 6, 0, 7, 4, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 2, 7, 6, 2, 2, 7, 2, 2, 7, 6, 2, 7, 2, 7, 2, 6, 2, 7, 2, 7, 7, 7, 7, 2, 6, 2, 7, 6, 7, 7, 7, 4, 0, 6, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 2, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 7, 2, 7, 2, 2, 2, 6, 2, 2, 7, 2, 6, 2, 2, 7, 2, 2, 7, 2, 2, 7, 7, 7, 2, 7, 2, 2, 2, 6, 7, 6, 0, 0, 6, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 0, 2, 2, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 2, 2, 2, 2, 2, 7, 2, 2, 7, 2, 6, 2, 2, 7, 2, 2, 2, 7, 2, 7, 2, 7, 7, 7, 7, 2, 2, 7, 2, 7, 2, 7, 7, 0, 4, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 7, 0, 3, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 6, 7, 2, 7, 2, 2, 7, 2, 2, 2, 2, 7, 2, 2, 2, 7, 2, 2, 2, 0, 7, 2, 2, 6, 7, 7, 7, 2, 2, 2, 2, 7, 2, 7, 6, 0, 6,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 7, 7, 2, 7, 7, 2, 7, 7, 7, 2, 0, 2, 7, 2, 7, 7, 7, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 7, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 7, 2, 7, 2, 7, 2, 7, 2, 2, 2, 2, 2, 0, 0, 7, 0, 2, 7, 2, 7, 2, 2, 7, 2, 7, 7, 7, 2, 2, 7, 2, 2, 7, 2, 6, 0,
   0, 4, 0, 6, 0, 0, 0, 0, 0, 0, 2, 7, 2, 7, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 7, 7, 2, 2, 7, 2, 7, 2, 6, 2, 6, 2, 2, 2, 7, 7, 2, 7, 7, 2, 7,
   7, 7, 5, 5, 6, 0, 0, 0, 0, 0, 7, 6, 7, 2, 7, 2, 2, 2, 2, 2, 0, 2, 2, 2, 7, 2, 2, 7, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 7, 2, 7, 2, 2, 2, 7, 2, 2, 7, 2, 2,
   4, 7, 6, 5, 0, 0, 0, 0, 7, 6, 7, 2, 7, 2, 2, 2, 7, 2, 7, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 7, 2, 2, 0, 2, 2, 7, 2, 7, 2, 6,
   4, 4, 0, 6, 0, 0, 0, 0, 7, 7, 2, 7, 2, 7, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 7, 2, 2, 0, 2, 2, 2, 0, 2, 7, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 7, 2, 2, 2, 2, 2, 7, 2, 7,
   6, 0, 4, 0, 0, 0, 0, 7, 2, 7, 6, 7, 2, 2, 2, 7, 0, 2, 7, 0, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 7, 0,
   0, 7, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 0, 2, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 7, 2, 2, 0, 7, 2, 2, 7, 0,
   0, 0, 6, 0, 0, 0, 7, 7, 2, 7, 2, 2, 7, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 7, 7,
   5, 7, 5, 7, 5, 2, 2, 7, 0, 2, 7, 2, 7, 2, 7, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2, 7, 0, 6, 0, 7,
   6, 4, 6, 0, 4, 0, 7, 2, 2, 7, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 0, 3, 7, 0, 7,
   0, 4, 0, 0, 6, 0, 2, 0, 2, 2, 7, 2, 7, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 7, 2, 2, 0, 5, 1, 7, 0,
   7, 0, 0, 0, 0, 6, 2, 7, 2, 7, 2, 2, 2, 2, 7, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 3, 5, 1, 7,
   4, 7, 7, 0, 0, 7, 2, 7, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 5, 7, 0,
   7, 4, 7, 0, 0, 6, 3, 0, 2, 0, 2, 2, 2, 2, 0, 2, 7, 2, 0, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 1, 0, 7,
   6, 5, 6, 0, 0, 7, 5, 3, 0, 0, 0, 2, 7, 2, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 7, 2, 3, 5, 1, 0,
   0, 4, 0, 5, 0, 7, 1, 0, 7, 2, 2, 2, 2, 7, 0, 2, 0, 2, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 0, 7, 0, 5,
   0, 6, 0, 7, 0, 7, 7, 0, 7, 2, 2, 0, 2, 2, 2, 7, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 1, 7, 0,
   4, 0, 4, 7, 5, 7, 1, 0, 2, 2, 7, 2, 2, 7, 0, 0, 0, 2, 0, 0, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 3, 5, 0, 0,
   6, 4, 0, 0, 7, 7, 0, 7, 2, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 2, 2, 0, 0, 2, 0, 2, 7, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 3, 0, 7, 0,
   6, 0, 4, 7, 5, 1, 7, 2, 2, 7, 2, 2, 2, 2, 7, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 7, 0, 4,
   0, 0, 0, 0, 7, 0, 7, 2, 7, 0, 2, 2, 2, 2, 2, 7, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 7, 0, 0,
   0, 0, 0, 0, 7, 1, 2, 7, 0, 2, 2, 2, 7, 2, 0, 6, 0, 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 0, 7, 4,
   6, 5, 0, 0, 5, 0, 2, 2, 2, 0, 7, 2, 2, 2, 0, 6, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 7, 2, 2, 2, 2, 0, 6,
   0, 6, 0, 0, 1, 7, 2, 7, 2, 2, 2, 7, 2, 0, 7, 2, 0, 6, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 7, 0, 6, 5,
   4, 0, 5, 0, 1, 2, 2, 7, 0, 2, 7, 2, 0, 2, 0, 7, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 2, 6, 0, 0, 6,
   7, 0, 0, 0, 5, 0, 0, 2, 2, 2, 7, 2, 7, 0, 7, 2, 6, 0, 6, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0,
   7, 7, 0, 0, 3, 2, 7, 7, 2, 2, 2, 2, 2, 0, 7, 0, 6, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 6, 0, 6, 4, 0,
   0, 4, 0, 0, 5, 2, 0, 2, 7, 2, 2, 7, 0, 7, 2, 0, 7, 6, 0, 0, 0, 0, 7, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 6, 0, 5, 6, 0, 5, 0,
   0, 0, 0, 0, 1, 2, 7, 2, 7, 2, 2, 2, 0, 0, 7, 0, 2, 7, 6, 2, 0, 0, 7, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0,
   4, 6, 0, 5, 7, 2, 2, 0, 2, 2, 0, 7, 0, 6, 0, 2, 7, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 7, 0, 4, 0, 4, 6, 0, 6, 0,
   0, 6, 6, 5, 7, 0, 2, 7, 2, 2, 0, 2, 7, 0, 7, 0, 7, 6, 0, 6, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 0, 7, 0, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 6, 0, 0, 0, 4, 0, 4, 0, 0,
   7, 4, 7, 7, 7, 0, 2, 0, 2, 2, 7, 6, 0, 6, 0, 6, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 7, 7, 7, 7, 0, 2, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 7, 0, 0, 4, 0, 0, 0, 6, 0, 0, 0,
   0, 4, 6, 5, 6, 0, 7, 2, 0, 2, 0, 7, 2, 0, 0, 7, 0, 7, 6, 2, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0, 7, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 4, 0, 0,
   6, 0, 6, 5, 6, 7, 0, 2, 7, 0, 7, 6, 0, 0, 2, 0, 6, 0, 0, 0, 0, 0, 6, 2, 2, 2, 2, 0, 7, 7, 0, 7, 7, 7, 0, 7, 0, 0, 0, 0, 7, 0, 7, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0,
   4, 0, 6, 0, 4, 0, 0, 0, 7, 0, 7, 2, 6, 7, 0, 0, 2, 0, 6, 6, 0, 0, 0, 0, 2, 0, 2, 0, 7, 7, 0, 0, 7, 7, 0, 7, 7, 7, 7, 0, 7, 0, 7, 0, 7, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0,
   0, 6, 0, 4, 0, 0, 7, 7, 2, 0, 7, 0, 7, 2, 0, 6, 0, 6, 0, 0, 0, 0, 7, 2, 0, 2, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 7, 0, 7, 0, 7, 0, 7, 7, 0, 0, 7, 0, 7, 0, 7, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0,
];
