import childProcess from 'child_process'
import shellEscape from 'shell-escape'

const PYTHON_PATH = 'server/get_polarity.py'

export default function(text) {
  const escaped = shellEscape([text])
  const output = childProcess.execSync(
    `python ${PYTHON_PATH} ${escaped}`
  ).toString('utf-8')
  return JSON.parse(output)
}
