import {
    app,
    inputTitle,
    inputDueDate,
    formSidebar,
    formMain,
    inputProject,
    formEdit,
    inputTitleEdited,
    inputDateEdited,
} from './script.js';

// forms methods
export const displayMainForm = function () {
    if (!app.clickedProject) return alert('You must create a project first');

    formMain.classList.remove('hidden');
    inputTitle.value = inputDueDate.value = '';
};

export const displaySidebarForm = function () {
    formSidebar.style.opacity = 100;
    formSidebar.classList.remove('hidden');
};

export const hideForm = function (form) {
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => {
        form.style.display = 'grid';
    }, 1000);
};

//prevent default submits
export const preventDefaultSubmitProject = function (e) {
    e.preventDefault();
    inputProject.value = '';
    hideForm(formSidebar);
};

export const preventDefaultSubmitTodo = function (e) {
    e.preventDefault();
    inputTitle.value = inputDueDate.value = '';
    hideForm(formMain);
};

export const preventDefaultSubmitEdit = function (e) {
    e.preventDefault();
    inputTitleEdited.value = inputDateEdited.value = '';
    hideForm(formEdit);
};