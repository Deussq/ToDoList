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
        const newText = prompt("Edit task:", span.textContent)

        if (!newText) return

        span.textContent = newText
        saveTasks()
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



loadTasks()