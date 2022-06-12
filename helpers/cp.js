import fs from 'fs/promises';
import { pathNormalize } from './pathNormalize.js';
import path from 'path';

export const cp = async (cwd, oldPath, newPath) => {
  try {
    const filename = path.parse(oldPath).base;
    const pathToDirectory = path.join(newPath, filename);
    const pathFrom = await pathNormalize(cwd, oldPath);
    const pathTo = await pathNormalize(cwd, pathToDirectory);

    await fs.cp(pathFrom, pathTo, { recursive: true });
  } catch (err) {
    console.log('Operation failed');
  }
};
