import { createReadStream } from 'fs';
import crypto from 'crypto';
import { pathNormalize } from './pathNormalize.js';
import { isExist } from './isExist.js';

export const hash = async (cwd, userPath) => {
  try {
    const pathToFile = await pathNormalize(cwd, userPath);
    const isFile = (await isExist(pathToFile)).isFile;

    if (userPath && isFile) {
      let content = '';
      const readStream = createReadStream(pathToFile);

      const hash = crypto.createHash('sha256');
      readStream.on('data', (chunk) => {
        content += chunk.toString();
      });

      readStream.on('end', () => {
        hash.update(content);
        const hashString = hash.digest('hex');
        console.log(hashString);
        console.log(`You are currently in ${cwd}`);
      });
    } else {
      console.log('Operation failed');
    }
  } catch (err) {
    console.log('Operation failed');
  }
};
