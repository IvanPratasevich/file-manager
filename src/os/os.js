import { EOL, cpus, homedir, userInfo } from 'node:os';

export const os = async (parameters) => {
  try {
    switch (parameters[0]) {
      case '--EOL':
        console.log(JSON.stringify(EOL));
        break;
      case '--cpus':
        const arr = [];
        cpus().forEach((el) => {
          arr.push(
            new Promise((resolve) => {
              resolve({ model: el.model, speed: `${(el.speed / 1000).toFixed(2)} GHz` });
            })
          );
        });
        const result = await Promise.all(arr);
        console.log(result);
        break;
      case '--homedir':
        console.log('Home directory:' + ' ' + homedir());
        break;
      case '--username':
        console.log('Username:' + ' ' + userInfo().username);
        break;
      case '--architecture':
        console.log('CPU architecture:' + ' ' + process.arch);
        break;
      default:
        console.log('Operation failed!');
        break;
    }
  } catch (error) {
    console.log('Operation failed!');
  }
};

