#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const {SAO} = require('sao')
const cac = require('cac')
const chalk = require('chalk')
const {version} = require('./package.json')
const download = require('download-git-repo')

const generator = path.resolve(__dirname, './')

const cli = cac('create-nuxt-app')

cli
  .command('[out-dir]', 'Generate in a custom directory or current directory')
  .option('-e, --edge', 'To install `nuxt-edge` instead of `nuxt`')
  .option('-i, --info', 'Print out debugging information relating to the local environment')
  .option('--skip', 'Skip heartcode.app/_init_')
  .action((outDir = 'heartcode-web-dev', cliOptions) => {
    const files = fs.existsSync(outDir) ? fs.readdirSync(outDir) : []

    console.log()
    console.log(chalk`{cyan create-nuxt-app v${version}}`)
    if (files.length) {
      return console.log(chalk.red(`Can't create ${outDir} because there's already a non-empty directory ${outDir} existing in path.`))
    }

    console.log(chalk`✨  Generating heartcode-web-dev project in {cyan ${outDir}}`)

    const {verbose, answers} = cliOptions
    const logLevel = verbose ? 4 : 2

    const sao = new SAO({
      generator, outDir, logLevel, answers
    })

    download('smu-heartcode/web-dev-materials', 'template', err => {
      if (err) {
        console.trace(err)
        process.exit(1)
        return
      }

      sao.run()
        .catch((err) => {
          console.trace(err)
          process.exit(1)
        })
    })
  })

cli.help()

cli.version(version)

cli.parse()
