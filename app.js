function formatDate() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const now = new Date();

    const dayOfWeek = daysOfWeek[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];

    return `<h2 id="dayDateMonth"> ${dayOfWeek} , ${date} <br> ${month}`;
}

function formatTime() {
    const now = new Date();    

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    const formattedTime = `${hours}:${minutesStr} ${ampm}`;

    return formattedTime;
}

function updateDateTime() {
    const dateDisplay = document.getElementById('dayDateMonth');
    dateDisplay.innerHTML = formatDate();

    const TimeDisplay = document.getElementById('timeAmPm');
    TimeDisplay.innerText = formatTime();
}
updateDateTime();

setInterval(updateDateTime, 1000);

const input = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
let taskCount = 0;

function addTask() {
    if (input.value == "") {
        alert("You Must Write Something !!!");
    } else {
        let li = document.createElement("li");
        li.innerText = input.value;
        listContainer.appendChild(li); 
        
        taskCount++;
        updateTaskCount();

        let span = document.createElement('span');
        span.innerText = "\u00d7";
        li.appendChild(span);
        span.onclick = function() {
            li.remove();
            if (!li.classList.contains('checked')) {
                taskCount--;
            }
            updateTaskCount();
        }
    }
    input.value = '';
}

function updateTaskCount() {
    let task = document.getElementById('task-count');
    task.innerText = `${taskCount} Tasks`;
}

let addBtn = document.getElementById('add-btn');
addBtn.addEventListener("click", addTask);

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === 'LI') {
        if (e.target.classList.contains("checked")) {
            taskCount++;
        } else {
            taskCount--;
        }
        e.target.classList.toggle("checked");
        updateTaskCount();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
    }
}, false);

function deleteAllTasks() {
    listContainer.innerHTML = '';
    taskCount = 0;
    updateTaskCount();
}

let deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener("click", deleteAllTasks);



