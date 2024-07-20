// project
class Project {
    todos = [];
    constructor(projectTitle, id = self.crypto.randomUUID()) {
        this.projectTitle = projectTitle;
        this.id = id;
    }

    pushTodo(todo) {
        this.todos.push(todo);
        return [...this.todos];
    }
}

export default Project;