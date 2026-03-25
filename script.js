const input = document.getElementById("input")
const button = document.getElementById("addBtn")
const deleteAllBtn = document.getElementById("deleteAllBtn")
const list = document.getElementById("list")




button.addEventListener("click", function () {
    const text = input.value.trim()
    if (text === "") return

    const li = document.createElement("li")
    li.textContent = text



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

    li.appendChild(deleteBtn)
    list.appendChild(li)
    updateTaskCount()
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
        const li = document.createElement("li")
        li.textContent = task.text

        if (task.done) {
            li.classList.add("done")
        }

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "❌"

        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation()
            li.remove()
            saveTasks()
            updateTaskCount()
        })

        li.addEventListener("click", function () {
            li.classList.toggle("done")
            saveTasks()
        })

        li.appendChild(deleteBtn)
        list.appendChild(li)
    })

    updateTaskCount()
}

loadTasks()