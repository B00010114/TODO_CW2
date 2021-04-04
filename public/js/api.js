function addElement (todo) {
    var newdiv = document.createElement("div");
    newdiv.appendChild(document.createTextNode(todo.title));
    document.body.appendChild(newdiv);
  }
  
  fetch("/api/v1/todos").then(res => res.json()).then(data => {
      data.forEach(todo => addElement(todo))
  })