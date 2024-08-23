jest.mock('fs');
jest.mock('child_process');

let fs, child_process;

describe('index', () => {
  beforeEach(() => {
    fs = require('fs');
    child_process = require('child_process');
  });

  test('all expected actions are performed', () => {
    require('../index.js');

    const execSyncCalls = child_process.execSync.mock.calls;
    expect(execSyncCalls[0]).toEqual(['npm init', { stdio: 'inherit' }]);
    expect(execSyncCalls[1]).toEqual([
      'npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-jest prettier jest',
    ]);
    expect(execSyncCalls[2][0]).toMatch(
      /^cp -R \/.*\/create-base-node-module\/files\/ \.$/
    );

    const writeFileSyncCalls = fs.writeFileSync.mock.calls;
    expect(writeFileSyncCalls[0]).toEqual([
      './package.json',
      '{\n  "scripts": {\n    "test": "jest",\n    "format": "prettier ./*.js ./**/*.js --write",\n    "eslint": "eslint ."\n  }\n}\n',
    ]);
  });
});
