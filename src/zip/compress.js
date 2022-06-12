import { resolve, sep } from 'node:path';
import { createBrotliCompress } from 'node:zlib';
import { createWriteStream, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const compress = async (parameters) => {
  try {
    const pathToSrcFile = resolve(parameters[0]);
    const sourceFile = pathToSrcFile.split(sep).pop();
    const pathToDestination = resolve(resolve(parameters[1]), `${sourceFile}.br`);
    const input = createReadStream(pathToSrcFile);
    const output = createWriteStream(pathToDestination);
    const zip = createBrotliCompress();
    await pipeline(input, zip, output);
    console.log('Compressed successfully!');
  } catch (error) {
    console.log('Operation failed!');
  }
};