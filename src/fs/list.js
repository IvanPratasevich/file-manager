import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { exists, getDirname } from '../additions/additions.js';

export const list = async () => {
  try {
    const __dirname = await getDirname(import.meta.url);
    const pathToSourceDir = join(__dirname, 'files');
    const isSourceDirExists = await exists(pathToSourceDir);
    if (!isSourceDirExists) {
      throw new Error('FS operation failed');
    }
    const items = await readdir(pathToSourceDir, { withFileTypes: true });
    for (const item of items) {
      if (!item.isDirectory()) {
        console.log('\x1b[36m', item.name, '\x1b[0m');
      } else {
        console.log('\x1b[36m', item.name + '(folder)', '\x1b[0m');
      }
    }
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
};

list();

