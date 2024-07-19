import {
    app,
    sidebarList,
    mainList,
    formMain,
    inputTitle,
    inputDueDate,
} from '../script.js';

import { hideForm } from './formDOM.js';

export const updateProjectsDom = function () {
    sidebarList.innerHTML = '';

    app.projects.forEach((project) => {
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
        deleteProjectEvent(icon, li);
    });
};

export const deleteProjectEvent = function (icon, listEl) {
    icon.addEventListener('click', (e) => {
        const clicked = e.target.closest('.sidebar__list__item');
        const clickedProjectId = app.projects.findIndex(
            (proj) => proj.id === clicked.id
        );

        app.projects.splice(clickedProjectId, 1);
        app.setLocalStorage();

        listEl.remove();

        hideForm(formMain);
        mainList.innerHTML = '';

        inputTitle.value = inputDueDate.value = '';
    });
};