import { exec } from 'node:child_process'
import { promisify } from 'node:util'

import { outro } from '@clack/prompts'
import colors from 'picocolors'

const execAsync = promisify(exec)

function cleanStdout (stdout) {
  return stdout.trim().split('\n').filter(Boolean)
}

export async function getChangedFiles () {
  try {
    const { stdout } = await execAsync('git status --porcelain')
    return cleanStdout(stdout).map(line => line.split(' ').pop())
  } catch (error) {
    outro(colors.red('Error: Check if you are in a git repository.'))
  }
}

export async function getStagedFiles () {
  try {
    const { stdout } = await execAsync('git diff --cached --name-only')
    return cleanStdout(stdout)
  } catch (error) {
    outro(colors.red('Error: Check if you are in a git repository.'))
  }
}

export async function getBranchName () {
  const { stdout } = await execAsync('git branch --show-current')
  return stdout.trim()
}

export async function gitAdd ({ files = [] } = {}) {
  const filesLine = files.join(' ')
  const { stdout } = await execAsync(`git add ${filesLine}`)
  return cleanStdout(stdout)
}

export async function gitCommit ({ commit } = {}) {
  const { stdout } = await execAsync(`git commit -m "${commit}"`)
  return cleanStdout(stdout)
}
