import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { pathNormalize } from './pathNormalize.js';
import zlib from 'zlib';

export const decompress = async (cwd, filePath, fileDest) => {
  try {
    const pathIn = await pathNormalize(cwd, filePath);
    const pathOut = await pathNormalize(cwd, fileDest);

    const int = createReadStream(pathIn);
    const out = createWriteStream(pathOut);
    const brotli = zlib.createBrotliDecompress();

    // const stream = int.pipe(unzip).pipe(out);
    pipeline(int, brotli, out, (err) => {
      if (err) {
        console.log('Operation failed');
      }
    });
  } catch (err) {
    console.log('Operation failed');
  }
};
