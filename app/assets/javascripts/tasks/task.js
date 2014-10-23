// First we validate that our file is linked with console.log
console.log("task.js linked");

// First we have the Task constructor function, and we are passing in a data object.
// We do this because we want to be able to refer back to it
//
// what is does data stand for?
// data could have been named any other name, it represents the specific to-do item that the Task is calling on
//
// For example, in our console, we can type the following
//
// `var data = {id: 1, description: "stuff", completed: false }`
//
// `var thing = new Task(data)`
//
// this creates a new object named data that we can pass into Task
function Task(data) {
  console.log('model created with data:', data);
  // You might be wondering, what does the this in this.id, this.completed...etc refer to?
  //
  // this here is referring to the instance that will be created with Task, the constructor function.
  //
  // We are setting the attributes of the data object we passed through to be the attributes of the Task
  //
  // It creates the equivalent of getters and setters in ruby
  this.id          = data.id;
  this.completed   = data.completed;
  this.description = data.description;
}
//
//
// this is a function for the toggle action on the specific to-do item, turn state of the item into completed
Task.prototype.toggleCompleted = function(){
  console.log('-> model:toggleCompleted', this);
  // What is this in here?
  // It is the Task object, below is an example
  //
  // Task {id: 9, completed: false, description: "Sack Winterfell", toggleCompleted: function, create: function…}
  //
  // What does this.completed do?
  //
  // this sets the completed boolean value on that object to the opposite of its previous value
  this.completed = !this.completed; // update model!
  // What does this.update do?
  // calls the Task.prototype.update, which makes an ajax call and updates the database with the new completed boolean value
  this.update(); // persist!
}

Task.prototype.create = function() {
  console.log('!(AJAX) model:create initiated');
  $.ajax({
    url:      "/tasks",
    type:     "POST",
    dataType: "json",
    context:  this, // this sets context in done to the object
    data: {
      // task is just a key that we are assigning to the values
      task: { // nested for rails strong params (white-listing)!
        description: this.description,
        completed:   this.completed
      }
    }
  }).done(function(data){
    // give the model the data from the server (id, etc.)
    this.id        = data.id;
    this.completed = data.completed;
    console.log('!(AJAX) model:create complete', data, this);
  });
}

Task.prototype.update = function() {
  console.log('!(AJAX) model:update initiated');
  $.ajax({
    url:      "/tasks/" + this.id,
    type:     "PATCH",
    dataType: "json",
    context:  this, // this sets context in done to the object
    data: {
      //task is the key which you can access with params[:task]
      task: { // nested for rails strong params (white-listing)!
        description: this.description,
        completed:   this.completed
      }
    }
  }).done(function(data){
    console.log('!(AJAX) model:update complete', data, this);
  });
}

Task.prototype.destroy = function(){
  console.log('!(AJAX) model:destroy initiated');
  $.ajax({
    url:      "/tasks/" + this.id,
    type:     "DELETE",
    dataType: "json",
    context:  this // this sets context in done to the object
  }).done(function(data){
    console.log('!(AJAX) model:destroy complete', data, this);
  });
}
