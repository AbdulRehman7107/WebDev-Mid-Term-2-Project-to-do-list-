const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const doneSound = document.getElementById("doneSound");

// Load tasks
function getAllLocalStorage() {
  const allItems = [];
  for (let i = 0; i < localStorage.length; i++) {
    allItems.push({
      id: localStorage.key(i),
      task: localStorage.getItem(localStorage.key(i))
    });
  }
  return allItems;
}

addBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;

  localStorage.setItem(Date.now(), text);
  createTaskElement(text);
  input.value = "";
};

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "task-item";

  const circle = document.createElement("div");
  circle.className = "status-circle";

  const span = document.createElement("span");
  span.textContent = taskText;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";

  // Prevent delete from triggering done state
  delBtn.onclick = (event) => {
    event.stopPropagation();
    li.remove();
  };

  // Toggle completed state
  li.addEventListener("click", () => {
    li.classList.toggle("completed");

    if (li.classList.contains("completed")) {
      doneSound.play();
      span.style.color = "green";
      span.style.textDecoration = "line-through";
      circle.style.backgroundColor = "green";
    } else {
      span.style.color = "black";
      span.style.textDecoration = "none";
      circle.style.backgroundColor = "red";
    }
  });

  li.appendChild(circle);
  li.appendChild(span);
  li.appendChild(delBtn);
  list.appendChild(li);
}

function renderTask() {
  const allData = getAllLocalStorage();
  allData.forEach(item => createTaskElement(item.task));
}

renderTask();
