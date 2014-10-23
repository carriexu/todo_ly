// Before we begin,
// A quick question: We see that in task.js, the Task prototype is defined like `Task.prototype.toggleCompleted = function(){`,
// whereas in task_view.js, the TaskView prototype is defined like `TaskView.prototype = {template: ... redner: ... init: ...}`,
// what's the difference between these two different ways of function declaration?
// Answer: no big difference at all, only stylistic difference.
// This way `TaskView.prototype = {template: ... redner: ... init: ...}` is object literal, and it is similar to how backbone works.

// logs that task_view.js is linked
console.log("task_view.js linked");

// for every Task there is also a TaskView
function TaskView(model){
  console.log('view created with model:', model);
  this.$el   = $("<li>");
  this.model = model; //set a reference to the model here, model is anything built with the term new Task
  //therefore, model refers to each individual task
  // this is the hook, that hooks into the Task model

  // attach the view to the model so that it can message the view!
  // this is the 2nd part of the two way binding
  // model.view = this; // all changes are triggered from the client, ie
                        // via the view, so this isn't necessary -- but if
                        // the server was making changes, then we may need
                        // to trigger events from the model on the view...
}

// Define the TaskView functions
TaskView.prototype = {
  //_.template refers to the underscore template we are using
  template: _.template($("#task-template").html()),

  render: function() {
    console.log('  view:render', this);
    // task is just a key we made up
    var temp = this.template({task: this.model}); //works like render, render this template with this model

    this.$el = $(temp); // reset el

    return this; // for chaining!
  },

  init: function() {
    console.log('  view:init', this);
    var view = this; // make it more semantic below...

    // build the element and then add to the DOM
    view.render();
    $("#tasks").append(view.$el);

    // attach event listeners, et al
    view.$el.on("click", "input",       view, view.toggleCompleted);
    view.$el.on("click", "span.remove", view, view.remove);

    return this; // for chaining!
  },

  toggleCompleted: function(event) {
    console.log('-> view:toggleCompleted', event.data);
    // this is the DOM node
    // event.data refers to the view instance (set in the handler above)
    event.data.$el.find("span.description").toggleClass('completed');

    // message the model
    //this is the binding part
    event.data.model.toggleCompleted();
  },

  remove: function(event) {
    console.log('-> view:remove', event.data);

    // remove from the DOM
    event.data.$el.remove();

    // remove from global list!
    // http://stackoverflow.com/questions/208105/how-to-remove-a-property-from-a-javascript-object
    delete todoApp.taskViews[event.data.viewId];

    // message the model
    event.data.model.destroy();
  }
}
