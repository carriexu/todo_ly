# Question: when we type in our browser localhost:3000, what happens in the back?
# 1. we specified in our routes.rb that `get '/' => "welcome#index"`, therefore, we are taken to index.html.erb under views/welcome. Inside is the html and a template wrapped in a script tag.
Rails.application.routes.draw do
  get '/' => "welcome#index"
  resources :tasks, :except => [:edit, :new]
end
