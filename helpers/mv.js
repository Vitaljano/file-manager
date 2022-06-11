import { cp } from './cp.js';
import { rm } from './rm.js';

import { pathNormalize } from './pathNormalize.js';

export const mv = async (cwd, oldPath, newPath) => {
  try {
    await cp(cwd, oldPath, newPath);
    await rm(cwd, oldPath);
  } catch (err) {
    console.log('Operation failed');
  }
};
