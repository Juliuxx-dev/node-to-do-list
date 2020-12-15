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
    // default: true,
    desc: 'Mark as completed task'
  }
};

const argv = require('yargs')
  .command('create', 'Creates a to do task', options)
  .command('update', 'Update a to do task', { ...updateOptions, ...options })
  .command('delete', 'Delete a to do task', options)
  .command('list', 'Shows created tasks', updateOptions )
  .help()
  .argv;

module.exports = {
  argv
};