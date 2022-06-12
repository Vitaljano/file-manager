import path, { parse } from 'path';
import os from 'os';
import { isExist } from './isExist.js';

export const up = async (cwd) => {
  const pathParse = path.parse(cwd);
  return pathParse.dir;
};

export const cd = async (cwdPath, pathFromArgs) => {
  try {
    if (pathFromArgs === undefined) {
      return os.homedir();
    }

    const isPathAbsolute = path.isAbsolute(pathFromArgs);
    let isDirectory = false;
    let relativePath = '';

    if (isPathAbsolute) {
      isDirectory = (await isExist(pathFromArgs)).isDirectory;
    } else {
      relativePath = path.join(cwdPath, pathFromArgs);
      isDirectory = (await isExist(relativePath)).isDirectory;
    }

    if (isDirectory) {
      return isPathAbsolute ? path.normalize(pathFromArgs) : path.normalize(relativePath);
    } else {
      return cwdPath;
    }
  } catch (err) {
    console.log('Operation failed');
  }
};
