#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const handlebars = require('handlebars')
const chalk = require('chalk')

handlebars.registerHelper('ifIn', function (elem, list, options) {
  if (list.indexOf(elem) > -1) {
    return options.fn(this)
  }
  return options.inverse(this)
})

handlebars.registerHelper('ifEq', function (a, b, opts) {
  if (a === b) {
    return opts.fn(this)
  } else {
    return opts.inverse(this)
  }
})

handlebars.registerHelper('ifNotEq', function (a, b, opts) {
  if (a === b) {
    return opts.inverse(this)
  } else {
    return opts.fn(this)
  }
})

handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase()
})

require('yargs') // eslint-disable-line
  .command('generate [idlformat]', 'generates an IDL from a RAPIDSL file using the supplied IDL format (openapiv3)', (yargs) => {
    yargs
      .positional('idlformat', {
        describe: 'the IDL format (openapiv3)',
        default: 'openapiv3'
      })
  }, (argv) => {
    consoleInfo('STARTING', generationCommandDescription(argv))
    const rapidsl = readSourceFile(argv.rapidslFile)
    const template = handlebars.compile(readTemplateFile('./templates/' + argv.idlformat + '.handlebars'))
    writeOutputFile(template(rapidsl), argv.ouputFile)
    consoleInfo('SUCCESS', 'The IDL generation ends successfully')
  })
  .option('rapidslFile', {
    alias: 'r',
    default: 'rapidsl.yaml'
  })
  .option('ouputFile', {
    alias: 'o',
    default: 'output.yaml'
  })
  .demandCommand()
  .help()
  .argv

function writeOutputFile (idlContent, outputPath) {
  consoleInfo('WRITING', `Writing : ${outputPath}`)
  try {
    // var schemaDef = fs.readFileSync('rapidsl-schema.json', 'utf8')
    return fs.writeFileSync(path.resolve(outputPath), idlContent)
  } catch (ex) {
    consoleError('READING', `Failed to write file : ${outputPath}`)
    consoleError('READING', ex.message)
    process.exit(1)
  }
}

function consoleInfo (command, message) {
  console.info(chalk.green.bold(`[${command}]`) + ` : ${message}`)
}

function consoleError (command, message) {
  console.info(chalk.red.bold(`[${command}]`) + ` : ${message}`)
}

function generationCommandDescription (argv) {
  return ` generate and IDL using the ${argv.idlformat} format` +
         ` reading the RAPIDSL file from ${argv.rapidslFile}` +
         ` and writing the output file to ${argv.ouputFile}`
}

function readSourceFile (file) {
  consoleInfo('READING', `Reading : ${file}`)
  try {
    // var schemaDef = fs.readFileSync('rapidsl-schema.json', 'utf8')
    var rapidsl = fs.readFileSync(path.resolve(file), 'utf8')
    return yaml.safeLoad(rapidsl, { json: true })
  } catch (ex) {
    consoleError('READING', `Failed to parse YAML/JSON : ${file}`)
    consoleError('READING', ex.message)
    process.exit(1)
  }
}

function readTemplateFile (file) {
  consoleInfo('READING', `Reading : ${file}`)
  try {
    // var schemaDef = fs.readFileSync('rapidsl-schema.json', 'utf8')
    return fs.readFileSync(path.resolve(file), 'utf8')
  } catch (ex) {
    consoleError('READING', `Failed to parse YAML/JSON : ${file}`)
    consoleError('READING', ex.message)
    process.exit(1)
  }
}
