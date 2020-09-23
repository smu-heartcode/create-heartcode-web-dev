const { dirname, join, relative } = require('path')
const chalk = require('chalk')

module.exports = {
  type: 'repo',
  user: 'smu-heartcode',
  repo: 'web-dev-materials',
  prompts: [
    {
      type: 'input',
      name: 'cli-username',
      message: 'What is your username?',
    },
    {
      type: 'input',
      name: 'cli-password',
      message: 'What is the class password?',
    },
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
        'README.md': 'false'
      }
    },
  ],
  async completed () {
    await this.npmInstall({ npmClient: 'npm' })

    const isNewFolder = this.outDir !== process.cwd()
    const relativeOutFolder = relative(process.cwd(), this.outDir)
    const cdMsg = isNewFolder ? chalk`\t{cyan cd ${relativeOutFolder}}\n` : ''

    console.log(chalk`\n🎉  {bold Successfully created heartcode-web-dev project}\n`)

    console.log(chalk`  {bold To get started:}\n`)
    console.log(chalk`${cdMsg}\t{cyan npm dev}\n`)
  }
}
