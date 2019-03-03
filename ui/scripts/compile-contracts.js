const fs = require('fs');
const solc = require('solc');
const glob = require('glob');

const contracts = glob.sync('src/**/*.sol', { absolute: true });
const sources = [];
const filePathMap = {};

contracts.forEach((filePath) => {
  const fileName = filePath.split('/').pop();
  const source = fs.readFileSync(filePath, 'utf8');
  filePathMap[fileName] = filePath;
  sources.push(source);
});

const output = solc.compile(sources.join('\n'));

fs.writeFileSync('src/contracts/contracts.json', JSON.stringify(output.contracts));

Object.keys(output.contracts).forEach((key) => {
  const contract = output.contracts[key];
  const name = key.replace(/^:/, '') + '.sol';
  const filePath = filePathMap[name];
  fs.writeFileSync(filePath.replace(/\.sol$/, '.interface.json'), contract.interface);
});

module.exports = output.contracts;
