import fs from 'fs/promises';
import { pathNormalize } from './pathNormalize.js';

export const cp = async (cwd, oldPath, newPath) => {
  try {
    const pathFrom = await pathNormalize(cwd, oldPath);
    const pathTo = await pathNormalize(cwd, newPath);

    await fs.cp(pathFrom, pathTo, { recursive: true });
  } catch (err) {
    console.log('Operation failed');
  }
};
