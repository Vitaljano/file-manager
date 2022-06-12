import readline from 'readline';
import { stdin, stdout } from 'process';
import os from 'os';

import { ls, cd, up, cat, add, cp, ops, hash, rn, rm, mv, args, compress, decompress } from './helpers/index.js';

const rl = readline.createInterface({ input: stdin, output: stdout });

let userName = 'anonymous';
let cwd = os.homedir();

// greeting

greeting();

function greeting() {
  const userArgs = args();

  for (const item of userArgs) {
    if (Object.hasOwn(item, 'username')) {
      userName = item.username;
    }
  }
  console.log(`Welcome to the File Manager, ${userName}!`);
  currentDirInfo();
}

function currentDirInfo() {
  console.log(`You are currently in ${cwd}`);
}

const index = async () => {
  rl.on('line', async (answer) => {
    const args = answer.split(' ');

    switch (args[0]) {
      case 'ls':
        await ls(cwd, args[1]);
        currentDirInfo();
        break;
      case 'up':
        cwd = await up(cwd);
        currentDirInfo();
        break;
      case 'cd':
        cwd = await cd(cwd, args[1]);
        currentDirInfo();
        break;

      case 'cat':
        await cat(cwd, args[1]);
        break;
      case 'add':
        await add(cwd, args[1]);
        currentDirInfo();
        break;
      case 'rm':
        await rm(cwd, args[1]);
        currentDirInfo();
        break;
      case 'rn':
        await rn(cwd, args[1], args[2]);
        currentDirInfo();
        break;
      case 'os':
        await ops(args[1]);
        currentDirInfo();
        break;
      case 'hash':
        await hash(cwd, args[1]);
        break;
      case 'compress':
        await compress(cwd, args[1], args[2]);
        break;
      case 'decompress':
        await decompress(cwd, args[1], args[2]);
        currentDirInfo();
        break;
      case 'cp':
        await cp(cwd, args[1], args[2]);
        currentDirInfo();
        break;
      case 'mv':
        await mv(cwd, args[1], args[2]);
        currentDirInfo();
        break;
      case '.exit':
        process.exit(0);
        break;
      default:
        console.log('Invalid input');
        break;
    }
  });

  process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${userName}!`);
  });

  //catches ctrl+c event
  process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}!`);
  });
};

index();
