import { unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { exists, getDirname } from '../additions/additions.js';

export const remove = async () => {
  try {
    const __dirname = await getDirname(import.meta.url);
    const pathToSourceFile = join(__dirname, 'files', 'fileToRemove.txt');
    const isSourceFileExists = await exists(pathToSourceFile);
    if (!isSourceFileExists) {
      throw new Error('FS operation failed');
    }
    await unlink(pathToSourceFile);
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
};

remove();

