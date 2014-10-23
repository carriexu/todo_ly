// what is the to-do app? what does it do?
// The to-do app is a simple app that lets users create new to-do item, check off current ones, or delete all together
//
// **Question**: when we type in our browser localhost:3000 or any other origin that we are running it in,
// what happens in the backend?
//
// **Answer**: We specified in our routes.rb that `get '/' => "welcome#index"`,
//  therefore, we are taken to index.html.erb under views/welcome.
//  Inside is the html and a template wrapped in a script tag.
//
// **NOTE: open index.html.erb and look at it side by side with the following comments**
//
// 2. Inside the script tag `<script type="text/template" id="task-template">`
//  it is helpful to understand what each line is doing.
// 3. The first line is `<span class="description<%%= task.completed ? " completed" : "" %>">`,
//
//  this is a very busy line, with the confuing `<%%=` in there.
//
//  Why are there two % in there? The `<%= ... %> ` are called delimiters, and these ones specifically are ERB-style delimiters.
//
//  They are very useful because we can interpolate variables with them.
//  There is an issue because ERB and underscore have the same default delimitors.
//  So because we are using both undescore and ERB, we see `<%%=`, the extra % functions as an escape.
//  this will render as `<%=` on the html when we view source on the web page.
// 4. The span have a class of `description <%%= task.completed ? " completed" : "" %>`and what it does is, it checks for the state of task.completed,
//  if that is true, it sets it as completed, else, it's empty.
// 5. So what if completed is true?
//
//  If completed is true, the span class gets set to "description completed",
//  and in our application.css file, there is a class called completed, and it sets the `text-decoration: line-through`.
//  Basically, this is how when we check the to-do item, the item appears striked out.
//  In the background, we are changing the state of the "completed" boolean value to true, and that adds the completed class to the description, and that's how our completed to-do items appear striked out.
// 6. Wait a minute, where is this "completed" boolean value?
//
//  We actually defined this boolean value along with some other attributes when we did `rails generate scaffold` (in this project it was done for us)
//  We can see this in our schema.rb inside our db files
//  this is it: `t.boolean  "completed",   default: false`

console.log('main.js linked');
//if there is no dollar sign, jquery is not linked
if($ !== undefined) { console.log('  jQuery library loaded!');     }
if(_ !== undefined) { console.log('  Underscore library loaded!'); }


var todoApp       = {}; // create a global namespace
todoApp.taskNum   = 0;
todoApp.taskViews = {}; // this is the global variable to hold our tasks
                        // we hold a reference to our views, bc they in turn
                        // reference our models, via view.model

todoApp.pushView = function(newView) {
  // remember redis? :)
  var viewId = todoApp.taskNum; todoApp.taskNum++; // increment counter
  newView.viewId = viewId; // give that ID to the view, so it can remove itself
  todoApp.taskViews[viewId] = newView; // add our view to the global list of
                                       //   views with a "unique" ID
}

todoApp.createTask = function(data) {
  var task     = new Task(data);
  var taskView = new TaskView(task).init();

  todoApp.pushView(taskView);
  return task; // return the model for chaining!
}

todoApp.loadTasks = function() {
  // INDEX: GET /tasks
  $.ajax({
    url: "/tasks",
    format: "json"
  }).done(function(data){
    // create a local task (task model, view and pushed on to the task list)
    for(var i = 0; i < data.length; i++){
      todoApp.createTask(data[i]);
    }
  });
}

console.log("1. application initialized...", todoApp);

//this is another way to write document.read
$(function(){
  console.log('2. page (DOM) loaded: now running onload...');

  // caches references to repeatedly need DOM nodes
  todoApp.$body         = $("body");
  todoApp.$inputField   = $("input");
  todoApp.$submitButton = $("button");
  todoApp.$taskList     = $("ul").eq(0);

  // attach a model & view creation function to the form submission
  todoApp.$submitButton.on("click", function(event){
    event.preventDefault();
    var taskDescription = todoApp.$inputField.val();
    todoApp.$inputField.val(''); // reset the input
    todoApp.createTask({ description: taskDescription })
           .create(); // call create on the model that is returned (see above)
  });

  // start the app!
  todoApp.loadTasks();
});
