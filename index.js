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
                const args = argv.args.length > 0 ? argv.args : argv.arguments;
                const init = argv.init;
                const initArgs = argv.initArgs ? argv.initArgs.map(a => a.toString()) : [];
                const library = init ? (initArgs ? lib(initArgs) : lib()) : lib;

                let result = '';
                if (argv.async) {
                    result = argv.command ? await library[argv.command](...args) : await library(...args);
                } else {
                    result = argv.command ? library[argv.command](...args) : library(...args);
                }
                console.log(result);
            } catch (error) {
                if (error.message.includes('library[argv.command] is not a function')) {
                    console.log(`\x1b[31;1mcommand passed to \x1b[0;2m${argv.libName}\x1b[0m \x1b[31;1mdoes not exist\x1b[0m`)
                } else {
                    console.log(error);    
                }   
            }
        })
    .example("$0 gradient-string 'summer' 'HELLO WORLD'")
    .option('command', { alias: 'c', type: 'string', desc: 'command to run' })
    .option('arguments', { alias: 'a', type: 'array', desc: 'arguments for command', default: [] })
    .option('async', { alias: 's', type: 'boolean', desc: 'await command' })
    .option('init', { alias: 'i', type: 'boolean', desc: 'call library constructor' })
    .option('initArgs', { alias: 'A', type: 'array', desc: 'arguments for initiating the library', default: [] })
    .help()
    .wrap(90)
    .argv