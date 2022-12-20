import fs from 'fs/promises';
import path from 'path';
import { pathNormalize } from './pathNormalize.js';

export const mv = async (cwd, oldPath, newPath) => {
  try {
    const filename = path.parse(oldPath).base;
    const pathToDirectory = path.join(newPath, filename);
    const pathFrom = await pathNormalize(cwd, oldPath);
    const pathTo = await pathNormalize(cwd, pathToDirectory);

    await fs.rename(pathFrom, pathTo);
  } catch (err) {
    console.log('Operation failed');
  }
};
