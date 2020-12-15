const fs = require('fs');
var colors = require('colors/safe');
const filters = require('../filters/filters')

let toDoList = [];

const isTypeString = (status) => {
  return typeof status === 'string';
}

const formatStatus = (completed) => {
  return completed.toLowerCase() === 'true' ? true : false;
}

const loadDB = (data = null) => {
  try {
    if (data) {
      toDoList = data;
    } else {
      toDoList = require('../db/data.json');
    }
  } catch (error) {
    console.log('error:', error);
    toDoList = [];
  }
}

const saveDB = (callback) => {
  let data = JSON.stringify(toDoList);

  fs.writeFile('db/data.json', data, (err) => {
    if (err) throw err;

    if (callback) {
      callback();
    }
  });
}

const create = (description) => {
  loadDB();

  if (toDoList.some(task => task.description.toLowerCase() === description.toLowerCase())) {
    return console.log(colors.red(`The task "${description}" already exists!`));
  }

  description = filters.capitalize(description);

  let toDo = {
    description,
    completed: false
  };

  toDoList.push(toDo);
  
  saveDB(() => {
    getList();
  });

  return toDo;
}

const getList = (completed = null, data = null) => {
  loadDB(data);

  if (isTypeString(completed)) {
    completed = formatStatus(completed);
    toDoList = toDoList.filter(task => task.completed === completed);
  }

  for (const index in toDoList) {
    console.log(colors.green('=====TO DO LIST====='));
    console.log(`${Number(index) + 1}.- `, toDoList[index].description);
    console.log('Completed: ', toDoList[index].completed);
    console.log(colors.green('==================='));
  }

  if (!toDoList.length) {
    console.log(colors.green('=====TO DO LIST====='));
    console.log('No tasks found');
    console.log(colors.green('===================='));
  }
}

const update = (description, completed = true) => {
  loadDB();

  let index = toDoList.findIndex(task => task.description === filters.capitalize(description));

  if ( index >= 0) {
    if (isTypeString(completed)) {
      completed = formatStatus(completed);
    }

    toDoList[index].completed = completed;
    saveDB(() => {
      getList();
    });
  } else {
    console.log(colors.red("There are no matching tasks"));
  }
}

const remove = (description) => {
  loadDB();

  description = filters.capitalize(description);

  if (toDoList.some(task => task.description === description)) {
    toDoList = toDoList.filter(task => task.description !== description);

    saveDB(() => {
      getList(null, toDoList);
    });
  } else {
    console.log(colors.red("There are no matching tasks"));
  }

}

module.exports = {
  create,
  getList,
  update,
  remove
}