import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { exists, getDirname } from '../additions/additions.js';

export const read = async () => {
  try {
    const __dirname = await getDirname(import.meta.url);
    const pathToSourceFile = join(__dirname, 'files', 'fileToRead.txt');
    const isSourceFileExists = await exists(pathToSourceFile);
    if (!isSourceFileExists) {
      throw new Error('FS operation failed');
    }
    const readData = await readFile(pathToSourceFile, 'utf8');
    console.log('\x1b[36m', readData, '\x1b[0m');
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
};

read();

