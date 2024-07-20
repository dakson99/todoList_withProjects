// project
class Project {
    id = self.crypto.randomUUID();
    todos = [];
    constructor(projectTitle) {
        this.projectTitle = projectTitle;
    }

    addTodo(todo) {
        this.todos.push(todo);
        return [...this.todos];
    }
}

export default Project;