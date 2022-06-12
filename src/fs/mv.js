import { createWriteStream, createReadStream } from 'node:fs';
import { sep, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { unlink } from 'node:fs/promises';
import { exists } from '../additions/additions.js';

export const mv = async (parameters) => {
  try {
    const pathToFile = resolve(parameters[0]);
    const sourceFile = pathToFile.split(sep).pop();
    const pathToDest = resolve(parameters[1], sourceFile);
    const isSourceFileExists = await exists(pathToFile);
    if (!isSourceFileExists) {
      console.log('There is no file in directory!');
      return;
    }
    const readStream = createReadStream(pathToFile, { flags: 'r' });
    const writeStream = createWriteStream(pathToDest, { flags: 'wx' });
    await pipeline(readStream, writeStream);
    await unlink(pathToFile);
  } catch (error) {
    console.log('Operation failed!');
  }
};

