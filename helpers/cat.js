import { createReadStream } from 'fs';
import { isExist } from './isExist.js';
import { pathNormalize } from './pathNormalize.js';

export const cat = async (cwd, userInputPath) => {
  try {
    const pathToFile = await pathNormalize(cwd, userInputPath);

    const isFile = (await isExist(pathToFile)).isFile;

    if (isFile) {
      const readStream = createReadStream(pathToFile);

      readStream.on('data', (chunk) => {
        console.log(chunk.toString());
      });
      readStream.on('end', () => {
        console.log(`You are currently in ${cwd}`);
      });
    } else {
      console.log('Operation failed');
    }
  } catch (err) {
    console.log('Operation failed');
  }
};
