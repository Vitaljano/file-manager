import path from 'path';

export const pathNormalize = async (cwdPath, argsPath) => {
  try {
    return path.isAbsolute(argsPath) ? argsPath : path.join(cwdPath, argsPath);
  } catch (err) {
    console.log('Operation failed');
  }
};
