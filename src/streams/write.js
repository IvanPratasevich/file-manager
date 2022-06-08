import { exists, getDirname } from '../additions/additions.js';
import { createWriteStream } from 'node:fs';
import { join } from 'node:path';

export const write = async () => {
  console.log(`
  To save file and exit press press CTRL + C 
  or type exit.
  `);
  const __dirname = await getDirname(import.meta.url);
  const pathToFile = join(__dirname, 'files', 'fileToWrite.txt');
  const isFileExists = await exists(pathToFile);
  if (!isFileExists) {
    throw new Error('FS operation failed');
  }
  const output = createWriteStream(pathToFile);
  process.stdout.write('Hi! Please enter some text.... \n');
  process.stdin.on('data', (chunk) => {
    let dataToString = chunk.toString().trim();
    if (dataToString.includes('exit')) {
      processExit();
    } else {
      output.write(chunk);
    }
  });
};

const processExit = () => {
  process.stdout.write('Goodbye!');
  process.exit();
};

write();

