import { mainList } from '../script.js';

export const li = document.createElement('li');

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