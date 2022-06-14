import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { exists } from '../additions/additions.js';

export const calculateHash = async (parameters) => {
  try {
    const { createHash } = await import('crypto');
    const pathToSourceFile = resolve(parameters[0]);
    const hash = createHash('sha256');
    const isSourceFileExists = await exists(pathToSourceFile);
    if (!isSourceFileExists) {
      return 'There is no file in directory!\nOperation failed!';
    }
    const readStream = createReadStream(pathToSourceFile, { flags: 'r' });
    return new Promise((resolve) => {
      readStream.on('data', (data) => hash.update(data));
      readStream.on('end', () => resolve(hash.digest('hex')));
      readStream.on('error', (error) => resolve('Operation failed!'));
    });
  } catch (error) {
    console.log('Operation failed!');
  }
};

