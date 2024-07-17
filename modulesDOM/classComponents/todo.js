// todos
class ToDo {
    id = self.crypto.randomUUID();
    constructor(title, dueDate) {
        (this.title = title), (this.dueDate = dueDate);
        this.isChecked = false;
    }

    setCheckBoxAttribute() {
        return this.isChecked === true ? 'checked' : '';
    }
}

export default ToDo;