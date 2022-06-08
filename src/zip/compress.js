import { exists, getDirname } from '../additions/additions.js';
import { join } from 'node:path';
import { createGzip } from 'node:zlib';
import { createWriteStream, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const compress = async () => {
  try {
    const __dirname = await getDirname(import.meta.url);
    const pathToSrcFile = join(__dirname, 'files', 'fileToCompress.txt');
    const pathToDestinationFile = join(__dirname, 'files', 'archive.gz');
    const isSourceFileExists = await exists(pathToSrcFile);
    if (!isSourceFileExists) {
      throw new Error('No file in directory!');
    }
    const input = createReadStream(pathToSrcFile);
    const output = createWriteStream(pathToDestinationFile);
    const zip = createGzip();
    await pipeline(input, zip, output);
    console.log('Compressed successfully!');
  } catch (error) {
    process.stderr.write('Error:' + ' ' + error.message);
    process.exit(1);
  }
};

compress();

