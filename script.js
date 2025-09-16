// CONTACT FORM (index.html)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('status').textContent = "Message sent successfully!";
  });
}

// TO-DO APP (todo.html)
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  if (taskList) {
    taskList.innerHTML = '';
    tasks.forEach((task, idx) => {
      const li = document.createElement('li');
      li.textContent = task;
      const delBtn = document.createElement('button');
      delBtn.textContent = 'X';
      delBtn.onclick = () => deleteTask(idx);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  }
}

function addTask() {
  const task = taskInput.value.trim();
  if (!task) return;
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskInput.value = '';
  loadTasks();
}

function deleteTask(idx) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(idx, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

if (addBtn) {
  addBtn.addEventListener('click', addTask);
  window.onload = loadTasks;
}

// PRODUCT LISTING (products.html)
const products = [
  {name:'Phone', category:'electronics', price:500, rating:4.5},
  {name:'T-Shirt', category:'clothing', price:20, rating:4.2},
  {name:'Laptop', category:'electronics', price:1000, rating:4.8},
  {name:'Jeans', category:'clothing', price:40, rating:4.1}
];

const container = document.getElementById('productContainer');
const filter = document.getElementById('filterCategory');
const sort = document.getElementById('sortOption');

function renderProducts() {
  if (!container) return;
  const category = filter.value;
  const sortBy = sort.value;
  let filtered = products.filter(p => category==='all' || p.category===category);
  filtered.sort((a,b)=> a[sortBy]-b[sortBy]);
  container.innerHTML = '';
  filtered.forEach(p=>{
    const div = document.createElement('div');
    div.className='card';
    div.innerHTML=`<h3>${p.name}</h3><p>Price: $${p.price}</p><p>Rating: ${p.rating}</p>`;
    container.appendChild(div);
  });
}

if (filter && sort) {
  filter.addEventListener('change', renderProducts);
  sort.addEventListener('change', renderProducts);
  window.onload = renderProducts;
}