'use strict';

// sidebar
const formSidebar = document.querySelector('.form__sidebar');
const inputProject = document.getElementById('input__project');
const sidebarList = document.querySelector('.sidebar__list');
const buttonNewProject = document.querySelector('.btn__new__project');
const btnCancelProject = document.querySelector('.btn__cancel__project');

// main
const mainList = document.querySelector('.main__list');
const formMain = document.querySelector('.form__main');
const inputTitle = document.getElementById('title');
const inputDueDate = document.getElementById('dueDate');
const btnNewTodo = document.querySelector('.btn__new__todo');
const btnCancelTodo = document.querySelector('.btn__cancel__todo');

//form edit
const formEdit = document.querySelector('.form__edit');
const inputTitleEdited = document.getElementById('titleEdited');
const inputDateEdited = document.getElementById('dueDateEdited');
const btnCancelTodoEdit = document.querySelector('.btn__cancel__todo__edit');

// todos
class toDo {
    id = self.crypto.randomUUID();
    constructor(title, dueDate) {
        (this.title = title), (this.dueDate = dueDate);
    }
}

// project
class Project {
    id = self.crypto.randomUUID();
    todos = [];
    constructor(projectTitle) {
        this.projectTitle = projectTitle;
    }

    pushTodo(todo) {
        this.todos.push(todo);
        return [...this.todos];
    }
}

// project manager
class ProjectManager {
    projects = [];
    clickedProject;
    clickedProjectId;
    addTodo;
    addTodoEdited;
    clickedTodoId;

    constructor() {
        ///// EVENT LISTENERS

        //check for no todo
        btnNewTodo.addEventListener('click', this.displayMainForm.bind(this));


        // display form
        buttonNewProject.addEventListener('click', this.displaySidebarForm);

        // create project
        formSidebar.addEventListener('submit', this.createProject.bind(this));

        //render todos when clicked on project
        sidebarList.addEventListener('click', this.renderTodos.bind(this));

        // create new todo
        formMain.addEventListener('submit', this.createTodo.bind(this));

        // edit todo
        formEdit.addEventListener('submit', this.formEditSubmit.bind(this));
    }

    ///// METHODS
    addProject(pTitle) {
        this.projects.push(pTitle);
    }

    createProject(e) {
        e.preventDefault();

        const newProject = new Project(inputProject.value);

        this.addProject(newProject);

        this.updateProjectsDom();

        this.hideForm(formSidebar);

        inputProject.value = '';
    }

    updateProjectsDom() {
        sidebarList.innerHTML = '';

        this.projects.forEach((project) => {
            const li = document.createElement('li');
            li.className = 'sidebar__list__item';
            li.setAttribute('id', `${project.id}`);

            let html;

            html = `<p>
                      ${project.projectTitle}
                    </p>
                      <p class="span__icon">
                        <i class="las la-times-circle icon icon__close__project"></i>
                      </p>
                  `;
            li.insertAdjacentHTML('afterBegin', html);
            sidebarList.appendChild(li);

            const icon = li.querySelector('.icon__close__project');

            // delete project
            this.deleteProjectEvent(icon, li);
        });
    }

    deleteProjectEvent(icon, listEl) {
        icon.addEventListener('click', (e) => {
            const clicked = e.target.closest('.sidebar__list__item');
            const clickedProjectId = this.projects.findIndex(
                (proj) => proj.id === clicked.id
            );
            this.projects.splice(clickedProjectId, 1);

            listEl.remove();

            this.hideForm(formMain);
            mainList.innerHTML = '';

            inputTitle.value = inputDueDate.value = '';
        });
    }

    detectClickedProject(e) {
        const clicked = e.target.closest('.sidebar__list__item');
        this.clickedProject = this.projects.find(
            (project) => project.id === clicked.id
        );
    }

    //// todos
    createTodo(e) {
        e.preventDefault();

        // const date = new Date(inputDueDate.value);
        // const dateFormated = new Intl.DateTimeFormat('en-US').format(date);

        this.addTodo = new toDo(inputTitle.value, inputDueDate.value);

        this.clickedProject.todos.push(this.addTodo);

        mainList.innerHTML = '';

        this.clickedProject.todos.forEach((todo, i) => {
            const li = document.createElement('li');
            li.className = 'main__list__item';
            li.innerHTML = `<div class="todo__item">
                    <p>
                      <i class="las la-pen-square icon"></i>  
                  </p>
                    <p class="todo_p">Title:</p> 
                     <p class="todo_p2"> ${todo.title}</p>
                  </div>    
                <div class="todo__item">
                  <p>
                    <i class="las la-calendar-check icon"></i>
                  </p>
                  <p class="todo_p">Due date:</p>
                  <p>${todo.dueDate}</p>
                </div>
                <div class="todo__buttons__div">
                    <button class="btn btn__todo__edit">edit</button>
                   <button class="btn btn__todo__delete">delete</button>
                </div>
                  `;

            mainList.insertAdjacentElement('afterBegin', li);

            // delete todo
            this.addDeleteEvent(li, todo);

            // edit todo
            this.addEditEvent(li, todo);
        });

        this.hideForm(formMain);

        inputTitle.value = inputDueDate.value = '';
    }

