import os from 'os';

export const ops = async (args) => {
  try {
    switch (args) {
      case '--EOL':
        console.log(JSON.stringify(os.EOL));
        break;
      case '--cpus':
        const cpu = os.cpus().map((item) => {
          const speed = item.speed / 1000;
          const convertedSpeed = speed < 0.1 ? speed * 100 : speed;
          return {
            model: item.model,
            speed: convertedSpeed + ' GHz',
          };
        });
        console.log(cpu);

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
      default:
        console.log('Invalid input');
        break;
    }
  } catch (err) {
    console.log('Operation failed');
  }
};
