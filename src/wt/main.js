import { Worker } from 'worker_threads';
import os from 'node:os';
import { exists, getDirname } from '../additions/additions.js';
import { join } from 'node:path';

export const performCalculations = async () => {
  const arr = [];
  const numCPU = os.cpus().length;
  const arrOfNum = Array.from({ length: numCPU }, (v, k) => k + 1);
  const __dirname = await getDirname(import.meta.url);
  const pathToFile = join(__dirname, 'worker.js');
  const isFileExists = await exists(pathToFile);
  if (!isFileExists) {
    throw new Error('FS operation failed');
  }
  arrOfNum.forEach((currentValue, i) => {
    arr.push(
      new Promise((resolve) => {
        const worker = new Worker(pathToFile, { workerData: 10 + i });
        worker.on('message', (res) => resolve({ status: 'resolved', data: res }));
        worker.on('error', () => resolve({ status: 'error', data: null }));
      })
    );
  });
  const result = await Promise.all(arr);
  return result;
};

console.log(await performCalculations());

