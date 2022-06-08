import { join } from 'node:path';
import * as fs from 'node:fs/promises';
import { exists, getDirname } from '../additions/additions.js';

export const rename = async () => {
  try {
    const __dirname = await getDirname(import.meta.url);
    const pathToSourceFile = join(__dirname, 'files', 'wrongFilename.txt');
    const pathToDestinationFile = join(__dirname, 'files', 'properFilename.md');
    const isSourceFileExists = await exists(pathToSourceFile);
    const isDestinationFileExists = await exists(pathToDestinationFile);
    if (!isSourceFileExists || isDestinationFileExists) {
      throw new Error('FS operation failed');
    }
    await fs.rename(pathToSourceFile, pathToDestinationFile);
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
};

rename();

