'use strict';

//import classes
import ToDo from './classComponents/todo.js';
import Project from './classComponents/project.js';

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
    addTodo;
    addTodoEdited;
    clickedTodoId;

    constructor() {
        ///// EVENT LISTENERS

        //check for no todo
        btnNewTodo.addEventListener('click', displayMainForm);


        // display form
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

        updateProjectsDom();

        hideForm(formSidebar);

        inputProject.value = '';
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

        this.addTodo = new ToDo(inputTitle.value, inputDueDate.value);

        this.clickedProject.todos.push(this.addTodo);

        mainList.innerHTML = '';

        this.clickedProject.todos.forEach((todo) => {
            const li = document.createElement('li');

            createTodoContent(todo, li);

            attachTodoEventListeners(li, todo);
        });

        hideForm(formMain);

        inputTitle.value = inputDueDate.value = '';
    }


    renderTodos = function (e) {
        this.detectClickedProject(e);

        if (!this.clickedProject) return;

        mainList.innerHTML = '';

        this.clickedProject.todos.forEach((todo, i) => {
            const li = document.createElement('li');

            createTodoContent(todo, li);

            attachTodoEventListeners(li, todo);
        });
    };

    // form edit todo
    formEditSubmit(e) {
        e.preventDefault();

        mainList.innerHTML = '';

        this.addTodo = new ToDo(inputTitleEdited.value, inputDateEdited.value);

        this.clickedProject.todos[this.clickedTodoId] = this.addTodo;

        this.clickedProject.todos.forEach((todo, i) => {
            const li = document.createElement('li');

            createTodoContent(todo, li);

            attachTodoEventListeners(li, todo);

            hideForm(formEdit);

            inputTitleEdited.value = inputDateEdited.value = '';
        });
    }
}

// project manager
export const app = new ProjectManager();
