import { createWriteStream, createReadStream } from 'node:fs';
import { sep, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';

export const cp = async (parameters) => {
  try {
    const pathToFile = resolve(parameters[0]);
    let pathToNewDirectory = parameters[1];
    const sourceFile = pathToFile.split(sep).pop();
    pathToNewDirectory = resolve(pathToNewDirectory, sourceFile);
    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(pathToNewDirectory);
    await pipeline(readStream, writeStream);
  } catch (error) {
    console.log('Operation failed!');
  }
};

