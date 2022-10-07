const todoTamplate = (todo) => {
    return `<ul>
                <li>
                    <article>
                    <h1>${todo.todo}</h1>
                    <h2>${todo.complete}</h2>
                    <button onClick='deleteTodo(${todo.id}, this)' class="deleteTodoBtn" data-id=${todo.id} > Delete </button>
                    </article>
                </li>
            </ul>`
}