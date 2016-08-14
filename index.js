#!/usr/bin/env node --harmony

const program = require('commander');

const create = require('./commands/create');

program.version('0.0.1');

program
    .command('create <name> <author> <description> <version>')
    .description('Creates a new structure for your awesome newborn independent component')
    .action(create);

program.parse(process.argv)
