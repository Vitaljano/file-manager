import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { pathNormalize } from './pathNormalize.js';

export const hash = async (cwd, userPath) => {
  try {
    const pathToFile = await pathNormalize(cwd, userPath);

    const input = (await fs.readFile(pathToFile)).toString();
    const hash = crypto.createHash('sha256');
    hash.update(input);
    const hashString = hash.digest('hex');
    console.log(hashString);
  } catch (err) {
    console.log('Operation failed');
  }
};
