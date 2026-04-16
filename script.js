const input = document.getElementById("input")
const button = document.getElementById("addBtn")
const deleteAllBtn = document.getElementById("deleteAllBtn")
const list = document.getElementById("list")




function createTask(text, done = false) {
    const li = document.createElement("li")

    const span = document.createElement("span")
    span.textContent = text

    if (done) {
        li.classList.add("done")
    }

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "❌"

    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation()
        li.remove()
        updateTaskCount()
        saveTasks()
    })

    li.addEventListener("click", function () {
        li.classList.toggle("done")
        saveTasks()
    })



    li.addEventListener("dblclick", function () {
    const inputEdit = document.createElement("input")
    inputEdit.type = "text"
    inputEdit.value = span.textContent

    li.replaceChild(inputEdit, span)
    inputEdit.focus()

    inputEdit.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            finishEdit()
        }
    })

    inputEdit.addEventListener("blur", function () {
        finishEdit()
    })

    function finishEdit() {
        const newText = inputEdit.value.trim()

        if (newText === "") {
            li.replaceChild(span, inputEdit)
            return
        }

        span.textContent = newText
        li.replaceChild(span, inputEdit)

        saveTasks()
    }
})



    li.appendChild(span)
    li.appendChild(deleteBtn)
    list.appendChild(li)

    updateTaskCount()
}




button.addEventListener("click", function () {
    const text = input.value.trim()
    if (text === "") return

    createTask(text)
    saveTasks()
    input.value = ""
})


deleteAllBtn.addEventListener("click", function () {
    list.innerHTML = ""
    updateTaskCount()
    saveTasks()
})


input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        button.click()
    }
})



const totalTasks = document.getElementById("totalTasks")

function updateTaskCount() {
    totalTasks.textContent = `Total Tasks: ${list.children.length}`
}





const search = document.getElementById("search")

search.addEventListener("input", function () {
    const searchText = search.value.toLowerCase()

    const tasks = list.children 

    for (let task of tasks) {
        const text = task.textContent.toLowerCase()

        if (text.includes(searchText)) {
            task.style.display = "flex"
        } else {
            task.style.display = "none"
        }
    }
})





function saveTasks() {
    const tasks = []

    const items = list.children

    for (let item of items) {
        tasks.push({
            text: item.textContent.replace("❌", "").trim(),
            done: item.classList.contains("done")
        })
    }

    localStorage.setItem("tasks", JSON.stringify(tasks))
}



function loadTasks() {
    const saved = localStorage.getItem("tasks")

    if (!saved) return

    const tasks = JSON.parse(saved)

   tasks.forEach(task => {
    createTask(task.text, task.done)
})

    updateTaskCount()
}






const allBtn = document.getElementById("allBtn")
const activeBtn = document.getElementById("activeBtn")
const doneBtn = document.getElementById("doneBtn")



function filterTasks(type) {
    const tasks = list.children

    for (let task of tasks) {
        if (type === "all") {
            task.style.display = "flex"
        }

        if (type === "active") {
            if (task.classList.contains("done")) {
                task.style.display = "none"
            } else {
                task.style.display = "flex"
            }
        }

        if (type === "done") {
            if (task.classList.contains("done")) {
                task.style.display = "flex"
            } else {
                task.style.display = "none"
            }
        }
    }
}


allBtn.addEventListener("click", function () {
    filterTasks("all")
    setActiveButton(allBtn)
})

activeBtn.addEventListener("click", function () {
    filterTasks("active")
    setActiveButton(activeBtn)
})

doneBtn.addEventListener("click", function () {
    filterTasks("done")
    setActiveButton(doneBtn)
})


function setActiveButton(activeBtn) {
    const buttons = document.querySelectorAll(".filters button")

    for (let btn of buttons) {
        btn.classList.remove("active")
    }

    activeBtn.classList.add("active")
}




clearCompletedBtn.addEventListener("click", function () {

const tasks = list.children


    for (let task of [...tasks]) {
        if (task.classList.contains("done")) {
            task.remove()
        }
    }

    updateTaskCount()
    saveTasks()
})


loadTasks()