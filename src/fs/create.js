import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { exists, getDirname } from '../additions/additions.js';

export const create = async () => {
  try {
    const __dirname = await getDirname(import.meta.url);
    const text = 'I am fresh and young';
    const pathToFile = join(__dirname, 'files', 'fresh.txt');
    const isFileExists = await exists(pathToFile);
    if (isFileExists) {
      throw new Error('FS operation failed');
    }
    await writeFile(pathToFile, text);
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
};

create();

