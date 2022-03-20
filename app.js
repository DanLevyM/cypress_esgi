const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('form input');
let allTodos = [];

form.addEventListener('submit', event => {
  event.preventDefault();

  const text = input.value.trim();
  if(text !== ''){
    addTodo(text);
    input.value = '';
  }
})

function addTodo(text){
  const todo = {
    text,
    // La méthode Dat.now() renvoie le nb de millisecondes écoulées depuis le 1er janvier 1970
    id: Date.now()
  }
  displayList(todo);
}

function displayList(todo){
  const item = document.createElement('li');
  item.setAttribute('data-key', todo.id);

  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.addEventListener('click', todoDone);
  item.appendChild(input);

  const txt = document.createElement('span');
  txt.innerText = todo.text;
  item.appendChild(txt);

  const btn = document.createElement('button');
  btn.addEventListener('click', deleteTodo);
  const img = document.createElement('img');
  img.setAttribute('src', 'ressources/fermer.svg');
  img.classList.add('delete');
  btn.appendChild(img);
  item.appendChild(btn);

  liste.appendChild(item);
  allTodos.push(item);
  console.log(allTodos);
}

function todoDone(e){
  e.target.parentNode.classList.toggle('finDeTache')
}

function deleteTodo(e) {
  allTodos.forEach(el => {
    if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
      el.remove();
      allTodos = allTodos.filter(li => li.dataset.key !== el.dataset.key);
    }
  })
}

addTodo('My to-do 1');
addTodo('My to-do 2');