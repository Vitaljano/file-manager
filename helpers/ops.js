import os from 'os';

export const ops = async (args) => {
  try {
    switch (args) {
      case '--EOL':
        console.log(JSON.stringify(os.EOL));
        break;
      case '--cpus':
        console.log(os.cpus());
        break;
      case '--homedir':
        console.log(os.homedir());
        break;
      case '--username':
        console.log(os.userInfo().username);
        break;
      case '--architecture':
        console.log(os.arch());
        break;
    }
  } catch (err) {
    console.log('Operation failed');
  }
};
