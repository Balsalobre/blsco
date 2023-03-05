import { outro } from '@clack/prompts'
import colors from 'picocolors'

export function exitProgram ({ code = 0, message = 'Commit canceled' } = {}) {
  outro(colors.yellow(message))
  process.exit(code)
}
