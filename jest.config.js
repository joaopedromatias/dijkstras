module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/'],
  detectOpenHandles: true,
  collectCoverage: true,
  collectCoverageFrom: ['dijkstras.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js']
}
