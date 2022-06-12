import { createWriteStream, createReadStream } from 'node:fs';
import { sep, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { unlink } from 'node:fs/promises';

export const mv = async (parameters) => {
  try {
    const pathToFile = resolve(parameters[0]);
    let pathToDest = parameters[1];
    const sourceFile = pathToFile.split(sep).pop();
    pathToDest = resolve(pathToNewDirectory, sourceFile);
    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(pathToNewDirectory);
    await pipeline(readStream, writeStream);
    await unlink(pathToFile);
  } catch (error) {
    console.log('Operation failed!');
  }
};

