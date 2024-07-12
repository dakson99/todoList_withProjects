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

// todos
class toDo {
    id = self.crypto.randomUUID();
    constructor(title, dueDate) {
        (this.title = title), (this.dueDate = dueDate);
    }

    setCheckBoxAttribute() {
        return this.isChecked === true ? 'checked' : '';
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

        // display form
        buttonNewProject.addEventListener('click', this.displayForm);
    }

    ///// METHODS
    addProject(pTitle) {
        this.projects.push(pTitle);
    }

    displayForm = function () {
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