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
    const unzip = zlib.createUnzip();

    pipeline(int, unzip, out, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Decompress success');
      }
    });
  } catch (err) {
    console.log(err);

    console.log('Operation failed');
  }
};
