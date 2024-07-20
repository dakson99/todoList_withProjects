// todos
class ToDo {
    id = self.crypto.randomUUID();
    constructor(title, dueDate, isChecked = false) {
        (this.title = title), (this.dueDate = dueDate);
        this.isChecked = isChecked;
    }

    setCheckBoxAttribute() {
        return this.isChecked === true ? 'checked' : '';
    }
}

export default ToDo;