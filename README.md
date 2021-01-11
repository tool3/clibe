# clibe ⎇
use any npm library as a cli

# install
```bash
npm install clibe -g
```
or see usage below for running with `npx`


# usage
```bash
npx clibe <lib-name> [command] [args..]
```
for example   
```bash
clibe 'lib-name' 'some-command' 'args' 'for' 'command'
```

# example
```bash
npx clibe 'gradient-string' 'teen' 'HELLO WORLD'
```
output:   
![](./hello.png)

```bash
npx clibe 'voca' 'camelCase' 'hello world'
```
output:   
```
helloWorld
```

```bash
npx clibe 'moment' 'format' 'MMMM Do YYYY' 'h:mm:ss a' -i 
```
output:   
```
January 11th 2021
```