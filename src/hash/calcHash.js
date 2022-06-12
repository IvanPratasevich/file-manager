import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';

export const calculateHash = async (parameters) => {
  try {
    const { createHash } = await import('crypto');
    const pathToSourceFile = resolve(parameters[0]);
    const hash = createHash('sha256');
    const readStream = createReadStream(pathToSourceFile);
    return new Promise((resolve) => {
      readStream.on('data', (data) => hash.update(data));
      readStream.on('end', () => resolve(hash.digest('hex')));
      readStream.on('error', (error) => resolve('Operation failed!'));
    });
  } catch (error) {
    console.log('Operation failed!');
  }
};

