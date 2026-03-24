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
    })



    li.addEventListener("click", function () {
        li.classList.toggle("done")
    })

    li.appendChild(deleteBtn)
    list.appendChild(li)
    updateTaskCount()
    input.value = ""
})


deleteAllBtn.addEventListener("click", function () {
    list.innerHTML = ""
    updateTaskCount()
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