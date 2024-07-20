// todos
class ToDo {
    constructor(
        title,
        dueDate,
        isChecked = false,
        id = self.crypto.randomUUID()
    ) {
        (this.title = title), (this.dueDate = dueDate);
        this.isChecked = isChecked;
        this.id = id;
    }

    setCheckBoxAttribute() {
        return this.isChecked === true ? 'checked' : '';
    }
}

export default ToDo;