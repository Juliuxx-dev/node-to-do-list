const argv = require('./config/yargs').argv;
const toDo = require ('./to-do/to-do');
var colors = require('colors/safe');

let command = argv._[0];
const { description, completed } = argv;

switch (command) {
  case 'create':
    let task = toDo.create(description);
    break;
  case 'list':
    toDo.getList(completed);
    break;
  case 'update':
    toDo.update(description, completed);
    break;
  case 'delete':
    toDo.remove(description);
    break;

  default:
    console.log(colors.red('Unknown command, please try with:', colors.yellow('app --help')));
    break;
}