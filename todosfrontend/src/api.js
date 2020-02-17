const APIURL = '/api/todos/';

function handleError(res) {
  if(!res.ok) {
    if(res.status >= 400 && res.status < 500) {
      return res.json().then(data => {
        let err = {errorMessage: data.message};
        throw err;
      })
    } else {
      let err = {errorMessage: 'Please try again later: Server not responding'};
      throw err;
    }
  }
  return res.json();
}

export async function getTodos() {
  return fetch(APIURL)
  .then(res => handleError(res))
}

export async function createTodo(newTodo) {
  return fetch(APIURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: newTodo})
  })
  .then(res => handleError(res))
}

export async function removeTodo(id) {
  const DELETEURL = APIURL + id;
  return fetch(DELETEURL, {
    method: 'DELETE',
  })
  .then(res => handleError(res))
}

export async function updateTodo(todo) {
  console.log("todo was clicked");
  const UPDATEURL = APIURL + todo._id;
  return fetch(UPDATEURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({completed: !todo.completed})
  })
  .then(res => handleError(res))
}
