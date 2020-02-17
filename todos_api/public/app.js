$(document).ready(() => {

  $.getJSON("/api/todos")
  .then((data) => {
    addTodos(data);
  })
  .catch((err) => {
    console.log(err);
  })

  $('#todoInput').keypress((event) => {
    if(event.which == 13) { //pressed enter key
      createTodo();
    }
  });

  $('.list').on('click', 'li', function(e) {
    e.preventDefault();
    let clickedId = $(this).get(0).firstElementChild.getAttribute('data-id');
    let status = $(this).get(0).firstElementChild.getAttribute('data-completed');
    let updateUrl = '/api/todos/' + clickedId;
    let isTrueSet = (status == 'true')
    //$(this).children().first().toggle('done');
    $(this).get(0).firstElementChild.classList.toggle('done');
    console.log($(this).children().first());

    $.ajax({
      method: "PUT",
      url: updateUrl,
      data: {completed: !isTrueSet}
    })
    .then((data) => {
      console.log(clickedId + ': ' + data.message);
    })
    .catch((err) => {
      console.log(err);
    })
  });

  // listen for click on list but only for span and remove todo
  // can't just do for span as these aren't there when page loads
  $('.list').on('click','span', function(e) {
    e.preventDefault();
    e.stopPropagation(); // prevent click from bubbling up to li
    let clickedId = $(this).parent().attr("data-id");
    let deleteUrl = '/api/todos/' + clickedId;
    $(this).parent().remove();
    $.ajax({
      method: "DELETE",
      url: deleteUrl
    })
    .then((data) => {
      console.log(clickedId + ': ' + data.message);
    })
    .catch((err) => {
      console.log(err);
    })
  });

});




function addTodos(todos) {
  let todoList = [];
  todos.forEach((item, i) => {
    addTodo(item, todoList)
  });
  $('.list').append(todoList.join(''));
}

function addTodo(item, todoList) {
  if(item.completed === true) {
    todoList.push('<li><a href="" class="task done" data-id="'+ item._id  +
      '"' + 'data-completed="'+ item.completed  + '">' + item.name + '<span>X</span>' +'</a></li>');
  } else {
    todoList.push('<li><a href="" class="task" data-id="'+ item._id  + '"' +
    'data-completed="'+ item.completed  + '">' + item.name + '<span>X</span>' +'</a></li>');
  }
}

function createTodo(todo) {
  //send request for new todo
  const userInput = $('#todoInput').val();
  $.post('/api/todos', {name: userInput })
  .then((newTodo) => {
    $('#todoInput').val('');
    let todoList = [];
    addTodo(newTodo, todoList);
    $('.list').append(todoList.join(''));
  })
  .catch((err) => {
    console.log(err);
  });
}
