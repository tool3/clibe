# clitron
use any npm library as a cli

# install
```bash
npm install clitron -g
```
or see usage below for running with `npx`


# usage
```bash
npx clitron <lib-name> [command] [args..]
```
or
```bash
clitron --libName 'lib-name' -c 'some-command' -a 'args' 'for' 'command'
```


# example
```bash
npx clitron 'gradient-string' 'teen' 'HELLO WORLD'
```

![](./hello.png)