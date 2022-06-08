import { exists, getDirname } from '../additions/additions.js';
import { join } from 'node:path';
import { createUnzip } from 'node:zlib';
import { createWriteStream, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const decompress = async () => {
  try {
    const __dirname = await getDirname(import.meta.url);
    const pathToSrcFile = join(__dirname, 'files', 'archive.gz');
    const pathToDestinationFile = join(__dirname, 'files', 'fileToCompress.txt');
    const isSourceFileExists = await exists(pathToSrcFile);
    if (!isSourceFileExists) {
      throw new Error('No file in directory!');
    }
    const input = createReadStream(pathToSrcFile);
    const output = createWriteStream(pathToDestinationFile);
    const unzip = createUnzip();
    await pipeline(input, unzip, output);
    console.log('Unzipped successfully!');
  } catch (error) {
    process.stderr.write('Error:' + ' ' + error.message);
    process.exit(1);
  }
};
decompress();
