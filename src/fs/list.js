import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

export const list = async () => {
  try {
    const pathToSourceDir = resolve(process.cwd());
    const items = await readdir(pathToSourceDir);
    console.log(items);
  } catch (error) {
    console.log('Operation failed!');
  }
};

