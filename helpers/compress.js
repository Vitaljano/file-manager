import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { isExist } from './isExist.js';
import { pathNormalize } from './pathNormalize.js';
import { finished, pipeline } from 'stream';
import path from 'path';

export const compress = async (cwd, filePath, fileDest) => {
  try {
    if (!fileDest && !filePath) {
      console.log('Operation failed');
      return;
    }
    const fileName = path.parse(filePath).name;
    const destPath = path.join(fileDest, fileName + '.br');
    const pathIn = await pathNormalize(cwd, filePath);
    const pathOut = await pathNormalize(cwd, destPath);
    const isFileExist = await isExist(pathIn);

    if (isFileExist.isFile || isFileExist.isDirectory) {
      const int = createReadStream(pathIn);
      const out = createWriteStream(pathOut);
      const brotli = zlib.createBrotliCompress();

      pipeline(int, brotli, out, (err) => {
        if (err) {
          console.log('Operation failed');
        }
      });

      finished(out, (err) => {
        if (!err) {
          console.log('Done compressing 😎');
          console.log(`You are currently in ${cwd}`);
        }
      });
    } else {
      console.log('Operation failed');
    }
  } catch (err) {
    console.log('Operation failed');
  }
};
