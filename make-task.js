document.addEventListener('DOMContentLoaded', () => {

    const taskInput = document.querySelector('.task-input input');
    const addButton = document.querySelector('.task-input button');
    const taskCard = document.querySelector('.empty-card');
    const filterButtons = document.querySelectorAll('.filters button');

    if (!taskInput || !addButton || !taskCard) return;

    const API_URL = 'http://localhost:3000/tasks';

    const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser')
    );

    if (!loggedInUser || !loggedInUser.id) {
        window.location.href = 'index.html';
        return;
    }

    const currentUserId = String(loggedInUser.id);

    const emptyMessage = taskCard.innerHTML;

    let tasks = [];
    let currentFilter = 'All';


    function displayTasks() {

        taskCard.innerHTML = '';

        if (tasks.length === 0) {
            taskCard.classList.remove('has-tasks');
            taskCard.innerHTML = emptyMessage;
            return;
        }

        taskCard.classList.add('has-tasks');

        let filteredTasks = tasks.filter(task => {

            if (currentFilter === 'Active') {
                return !task.completed;
            }

            if (currentFilter === 'Completed') {
                return task.completed;
            }

            return true;

        });

        if (filteredTasks.length === 0) {
            const message = document.createElement('p');
            message.textContent = 'No tasks found.';
            taskCard.appendChild(message);
            return;
        }

        filteredTasks.forEach(task => {

            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;

            const title = document.createElement('span');
            title.textContent = task.title;

            if (task.completed) {
                title.style.textDecoration = 'line-through';
                title.style.opacity = '0.5';
            }

            checkbox.addEventListener('change', async () => {

                try {
                    const response = await fetch(
                        `${API_URL}/${task.id}`,
                        {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                completed: checkbox.checked
                            })
                        }
                    );

                    if (!response.ok) {
                        throw new Error('Could not update task');
                    }

                    task.completed = checkbox.checked;
                    displayTasks();

                } catch (error) {
                    console.error(error);
                    alert('Could not update task.');
                }

            });
            const editBtn = document.createElement('button');

editBtn.className = 'edit-btn';
editBtn.textContent = 'Edit';

editBtn.addEventListener('click', () => {

    const editInput = document.createElement('input');

    editInput.type = 'text';
    editInput.value = task.title;
    editInput.className = 'edit-input';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'cancel-btn';

    title.replaceWith(editInput);

    editBtn.style.display = 'none';

    taskItem.insertBefore(saveBtn, deleteBtn);
    taskItem.insertBefore(cancelBtn, deleteBtn);

    editInput.focus();

    cancelBtn.addEventListener('click', () => {
        editInput.replaceWith(title);
        saveBtn.remove();
        cancelBtn.remove();
        editBtn.style.display = '';
    });

    saveBtn.addEventListener('click', async () => {

        const updatedTitle = editInput.value.trim();

        if (updatedTitle === '') {
            alert('Task cannot be empty!');
            return;
        }

        try {

            const response = await fetch(`${API_URL}/${task.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: updatedTitle
                })
            });

            if (!response.ok) {
                throw new Error('Could not update task');
            }

            task.title = updatedTitle;

            displayTasks();

        } catch (error) {
            console.error(error);
            alert('Could not update task!');
        }

    });

});


            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '<img src="Frame.png">';

            deleteBtn.addEventListener('click', async () => {

                try {
                    const response = await fetch(`${API_URL}/${task.id}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error('Could not delete task');
                    }

                    tasks = tasks.filter(t => t.id !== task.id);
                    displayTasks();

                } catch (error) {
                    console.error(error);
                    alert('Could not delete task.');
                }

            });


            taskItem.appendChild(checkbox);
            taskItem.appendChild(title);
            taskItem.appendChild(editBtn);
            taskItem.appendChild(deleteBtn);

            taskCard.prepend(taskItem);

        });

    }



    async function loadTasks() {

        try {
            const response = await fetch(
                `${API_URL}?userId=${encodeURIComponent(currentUserId)}`
            );

            if (!response.ok) {
                throw new Error('Could not load tasks');
            }

            tasks = await response.json();

            tasks.reverse();

            displayTasks();

        } catch (error) {
            console.error(error);
            alert('JSON Server connection failed!');

        }

    }



    async function addTask() {

        const title = taskInput.value.trim();

        if (title === '') {
            alert('Please enter a task!');
            return;
        }

        addButton.disabled = true;

        try {

            const response = await fetch(API_URL, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    title: title,
                    completed: false,
                    userId: currentUserId
                })
            });

            if (!response.ok) {
                throw new Error('Could not add task');
            }

            const newTask = await response.json();

            tasks.unshift(newTask);

            taskInput.value = '';

            currentFilter = 'All';

            filterButtons.forEach(button => {
                button.classList.toggle(
                    'active',
                    button.textContent.trim() === 'All'
                );
            });

            displayTasks();

        } catch (error) {
            console.error(error);
            alert('Could not add task!');
        }

        addButton.disabled = false;

    }


    addButton.addEventListener('click', addTask);



    taskInput.addEventListener('keydown', event => {

        if (event.key === 'Enter') {
            addTask();
        }

    });



    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            currentFilter = button.textContent.trim();

            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');

            displayTasks();

        });

    });



    const logoutBtn = document.querySelector('.logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {

            localStorage.removeItem('loggedInUser');

            window.location.href = 'index.html';

        });
    }



    loadTasks();

});

