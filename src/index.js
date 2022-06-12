import { parseArgs } from './cli/args.js';
import { homedir } from 'os';
import * as readline from 'node:readline';
import { calculateHash } from './hash/calcHash.js';
import { ls } from './fs/ls.js';
import { currentDirectory } from './currentDirectory/currentDirectory.js';
import { cd } from './cd/cd.js';
import { up } from './up/up.js';
import { cat } from './fs/cat.js';
import { add } from './fs/add.js';
import { rn } from './fs/rn.js';
import { cp } from './fs/cp.js';
import { mv } from './fs/mv.js';
import { rm } from './fs/rm.js';
import { os } from './os/os.js';
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js';

const fileManager = async () => {
  const username = parseArgs();
  const homeDir = homedir();
  process.chdir(homeDir);
  process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
  currentDirectory();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('line', async (line) => {
    const lineArr = line.split(' ').filter((el) => el.trim());
    const command = lineArr[0];
    const parameters = lineArr.slice(1);
    switch (command) {
      case 'hash':
        if (parameters.length === 1) {
          await calculateHash(parameters).then((result) => {
            process.stdout.write(`${result}\n`);
          });
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case '.close':
        rl.close();
        break;
      case 'ls':
        if (parameters.length === 0) {
          await ls();
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'cd':
        if (parameters.length === 1) {
          await cd(parameters);
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'up':
        if (parameters.length === 0) {
          await up();
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'cat':
        if (parameters.length === 1) {
          await cat(parameters).then((result) => {
            process.stdout.write(result);
          });
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'add':
        if (parameters.length === 1) {
          await add(parameters).then((result) => {
            process.stdout.write(result);
          });
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'rn':
        if (parameters.length === 2) {
          await rn(parameters);
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'cp':
        await cp(parameters);
        currentDirectory();
        break;
      case 'mv':
        if (parameters.length === 2) {
          await mv(parameters);
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'rm':
        if (parameters.length === 1) {
          await rm(parameters);
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'os':
        if (parameters.length === 1 && typeof parameters !== 'undefined') {
          if (parameters[0].startsWith('--')) {
            await os(parameters);
            currentDirectory();
          } else {
            process.stdout.write(`Invalid input\n`);
          }
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'compress':
        if (parameters.length === 2) {
          await compress(parameters);
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      case 'decompress':
        if (parameters.length === 2) {
          await decompress(parameters);
          currentDirectory();
        } else {
          process.stdout.write(`Invalid input\n`);
        }
        break;
      default:
        process.stdout.write(`Invalid input\n`);
        break;
    }
  });
  rl.on('close', () => {
    process.stdout.write(`Thank you for using File Manager, ${username}!`);
  });
};

await fileManager();

