import { readdir, mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { exists, getDirname } from '../additions/additions.js';

const copyDirectory = async (src, destination) => {
  const items = await readdir(src, { withFileTypes: true });
  await mkdir(destination);
  for (const item of items) {
    const srcPath = join(src, item.name);
    const destinationPath = join(destination, item.name);
    if (item.isDirectory()) {
      await copyDirectory(srcPath, destinationPath);
    } else {
      await copyFile(srcPath, destinationPath);
    }
  }
};

export const copy = async () => {
  try {
    const __dirname = await getDirname(import.meta.url);
    const pathToSourceDir = join(__dirname, 'files');
    const pathToCopyDir = join(__dirname, 'files_copy');
    const isSourceDirExists = await exists(pathToSourceDir);
    const isCopyDirExists = await exists(pathToCopyDir);
    if (!isSourceDirExists || isCopyDirExists) {
      throw new Error('FS operation failed');
    }
    await copyDirectory(pathToSourceDir, pathToCopyDir);
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
};

copy();

