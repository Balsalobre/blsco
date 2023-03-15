import { intro, outro, select, confirm, text, multiselect, isCancel } from '@clack/prompts'
import colors from 'picocolors'

import { exitProgram } from './utils.js'
import { COMMIT_TYPES } from './commit-types.js'
import { getChangedFiles, getStagedFiles, getBranchName, gitCommit, gitAdd } from './git.js'

intro(colors.inverse('Welcome to the commit assistant!'))

const changedFiles = await getChangedFiles()
const stagedFiles = await getStagedFiles()

if (stagedFiles.length === 0 && changedFiles.length > 0) {
  const files = await multiselect({
    message: colors.cyan(`You have not staged any files. Select the files you want to stage
    (Press ${colors.bold('Space')} to select, ${colors.bold('Enter')} to confirm)`),
    options: [
      { label: colors.bold('All files'), value: '-A' },
      ...changedFiles.map(file => ({
        label: file,
        value: file
      }))
    ]
  })

  if (isCancel(files)) exitProgram()

  await gitAdd({ files })
}

const commitType = await select({
  message: colors.cyan('Select the type of commit:'),
  options: Object.entries(COMMIT_TYPES).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${key.padEnd(8, ' ')} · ${value.description}`
  }))
})

if (isCancel(commitType)) exitProgram()

const commitMessage = await text({
  message: colors.cyan('Enter the commit message:'),
  validate: (value) => {
    if (!value) {
      return colors.red('You must enter a commit message')
    }

    if (value.length > 200) {
      return colors.red('The commit message must be less than 200 characters')
    }
  }
})

const branchName = await getBranchName()
console.log('>>', { branchName })
const { emoji } = COMMIT_TYPES[commitType]
const commit = `${emoji} ${commitType} ${commitMessage}`

const commitConfirmation = await confirm({
  initialValue: true,
  message: `Are you sure you want to commit with the following message?
  ${colors.green(colors.bold(commit))}
  Do you want to continue?`
})

if (isCancel(commitConfirmation)) exitProgram()

if (!commitConfirmation) {
  outro(colors.yellow('Commit canceled. Thanks for using this assistant!'))
  process.exit(0)
}

console.log({ commit })

await gitCommit({ commit })

outro(colors.green('✔️ Commit successful! Thanks for using this assistant!'))
