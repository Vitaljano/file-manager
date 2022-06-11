import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import path, { normalize } from 'path';
import { pathNormalize } from './pathNormalize.js';

export const compress = async (cwd, filePath, fileDest) => {
  try {
    const pathIn = await pathNormalize(cwd, filePath);
    const pathOut = await pathNormalize(cwd, fileDest);
    const int = createReadStream(pathIn);
    const out = createWriteStream(pathOut);
    const gzip = zlib.createGzip();

    int.pipe(gzip).pipe(out);
  } catch (err) {
    console.log(err);

    console.log('Operation failed');
  }
};
