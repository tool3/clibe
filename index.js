#!/usr/bin/env node

const yargs = require('yargs');
const execute = require('util').promisify(require('child_process').exec);
yargs
    .command(
        '$0 <lib-name> [command] [args..]',
        'use any npm library as a cli',
        { },
        async argv => {
            try {
                if (!argv.libName) throw 'no lib provided. run any-cli <lib-name>';
                await execute(`npm install ${argv.libName}`, {cwd: __dirname});
                const lib = require(argv.libName);
                let result = '';
                if (argv.async) {
                    result = argv.args ? await lib[argv.command](...argv.args) : await lib[argv.command]();
                } else {
                    result = argv.args ? lib[argv.command](...argv.args) : lib[argv.command]();
                }
                console.log(result);
            } catch (error) {
                if (error.message.includes('lib[argv.command] is not a function')) {
                    console.log(`\x1b[31;1mcommand passed to \x1b[0;2m${argv.libName}\x1b[0m \x1b[31;1mdoes not exist\x1b[0m`)
                } else {
                    console.log(error);    
                }   
            }
        })
    .example("$0 gradient-string 'summer' 'HELLO WORLD'")
    .option('command', { alias: 'c', type: 'string', desc: 'command to run' })
    .option('args', { alias: 'a', type: 'array', desc: 'arguments for command' })
    .option('async', { alias: 's', type: 'boolean', desc: 'await command' })
    .help()
    .wrap(90)
    .argv