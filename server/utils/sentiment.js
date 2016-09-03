import childProcess from 'child_process'
import shellEscape from 'shell-escape'

const PYTHON_PATH = 'server/get_polarity.py'
const PYTHON_BIN = process.env.PYTHON

export default function firstBadSentence(text) {
  const escaped = shellEscape([text])
  const output = childProcess.execSync(
    `${PYTHON_BIN} ${PYTHON_PATH} ${escaped}`
  ).toString('utf-8')
  const sentences = JSON.parse(output)
  const badSentence = sentences.find(([, score]) => score <= 0)
  return badSentence && badSentence[0]
}
