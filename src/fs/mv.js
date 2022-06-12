import { createWriteStream, createReadStream } from 'node:fs';
import { sep, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { unlink } from 'node:fs/promises';

export const mv = async (parameters) => {
  try {
    const pathToFile = resolve(parameters[0]);
    const sourceFile = pathToFile.split(sep).pop();
    const pathToDest = resolve(parameters[1], sourceFile);
    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(pathToDest);
    await pipeline(readStream, writeStream);
    await unlink(pathToFile);
  } catch (error) {
    console.log('Operation failed!');
  }
};

