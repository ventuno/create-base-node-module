const child_process = jest.genMockFromModule('child_process');

child_process.execSync = jest.fn().mockImplementation(() => '');

module.exports = child_process;
