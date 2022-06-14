import { resolve, sep } from 'node:path';
import { createBrotliCompress } from 'node:zlib';
import { createWriteStream, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { exists } from '../additions/additions.js';

export const compress = async (parameters) => {
  try {
    const pathToSrcFile = resolve(parameters[0]);
    const sourceFile = pathToSrcFile.split(sep).pop();
    const pathToDestination = resolve(resolve(parameters[1]), `${sourceFile}.br`);
    const isSourceFileExists = await exists(pathToSrcFile);
    if (!isSourceFileExists) {
      console.log('There is no file in directory!');
      console.log('Operation failed!');
      return;
    }
    const input = createReadStream(pathToSrcFile, { flags: 'r' });
    const output = createWriteStream(pathToDestination, { flags: 'wx' });
    const zip = createBrotliCompress();
    await pipeline(input, zip, output);
    console.log('Compressed successfully!');
  } catch (error) {
    console.log('Operation failed!');
  }
};

