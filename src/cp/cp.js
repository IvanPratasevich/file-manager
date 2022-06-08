import { fork } from 'child_process';
import { join } from 'node:path';
import { exists, getDirname } from '../additions/additions.js';

export const spawnChildProcess = async (args) => {
  const __dirname = await getDirname(import.meta.url);
  const pathToFile = join(__dirname, 'files', 'script.js');
  const isFileExists = await exists(pathToFile);
  if (!isFileExists) {
    throw new Error('FS operation failed');
  }
  fork(pathToFile, args);
};

spawnChildProcess(process.argv.splice(2));

