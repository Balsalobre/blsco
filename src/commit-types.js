export const COMMIT_TYPES = {
  feat: {
    emoji: 'โจ',
    description: 'Add a new feature',
    release: true
  },
  fix: {
    emoji: '๐',
    description: 'Submit a bug fix',
    release: true
  },
  perf: {
    emoji: 'โก๏ธ',
    description: 'Improve performance',
    release: true
  },
  docs: {
    emoji: '๐',
    description: 'Add or update documentation',
    release: false
  },
  refactor: {
    emoji: '๐  ',
    description: 'Refactor code',
    release: true
  },
  test: {
    emoji: '๐งช',
    description: 'Add or update tests',
    release: false
  },
  build: {
    emoji: '๐ท',
    description: 'Add or update build scripts',
    release: false
  },
  style: {
    emoji: '๐',
    description: 'Improve styling',
    release: true
  }
}
