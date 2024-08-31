document.addEventListener("DOMContentLoaded", () => {
    const backlogList = document.getElementById("backlog-list");
    const todoList = document.getElementById("todo-list");
    const ongoingList = document.getElementById("ongoing-list");
    const doneList = document.getElementById("done-list");

    function moveTask(task, targetList) {
        task.querySelectorAll("button").forEach(btn => btn.remove());
        targetList.appendChild(task);
        addButtons(task, targetList);
    }

    function addButtons(task, list) {
        const leftBtn = document.createElement("button");
        const rightBtn = document.createElement("button");

        leftBtn.classList.add("left-btn");
        leftBtn.textContent = "←";
        rightBtn.classList.add("right-btn");
        rightBtn.textContent = "→";

        // Set button visibility and actions based on the current list
        if (list === todoList) {
            leftBtn.addEventListener("click", () => moveTask(task, backlogList));
            rightBtn.addEventListener("click", () => moveTask(task, ongoingList));
            leftBtn.style.opacity = "1"; // Fully visible
            rightBtn.style.opacity = "1"; // Fully visible
        } else if (list === ongoingList) {
            leftBtn.addEventListener("click", () => moveTask(task, todoList));
            rightBtn.addEventListener("click", () => moveTask(task, doneList));
            leftBtn.style.opacity = "1"; // Fully visible
            rightBtn.style.opacity = "1"; // Fully visible
        } else if (list === doneList) {
            leftBtn.addEventListener("click", () => moveTask(task, ongoingList));
            rightBtn.style.opacity = "0.3"; // Less visible
            leftBtn.style.opacity = "1"; // Fully visible
        } else if (list === backlogList) {
            leftBtn.style.opacity = "0.3"; // Less visible
            rightBtn.addEventListener("click", () => moveTask(task, todoList));
            rightBtn.style.opacity = "1"; // Fully visible
        }

        // Append buttons to the task
        task.appendChild(leftBtn);
        if (rightBtn) {
            task.appendChild(rightBtn);
        }
    }

    // Initialize buttons for existing tasks
    document.querySelectorAll("ul > li").forEach(task => {
        if (task.parentElement === backlogList) {
            addButtons(task, backlogList);
        } else if (task.parentElement === todoList) {
            addButtons(task, todoList);
        } else if (task.parentElement === ongoingList) {
            addButtons(task, ongoingList);
        } else if (task.parentElement === doneList) {
            addButtons(task, doneList);
        }
    });
});
