const { spawn } = require('child_process');
const wrk = require('wrk');

const sleep = time => new Promise(resolve => setTimeout(resolve, time));
const wrkWrapper = opts => new Promise((resolve, reject) => {
  wrk(opts, (err, result) => {
    if (err) {
      return reject(err);
    }

    resolve(result);
  });
});

async function checkBenchMarks() {
  const urls = ['http://localhost:3000/api/v1/downloads/phantom', 'http://localhost:3000/api/v1/downloads/puppeteer'];

  const childProcess = spawn('node', [`${process.cwd()}/dist/bin/www.js`], {
    detached: true,
  });

  childProcess.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });
  childProcess.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });

  childProcess.unref();

  await sleep(2000);

  // eslint-disable-next-line no-restricted-syntax
  for await (const url of urls) {
    try {
      const result = await wrkWrapper({
        threads: 4,
        duration: '10s',
        connections: 500,
        url,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  childProcess.kill();
}

checkBenchMarks();
