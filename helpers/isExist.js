import fs from 'fs/promises';

export const isExist = async (path) => {
  try {
    const stat = await fs.stat(path);
    return {
      isDirectory: stat.isDirectory(),
      isFile: stat.isFile(),
    };
  } catch (err) {
    return false;
  }
};
