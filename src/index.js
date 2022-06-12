import { parseArgs } from './cli/args.js';
import { homedir } from 'os';
import * as readline from 'node:readline';
import { calculateHash } from './hash/calcHash.js';
import { list } from './fs/list.js';
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
        await calculateHash(parameters).then((result) => {
          process.stdout.write(`${result}\n`);
        });
        currentDirectory();
        break;
      case '.close':
        rl.close();
        break;
      case 'ls':
        await list();
        currentDirectory();
        break;
      case 'cd':
        await cd(parameters);
        currentDirectory();
        break;
      case 'up':
        await up();
        currentDirectory();
        break;
      case 'cat':
        await cat(parameters).then((result) => {
          process.stdout.write(result);
        });
        currentDirectory();
        break;
      case 'add':
        await add(parameters).then((result) => {
          process.stdout.write(result);
        });
        currentDirectory();
        break;
      case 'rn':
        await rn(parameters);
        currentDirectory();
        break;
      case 'cp':
        await cp(parameters);
        currentDirectory();
        break;
      case 'mv':
        await mv(parameters);
        currentDirectory();
        break;
      case 'rm':
        await rm(parameters);
        currentDirectory();
        break;
      case 'os':
        await os(parameters);
        currentDirectory();
        break;
      case 'compress':
        await compress(parameters);
        currentDirectory();
        break;
      case 'decompress':
        await decompress(parameters);
        currentDirectory();
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

