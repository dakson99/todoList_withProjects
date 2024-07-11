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
    }

    ///// METHODS
    addProject(pTitle) {
        this.projects.push(pTitle);
    }
}