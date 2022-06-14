import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';

export const cat = async (pathToFile) => {
  let data = '';
  pathToFile = resolve(pathToFile[0]);
  const readStream = createReadStream(pathToFile, { flags: 'r', encoding: 'utf8' });
  return new Promise((resolve) => {
    readStream.on('data', (chunk) => {
      data += chunk;
    });
    readStream.on('end', () => {
      resolve(`${data}\n`);
    });
    readStream.on('error', (error) => {
      resolve('Operation failed!\n');
    });
  });
};

