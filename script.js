'use strict';

//import classes
import ToDo from './modulesDOM/classComponents/todo.js';
import Project from './modulesDOM/classComponents/project.js';

// import forms DOM
import {
    displayMainForm,
    displaySidebarForm,
    hideForm,
    preventDefaultSubmitProject,
    preventDefaultSubmitTodo,
    preventDefaultSubmitEdit,
} from './modulesDOM/formDOM.js';

// import projects DOM
import {
    updateProjectsDom,
    deleteProjectEvent,
} from './modulesDOM/projectDOM.js';

// import todos DOM
import {
    createTodoContent,
    addDeleteEvent,
    addEditEvent,
    addCheckBoxEvent,
    attachTodoEventListeners,
} from './modulesDOM/todoDOM.js';

export const formSidebar = document.querySelector('.form__sidebar');
export const inputProject = document.getElementById('input__project');
export const sidebarList = document.querySelector('.sidebar__list');
const buttonNewProject = document.querySelector('.btn__new__project');
const btnCancelProject = document.querySelector('.btn__cancel__project');

// main
export const mainList = document.querySelector('.main__list');
export const formMain = document.querySelector('.form__main');
export const inputTitle = document.getElementById('title');
export const inputDueDate = document.getElementById('dueDate');
const btnNewTodo = document.querySelector('.btn__new__todo');
const btnCancelTodo = document.querySelector('.btn__cancel__todo');

//form edit
export const formEdit = document.querySelector('.form__edit');
export const inputTitleEdited = document.getElementById('titleEdited');
export const inputDateEdited = document.getElementById('dueDateEdited');
const btnCancelTodoEdit = document.querySelector('.btn__cancel__todo__edit');


// project manager
class ProjectManager {
    projects = [];
    clickedProject;
    clickedProjectId;
    newTodo;
    newTodoEdited;
    clickedTodoId;

    constructor() {
        this.getLocalStorage();

        ///// EVENT LISTENERS

        //display todos form, check for no todo
        btnNewTodo.addEventListener('click', displayMainForm);

        // display projects form
        buttonNewProject.addEventListener('click', displaySidebarForm);

        // create project
        formSidebar.addEventListener('submit', this.createProject.bind(this));

        //render todos when clicked on project
        sidebarList.addEventListener('click', this.renderTodos.bind(this));

        // create new todo
        formMain.addEventListener('submit', this.createTodo.bind(this));

        // edit todo
        formEdit.addEventListener('submit', this.formEditSubmit.bind(this));

        // prevent default submit project
        btnCancelProject.addEventListener('click', preventDefaultSubmitProject);


        // prevent default submit todo
        btnCancelTodo.addEventListener('click', preventDefaultSubmitTodo);

        // prevent default submit edit form
        btnCancelTodoEdit.addEventListener('click', preventDefaultSubmitEdit);
    }

    ///// METHODS
    addProject(pTitle) {
        this.projects.push(pTitle);
    }

    createProject(e) {
        e.preventDefault();

        const newProject = new Project(inputProject.value);

        this.addProject(newProject);

        updateProjectsDom(this);

        hideForm(formSidebar);

        this.setLocalStorage();

        inputProject.value = '';
    }

    //// todos
    createTodo(e) {
        e.preventDefault();

        this.newTodo = new ToDo(inputTitle.value, inputDueDate.value);

        this.clickedProject.addTodo(this.newTodo);

        mainList.innerHTML = '';

        this.clickedProject.todos.forEach((todo) => {
            const li = document.createElement('li');

            createTodoContent(todo, li);

            attachTodoEventListeners(li, todo);
        });

        this.setLocalStorage();

        hideForm(formMain);

        inputTitle.value = inputDueDate.value = '';
    }

    renderTodos(e) {
        const clicked = e.target.closest('.sidebar__list__item');
        this.clickedProject = this.projects.find(
            (project) => project.id === clicked.id
        );

        if (!this.clickedProject) return;

        mainList.innerHTML = '';

        this.clickedProject.todos.forEach((todo) => {
            const li = document.createElement('li');

            createTodoContent(todo, li);

            attachTodoEventListeners(li, todo);
        });
    }

    // form edit todo
    formEditSubmit(e) {
        e.preventDefault();

        mainList.innerHTML = '';

        this.newTodo = new ToDo(inputTitleEdited.value, inputDateEdited.value);

        this.clickedProject.todos[this.clickedTodoId] = this.newTodo;

        this.clickedProject.todos.forEach((todo, i) => {
            const li = document.createElement('li');

            createTodoContent(todo, li);

            attachTodoEventListeners(li, todo);

            this.setLocalStorage();

            hideForm(formEdit);

            inputTitleEdited.value = inputDateEdited.value = '';
        });
    }

    setLocalStorage() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('projects'));

        if (!data) return;

        data.forEach((data) => {
            const project = new Project(data.projectTitle);
            this.addProject(project);

            data.todos.forEach((td) => {
                const todo = new ToDo(td.title, td.dueDate, td.isChecked);
                project.addTodo(todo);
            });
        });

        updateProjectsDom(this);
    }
}

export const app = new ProjectManager();
