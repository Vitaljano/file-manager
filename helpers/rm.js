import fs from 'fs/promises';
import { pathNormalize } from './pathNormalize.js';

export const rm = async (cwd, filePath) => {
  try {
    const absolutePath = await pathNormalize(cwd, filePath);
    await fs.rm(absolutePath);
  } catch (err) {
    console.log('Operation failed');
  }
};
