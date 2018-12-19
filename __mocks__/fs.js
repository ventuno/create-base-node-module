const fs = jest.genMockFromModule('fs');

fs.readFileSync = () => '{}';
fs.writeFileSync = jest.fn();

module.exports = fs;
