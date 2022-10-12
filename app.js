document.addEventListener('DOMContentLoaded', () => {
    //init local storage
    initLocalStorage()

    //get users from local storage
    let users = JSON.parse(localStorage.getItem('users')) ?? []

    //handleDelete
    const usersContainer = document.getElementById('users')
    usersContainer.addEventListener('click', (e) => {
        let { target } = e

        if(target.className.indexOf('delete') !== -1) {
            //remove the user
            const node = target.parentElement.parentElement

            deleteUser(node, users)
            return
        }

        //select user then
        selectUser(target)
    })
    
    //if users length is greater than 0, add them to the document
    if (users.length) {
        for (const user of users) {
            addUserToHTML(user)
        }
    }

    //attach event to add Button
    const addButton = document.getElementById('addUser')
    addButton.addEventListener('click', showForm)

    //attach submitHandler
    handleSubmitForm()

    //handle addtodo
    handleAddTodo()

    //attach handler to todos container
    handleToggleTodo()

    //attach logout handler
    handleLogout()
})

const handleToggleTodo = () => {
    const container = document.getElementById('todos-container')
    container.addEventListener('click', (e) => {
        // e.preventDefault()

        //only handle input or label clicks
        if(e.target.nodeName == 'INPUT' || e.target.nodeName == 'LABEL') {
            const check = e.target.nodeName == 'INPUT' ? e.target : e.target.parentElement.firstChild
            check.parentElement.classList.toggle('completed')

            if(e.target.nodeName == 'LABEL') {
                check.checked = !check.checked
            }

            toggleTodoStatus(check.id)
        }

        //check for delete clicks
        if(e.target.className.indexOf('mdi-delete-outline') !== -1) {
            //is a delete click
            const check = e.target.parentElement.firstChild
            deleteTodo(check)
        }
    })
}

const handleLogout = () => {
    const logoutBtn = document.getElementById('logout')

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const usersDiv = document.getElementById('user-list')
        const container = document.getElementById('main-container')
        const body = document.querySelector('body')
        const todosContainer = document.getElementById('todos-container')

        body.style.backgroundColor = 'rgb(0, 0, 0)'

        todosContainer.innerHTML = ''
        usersDiv.classList.toggle('hide')
        container.classList.toggle('hide')
        localStorage.setItem('user', null)
    })
}

const toggleTodoStatus = (id) => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    const user = JSON.parse(localStorage.getItem('user'))

    const userTodos = todos[user.name]

    const newTodos = {
        ...todos,
        [user.name]: [
            ...userTodos.map(todo => {
                return todo.id == id ? {...todo, completed: !todo.completed} : todo
            })
        ]
    }

    localStorage.setItem('todos', JSON.stringify(newTodos))
}

const deleteTodo = (check) => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    const user = JSON.parse(localStorage.getItem('user'))

    const userTodos = todos[user.name]

    const newTodos = {
        ...todos,
        [user.name]: userTodos.filter(todo => todo.id != check.id)
    }

    check.parentElement.remove()
    localStorage.setItem('todos', JSON.stringify(newTodos))
}

const initLocalStorage = () => {

    if(localStorage.getItem('todos') === null) {
        localStorage.setItem('todos', JSON.stringify({}))
    }

    if(localStorage.getItem('users') === null) {
        localStorage.setItem('users', JSON.stringify([]))
    }
}

const selectUser = (target) => {
    if (target.dataset.id === undefined) {
        target = target.parentElement
    }

    if(target.dataset.id === undefined)
        return

    const users = JSON.parse(localStorage.getItem('users'))
    const user = users[users.findIndex(u => u.name == target.dataset.id)]
    localStorage.setItem('user', JSON.stringify(user))

    const body = document.querySelector('body')
    const usersDiv = document.getElementById('user-list')

    //print all users todos if it has
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(todos[user.name]) {
        for (const todo of todos[user.name]) {
            printTodo(todo)
        }
    }

    const container = document.getElementById('main-container')
    const name = document.getElementById('user-name')
    const todosAmount = document.getElementById('user-todos-amount')

    name.innerText = user.name
    todosAmount.innerText = todos[user.name]?.length ?? 0
    container.classList.toggle('hide')

    body.style.backgroundColor = 'rgba(0, 0, 0, 0.9 )'
    usersDiv.classList.toggle('hide')
}

