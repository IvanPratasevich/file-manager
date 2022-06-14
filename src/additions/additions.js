import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs';

export const exists = (path) => {
  return new Promise((resolve) => {
    fs.access(path, fs.constants.F_OK, (error) => {
      if (!error) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export const getDirname = async (url) => {
  return new Promise((resolve) => {
    const __filename = fileURLToPath(url);
    const __dirname = dirname(__filename);
    resolve(__dirname);
  });
};

