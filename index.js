#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

const NPM = 'npm';
const SPACE = ' ';
const PACKAGE = './package.json';
const FILES_FOLDER = path.resolve(path.join(__dirname, 'files'));

const devDependencies = [
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-prettier',
  'eslint-plugin-jest',
  'prettier',
  'jest'
];

const scripts = {
  test: 'jest',
  format: 'prettier ./*.js ./**/*.js --write',
  eslint: 'eslint .'
};

// Run npm init
execSync([NPM, 'init'].join(SPACE), { stdio: 'inherit' });

// Install dev dependencies
const out = execSync(
  [NPM, 'install', '--save-dev'].concat(devDependencies).join(SPACE)
);
console.log(out.toString());

// Add scripts to the package.json
const packageJson = JSON.parse(fs.readFileSync(PACKAGE));
packageJson.scripts = Object.assign({}, packageJson.scripts, scripts);
fs.writeFileSync(PACKAGE, `${JSON.stringify(packageJson, null, 2)}${os.EOL}`);

// Copy files
execSync(`cp -R ${FILES_FOLDER}${path.sep} .`);
