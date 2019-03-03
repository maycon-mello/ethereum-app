/* istanbul ignore file */
const Mocha = require('mocha');
const glob = require('glob');
const chokidar = require('chokidar');
const optimist = require('optimist');

const { argv } = optimist;

const testFiles = glob.sync('test/**/*.spec.+(js|ts)', { absolute: true });
const watchFiles = [
  ...glob.sync('test/**/*.+(js|ts?(x))', { absolute: true }),
  ...glob.sync('src/**/*.+(js|ts?(x))', { absolute: true }),
];

let runner;

require('ts-node/register');

function pass() {
  const mocha = new Mocha({
    reporter: 'list',
    useColors: true,
    timeout: 30000,
  });

  mocha.addFile(require.resolve('./setupE2E.js'));


  testFiles.forEach(f => mocha.addFile(f));
  // eslint-disable-next-line no-console
  runner = mocha.run(failures => process.on('exit', () => console.log(failures)));
}

function test() {
  if (argv.watch) {
    chokidar.watch(watchFiles).on('change', () => {
      if (runner) {
        runner.abort();
      }

      watchFiles.forEach(f => delete require.cache[f]);

      try {
        pass();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  }

  try {
    setTimeout(pass, 1000);
  } catch(err) {
    console.log(err);
  }
}

test();
