window.addEventListener('load', start)

 var globalNames = ["Felipe", "João", "Tiago", "Bartolomeu", "Pedro", "Matheus", "André", "Tomé"]
 var isEditing = false
 var currentIndex = null
 var input = document.querySelector('#inputName')

function start() {
    preventFormSubmit()
    activateInput()
    render()
}

function preventFormSubmit() {
    function handleFormSubmit(e) {
        e.preventDefault()
    }
    var form = document.querySelector('form')
    form.addEventListener('submit', handleFormSubmit)
}

function activateInput() {
    function handleTyping(e) {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {

            if(isEditing) {
                var typedName = e.target.value 
                globalNames[currentIndex] = typedName
                render()
            } else {
                var typedName = e.target.value
                globalNames.push(typedName)
                render()
            }
            isEditing = false
            clearInput()
        }
    }
    input.addEventListener('keyup', handleTyping)
    input.focus() 
}

function render() {
    function createDeleteButton(index) {
        function deleteName() {
            globalNames.splice(index, 1)
            render()
        }
        var button = document.createElement('button')
        button.classList.add('deleteButton')
        button.textContent = 'x'

        button.addEventListener('click', deleteName)
        return button
    }

    function createSpan(index, name) {
        function editItem() {
            inputName.value = name
            inputName.focus()
            isEditing = true
            currentIndex = index
        }
        var span = document.createElement('span')
        span.textContent = name
        span.classList.add('clickable')

        span.addEventListener('click', editItem)

        return span
    }

    var divNames = document.querySelector('#names')
    divNames.innerHTML = ''
    var ul = document.createElement('ul')

    for (var i = 0; i < globalNames.length; i++) {
        var currentName = globalNames[i]
        var li = document.createElement('li')

        button = createDeleteButton(i)
        span = createSpan(i, currentName)

        li.appendChild(button)
        li.appendChild(span)

        ul.appendChild(li)
    }

    divNames.appendChild(ul)
    clearInput()
    console.log(globalNames)
}

function clearInput() {
    input.value = ''
    input.focus()
}