    addDeleteEvent(element, todo) {
        const btnDeleteTodo = element.querySelector('.btn__todo__delete');

        btnDeleteTodo.addEventListener('click', () => {
            this.clickedTodoId = this.clickedProject.todos.findIndex(
                (td) => td.id === todo.id
            );

            this.clickedProject.todos.splice(this.clickedTodoId, 1);
            element.remove();
        });
    }

    addEditEvent(element, todo) {
        const btnEdit = element.querySelector('.btn__todo__edit');

        btnEdit.addEventListener('click', (e) => {
            e.preventDefault();

            this.clickedTodoId = this.clickedProject.todos.findIndex(
                (td) => td.id === todo.id
            );

            formEdit.classList.remove('hidden');

            element.parentNode.insertBefore(formEdit, element.nextSibling);
            inputTitleEdited.value =
                this.clickedProject.todos[this.clickedTodoId].title;

            inputDateEdited.value =
                this.clickedProject.todos[this.clickedTodoId].dueDate;
        });
    }

    renderTodos = function (e) {
        this.detectClickedProject(e);

        this.clickedProject.todos.forEach((todo, i) => {
            const li = document.createElement('li');
            li.className = 'main__list__item';
            li.innerHTML = `<div class="todo__item">
                    <p>
                      <i class="las la-pen-square icon"></i>  
                  </p>
                    <p class="todo_p">Title:</p> 
                     <p class="todo_p2"> ${todo.title}</p>
                  </div>    
                <div class="todo__item">
                  <p>
                    <i class="las la-calendar-check icon"></i>
                  </p>
                  <p class="todo_p">Due date:</p>
                  <p>${todo.dueDate}</p>
                </div>
                <div class="todo__buttons__div">
                    <button class="btn btn__todo__edit">edit</button>
                   <button class="btn btn__todo__delete">delete</button>
                </div>
                <div class="todo__item">
                 <input class="checkBox" type="checkbox"  name="checkbox" ${todo.setCheckBoxAttribute()} />
                </div>
                  `;

            mainList.insertAdjacentElement('afterBegin', li);
        });
    };

    // form edit todo

    formEditSubmit(e) {
        e.preventDefault();

        mainList.innerHTML = '';

        this.addTodo = new toDo(inputTitleEdited.value, inputDateEdited.value);

        this.clickedProject.todos[this.clickedTodoId] = this.addTodo;

        this.clickedProject.todos.forEach((todo, i) => {
            const li = document.createElement('li');
            li.className = 'main__list__item';
            li.innerHTML = `<div class="todo__item">
                    <p>
                      <i class="las la-pen-square icon"></i>  
                  </p>
                    <p class="todo_p">Title:</p> 
                     <p class="todo_p2"> ${todo.title}</p>
                  </div>    
                <div class="todo__item">
                  <p>
                    <i class="las la-calendar-check icon"></i>
                  </p>
                  <p class="todo_p">Due date:</p>
                  <p>${todo.dueDate}</p>
                </div>
                <div class="todo__buttons__div">
                    <button class="btn btn__todo__edit">edit</button>
                   <button class="btn btn__todo__delete">delete</button>
                </div>
                  `;

            mainList.insertAdjacentElement('afterBegin', li);

            inputTitleEdited.value = inputDateEdited.value = '';

            // delete todo
            this.addDeleteEvent(li, todo);

            // edit todo
            this.addEditEvent(li, todo);

            this.hideForm(formEdit);
        });
    }

    displayMainForm() {
        if (!this.clickedProject) return alert('You must create a project first');

        formMain.classList.remove('hidden');
        inputTitle.value = inputDueDate.value = '';
    }

    displaySidebarForm = function () {
        formSidebar.style.opacity = 100;
        formSidebar.classList.remove('hidden');
    };

    hideForm = function (form) {
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => {
            form.style.display = 'grid';
        }, 1000);
    };
}

// project manager
const app = new ProjectManager();