const handleAddTodo = () => {
    const form = document.getElementById('add-todo-form')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const newTodo = document.getElementById('newTodo')
        
        //check newTodo value
        if(newTodo.value.trim().length == 0) {
            alert('Todo description should be valid')
            return
        }

        addTodo(newTodo.value)
        newTodo.value = ''
    })
}

const addTodo = (todo) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const todos = JSON.parse(localStorage.getItem('todos'))

    const newTodo = {
        id: Math.random().toString().slice(2),
        todo,
        completed: false,
        date: new Date().toLocaleString()
    }
    
    const newTodos = {
        ...todos,
        [user.name]: [
            ...(todos[user.name] ? todos[user.name] : []),
            newTodo
        ]
    }

    localStorage.setItem('todos', JSON.stringify(newTodos))
    printTodo(newTodo)
    
}

const printTodo = (todo) => {
    //add to HTML
    const container = document.getElementById('todos-container')

    const div = document.createElement('div')
    const input = document.createElement('input')
    const label = document.createElement('label')
    const span = document.createElement('span')

    label.innerText = todo.todo
    input.type = 'checkbox'
    input.id = todo.id
    input.checked = todo.completed
    span.classList.add('mdi', 'mdi-delete-outline')
    div.classList.add('todo-group')

    if(todo.completed) {
        div.classList.add('completed')
    }

    div.append(input, label, span)
    container.append(div)
}

const handleSubmitForm = () => {
    const form = document.getElementById('user-form')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = document.getElementById('name')
        const avatar = document.getElementById('avatar')
        
        //check username and avatar values
        if(name.value.trim().length == 0) {
            alert('Name should be valid')
            return
        }

        if(avatar.value < 0 || avatar.value > 100 ) {
            alert('Avatar should be a number between 0 and 100')
            return
        }

        createUser(avatar.value, name.value.toUpperCase()) && 
        addUserToHTML({avatar: avatar.value, name: name.value.toUpperCase()})

        //reset form
        name.value = ''
        avatar.value = Math.ceil(Math.random() * 100) //random number from 0-100 to try different avatars
    })
}

const showForm = () => {
    const form = document.getElementById('user-form')
    const btn = document.querySelector('span.add-user-icon')

    form.classList.toggle('hidden')
    btn.classList.toggle('active')
}

const createUser = (avatar, name) => {
    const users = JSON.parse(localStorage.getItem('users')) ?? []

    //prevent duplicated names guard clause
    if (users.some( user => user.name.toLowerCase() == name.toLowerCase())) {
        alert('User already exists')
        return
    }

    const newUsers = [
        ...users,
        {
            name: name,
            avatar
        }
    ]

    localStorage.setItem('users', JSON.stringify(newUsers))
    showForm()
    return true
}

const deleteUser = (node, users) => {
    const name = node.dataset.id

    const response = confirm(`Delete user ${name}?`)

    if(response) {
        const name = node.dataset.id

        //find user in localstorage
        const username = users[users.findIndex(user => user.name == name)].name
        users.splice(users.findIndex(user => user.name == name), 1)

        //delete topdos if exists
        const todos = JSON.parse(localStorage.getItem('todos'))
        delete todos[username]
        localStorage.setItem('todos', JSON.stringify(todos))

        node.remove()
        localStorage.setItem('users', JSON.stringify(users))
    }
}

const addUserToHTML = ({avatar, name}) => {

    const parent = document.getElementById('users')
    const div = document.createElement('div')
    const closeDiv = document.createElement('div')
    const closeIcon = document.createElement('span')
    const img = document.createElement('img')
    const h6 = document.createElement('h6')

    div.dataset.id = name

    closeIcon.classList.add('mdi', 'mdi-close-circle', 'delete')
    closeDiv.classList.add('close')
    closeDiv.append(closeIcon)
    h6.innerText = name
    img.classList.add('profile-picture')
    img.src = `https://avatars.dicebear.com/api/adventurer-neutral/${avatar}.svg`

    div.classList.add('user-badge', 'profile-container')

    div.append(img)
    div.append(h6)
    div.append(closeDiv)
    parent.append(div)

}