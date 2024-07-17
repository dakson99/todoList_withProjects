import {
    app,
    mainList,
    inputTitleEdited,
    inputDateEdited,
    formEdit,
} from '../script.js';

export const createTodoContent = function (todo, li) {
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
};

export const addDeleteEvent = function (element, todo) {
    const btnDeleteTodo = element.querySelector('.btn__todo__delete');

    btnDeleteTodo.addEventListener('click', () => {
        app.clickedTodoId = app.clickedProject.todos.findIndex(
            (td) => td.id === todo.id
        );

        app.clickedProject.todos.splice(app.clickedTodoId, 1);
        element.remove();
    });
};

export const addEditEvent = function (element, todo) {
    const btnEdit = element.querySelector('.btn__todo__edit');

    btnEdit.addEventListener('click', (e) => {
        e.preventDefault();

        app.clickedTodoId = app.clickedProject.todos.findIndex(
            (td) => td.id === todo.id
        );

        formEdit.classList.remove('hidden');

        element.parentNode.insertBefore(formEdit, element.nextSibling);

        inputTitleEdited.value = app.clickedProject.todos[app.clickedTodoId].title;

        inputDateEdited.value = app.clickedProject.todos[app.clickedTodoId].dueDate;
    });
};

export const addCheckBoxEvent = function (element, todo) {
    const checkBox = element.querySelector('.checkBox');

    app.clickedTodoId = app.clickedProject.todos.findIndex(
        (td) => td.id === todo.id
    );

    checkBox.addEventListener('change', () => (todo.isChecked = !todo.isChecked));
};

export const attachTodoEventListeners = function (element, todo) {
    addDeleteEvent(element, todo);

    addEditEvent(element, todo);

    addCheckBoxEvent(element, todo);
};