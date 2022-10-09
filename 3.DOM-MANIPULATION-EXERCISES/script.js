let newli = null

const completeTask = (task) => {
    document.getElementById(`task${task}`).checked = true
}

const selectContainerWithoutQuerySelector = () => {
    console.log(document.getElementById('container'))
    completeTask(1)
}

const selectContainerWithQuerySelector = () => {
    console.log(document.querySelector('#container'))
    completeTask(2)
}

const selectAllSecondClass = () => {
    console.log(document.querySelectorAll('.second'))
    completeTask(3)
}

const selectThirdClassInsideOl = () => {
    console.log(document.querySelector('ol .third'))
    completeTask(4)
}

const changeContainerText = () => {
    if(confirm('You will need to reload the browser to test the other tasks. Do yolu want to continue?')) {
        document.querySelector('section#container').innerText = 'Hello!'
        completeTask(5)
    }
        
}

const addMainClassToFooter = () => {
    document.querySelector('div.footer').classList.add('main')
    completeTask(6)
}

const removeMainClassFromFooter = () => {
    document.querySelector('div.footer').classList.remove('main')
    completeTask(7)
}

const createNewLIElement = () => {
    newli = document.createElement('li')
    completeTask(8)
}

const giveTextToLIElement = () => {
    if (newli === null) {
        alert(`This task can't be completed before create the list element`)
        return
    }
    newli.innerText = 'four' 
    completeTask(9)
}

const appendLItoUL = (li) => {
    
    if (newli === null) {
        alert(`This task can't be completed before create the list element and assign the inner text`)
        return
    } else if (newli.innerText === '') {
        alert(`You should put some text before this task. Try with previous task first.`)
        return
    }

    document.querySelector('#container ul').append(newli)
    completeTask(10)
}

const changeBgToLi = () => {
    const lis = document.querySelectorAll('ol li')
    for (const li of lis) {
        li.classList.toggle('bg-green')
    }

    completeTask(11)
}

const removeFooter = () => {
    document.querySelector('div.footer').remove()
    completeTask(12)
}