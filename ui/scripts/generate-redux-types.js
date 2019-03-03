const fs = require('fs');
const R = require('ramda');

require('ts-node/register');
require('../config/mocha/setup');

const { modules } = require('../src/redux/store').default;

const actions = [];
const getters = [];

Object.keys(modules).forEach((moduleName) => {
  const module = modules[moduleName];

  Object
    .keys(module.reducers || {})
    .forEach(reducer => actions.push(`${moduleName}/${reducer}`));

  Object
    .keys(module.sagas || {})
    .forEach(saga => actions.push(`${moduleName}/${saga}`));

  Object
    .keys(module.getters || {})
    .forEach(getter => getters.push(`${moduleName}/${getter}`));

  Object
    .keys(module.state || {})
    .forEach(prop => getters.push(`${moduleName}/${prop}`));
});

const prepare = items => R.uniq(items).map(v => `'${v}'`).join(' | ');

const actionType = prepare(actions);
const getterType = prepare(getters);
  
const definition =`/*
 * THIS IS AN AUTO GENERATED FILE
 * For further details look at scripts/generate-redux-types.js
 * 
 * Last updated at ${new Date().toString()}
 * 
 */
type ActionType = ${actionType};

type GetterType = ${getterType};
`

fs.writeFileSync('config/types/action-types.d.ts', definition);
