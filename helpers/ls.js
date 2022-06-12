import fs from 'fs/promises';

export const ls = async (dirPath, arg) => {
  try {
    const stat = await fs.readdir(dirPath);

    if (arg === '-a') {
      console.log(stat);
      return;
    }

    const list = stat.filter((item) => {
      if (item.startsWith('.')) {
        return false;
      } else {
        return true;
      }
    });

    console.log(list);
  } catch (err) {
    throw err;
  }
};
