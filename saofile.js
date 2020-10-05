const {dirname, join, relative} = require('path')
const {sha256} = require('js-sha256')
const chalk = require('chalk')

function isPasswordValid(password) {
  const salted = 'a4a0dcae84048562d803f8c7fe43c56ad9e464209271dc2af893994864bbbe80'
  return sha256(`create-heartcode-web-dev ${password}`) === salted
}

module.exports = {
  type: 'repo',
  user: 'smu-heartcode',
  repo: 'web-dev-materials',
  prompts: [
    {
      type: 'input',
      name: 'username',
      message: 'What is your username?',
      validate: (value) => {
        if (/^[a-z]$/.test(value)) {
          return true
        }
        return 'Invalid username, try again.'
      }
    },
    {
      type: 'input',
      name: 'password',
      message: 'What is the class password?',
      validate: (value) => {
        if (isPasswordValid(value)) {
          return true
        }

        return 'Incorrect password, try again.'
      }
    }
  ],
  actions: [
    {
      type: 'add',
      files: [
        '**'
      ],
      filters: {
        '.idea/**': 'false',
        '@smu-heartcode/**': 'false',
        '.gitignore': 'false',
        'README.md': 'false',
        'yarn.lock': 'false',
      }
    },
  ],
  async completed() {
    await this.npmInstall({npmClient: 'npm'})

    const isNewFolder = this.outDir !== process.cwd()
    const relativeOutFolder = relative(process.cwd(), this.outDir)
    const cdMsg = isNewFolder ? chalk`\t{cyan cd ${relativeOutFolder}}\n` : ''

    console.log(chalk`\n🎉  {bold Successfully created heartcode-web-dev project}\n`)

    console.log(chalk`  {bold To get started:}\n`)
    console.log(chalk`${cdMsg}\t{cyan npm run dev}\n`)
  }
}
