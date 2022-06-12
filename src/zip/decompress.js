import { exists, getDirname } from '../additions/additions.js';
import { join } from 'node:path';
import { createBrotliDecompress } from 'node:zlib';
import { createWriteStream, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { sep, resolve } from 'node:path';

export const decompress = async (parameters) => {
  try {
    const pathToSrcFile = resolve(parameters[0]);
    const sourceFile = pathToSrcFile.split(sep).pop().replace('.br', '');
    const pathToDestination = resolve(resolve(parameters[1]), sourceFile);
    const input = createReadStream(pathToSrcFile);
    const output = createWriteStream(pathToDestination);
    const unzip = createBrotliDecompress();
    await pipeline(input, unzip, output);
    console.log('Uncompressed successfully!');
  } catch (error) {
    console.log('Operation failed!');
  }
};

