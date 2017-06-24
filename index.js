#!/usr/bin/env node --harmony

const program = require('commander');

const create = require('./commands/create');

program.version('0.0.1');

program
    .command('create <name> [author] [description] [version]')
    .description('\nCreates a new structure for your awesome newborn independent component')
    .action(create);

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ lyef-react create myComponent willianjusten "Single Component" 0.0.1');
  console.log('    $ lyef-react create myComponent');
  console.log('');
});

program.parse(process.argv)
