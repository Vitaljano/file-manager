import path from 'path';

export const pathNormalize = async (cwdPath, argsPath) => {
  return path.isAbsolute(argsPath) ? argsPath : path.join(cwdPath, argsPath);
};
