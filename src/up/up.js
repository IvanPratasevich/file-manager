import { join } from 'node:path';
import { chdir } from 'node:process';
export const up = async () => {
  try {
    const currentDir = process.cwd();
    const upDir = join(currentDir, '..');
    chdir(upDir);
  } catch (error) {
    console.log('Operation failed!');
  }
};

