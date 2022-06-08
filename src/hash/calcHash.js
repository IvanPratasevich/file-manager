import { join } from 'node:path';
import { exists, getDirname } from '../additions/additions.js';
import { createReadStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { rejects } from 'node:assert';

export const calculateHash = async () => {
  try {
    const { createHash } = await import('crypto');
    const __dirname = await getDirname(import.meta.url);
    const pathToSourceFile = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const isSourceFileExists = await exists(pathToSourceFile);
    if (!isSourceFileExists) {
      throw new Error('No file in directory!');
    }
    const readData = await readFile(pathToSourceFile);
    const hash = createHash('sha256').update(readData).digest('hex');
    return hash;
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
};

console.log('\x1b[36m', await calculateHash(), '\x1b[0m');

