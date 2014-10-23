## ToDo.ly

**What is the to-do app? what does it do?**

 The to-do app is a simple app that lets users create new to-do item, check off current ones, or delete all together


**when we type in our browser localhost:3000 or any other origin that we are running it in,
what happens in the backend?**

  * We specified in our routes.rb that `get '/' => "welcome#index"`,
therefore, we are taken to index.html.erb under views/welcome.
Inside is the html and a template wrapped in a script tag.

**NOTE: open index.html.erb and look at it side by side with the following comments**

* Inside the script tag `<script type="text/template" id="task-template">`
The first line is `<span class="description<%%= task.completed ? " completed" : "" %>">`.
This is a very busy line, with the confuing `<%%=` in there.


**Why are there two % in there? The `<%= ... %> ` are called delimiters, and these ones specifically are ERB-style delimiters.**

  * They are very useful because we can interpolate variables with them. There is an issue because ERB and underscore have the same default delimitors. So because we are using both undescore and ERB, we see `<%%=`, the extra % functions as an escape character. This will render as `<%=` on the html when we view source on the web page.

* The span have a class of `description <%%= task.completed ? " completed" : "" %>`and what it does is, it checks for the state of task.completed, if that is true, it sets it as completed, else, it's empty.

**So what if completed is true?**

    * If completed is true, the span class gets set to "description completed", and in our application.css file, there is a class called completed, and it sets the `text-decoration: line-through`.Basically, this is how when we check the to-do item, the item appears striked out. In the background, we are changing the state of the "completed" boolean value to true, and that adds the completed class to the description, and that's how our completed to-do items appear striked out.

* Wait a minute, where is this "completed" boolean value?

    * We actually defined this boolean value along with some other attributes when we did `rails generate scaffold` (in this project it was done for us). We can see this in our schema.rb inside our db files. This is it: `t.boolean  "completed",   default: false`
