import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { exists, getDirname } from '../additions/additions.js';

export const read = async () => {
    let data = '';
    const __dirname = await getDirname(import.meta.url);
    const pathToFile = join(__dirname, 'files', 'fileToRead.txt');
    const isFileExists = await exists(pathToFile);
    if (!isFileExists) {
      throw new Error('FS operation failed');
    }
    const readStream = createReadStream(pathToFile, { encoding: 'utf8' });
    readStream.on('data', (chunk) => {
      data += chunk;
    });
    readStream.on('end',  () => {
      process.stdout.write(data);
    });
    readStream.on('error',  (error) => {
      process.stderr.write(error.message);
      process.exit(1);
    });
};

read();

