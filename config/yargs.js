const options = {
  description: {
    demand: true,
    alias: 'd',
    desc: 'Task description'
  }
};
const updateOptions = {
  completed: {
    alias: 'c',
    desc: 'Mark as completed task'
  }
};

const clearListOptions= {
  confirm: {
    demand: true,
    alias: 'c',
    desc: 'Type "true" to confirm deletion from to do task list'
  }
};

const argv = require('yargs')
  .command('create', 'Creates a to do task', options)
  .command('update', 'Update a to do task', { ...updateOptions, ...options })
  .command('delete', 'Delete a to do task', options)
  .command('list', 'Shows created tasks', updateOptions )
  .command('clear-list', 'Delete the entire to do task list', clearListOptions)
  .help()
  .argv;

module.exports = {
  argv
};