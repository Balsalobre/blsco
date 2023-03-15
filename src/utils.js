import { outro } from '@clack/prompts'
import colors from 'picocolors'

export const exitProgram = ({ code = 0, message = 'Commit canceled' } = {}) => {
  outro(colors.yellow(message))
  process.exit(code)
}

export const getJiraTask = str => str.split('/')[1].split('_')[0]
