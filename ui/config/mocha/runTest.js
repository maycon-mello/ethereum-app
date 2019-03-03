/* istanbul ignore file */
const Mocha = require('mocha');
const glob = require('glob');
const chokidar = require('chokidar');
const optimist = require('optimist');

const { argv } = optimist;

const testFiles = glob.sync('src/**/*.test.+(js|ts?(x))', { absolute: true });
const watchFiles = glob.sync('src/**/*.+(js|ts?(x)|sol)', { absolute: true });
let contractsFile = require.resolve('../../src/contracts/contracts.json');;

let runner;

require('ts-node/register');

function pass() {
  const mocha = new Mocha({
    reporter: 'list',
    useColors: true,

  });

  try {
    // compile contracts
    require('../../scripts/compile-contracts');
  } catch(err) {
    console.error(err);
  }

  mocha.addFile(require.resolve('./setup'));

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

      delete require.cache[contractsFile];

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
