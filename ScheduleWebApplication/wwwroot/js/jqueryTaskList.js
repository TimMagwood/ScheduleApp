$(function () {
    // Task data to parse
    // Will be retrieved from elsewhere later (database or json file?)
    const stringData =
        `[  { "id": 123, "category": "School", "taskDescription": "Test" },
            { "id": 456, "category": "School", "taskDescription": "Project" },
            { "id": 789, "category": "Work", "taskDescription": "Client Meeting" } ]`;
    
    sessionStorage.getItem("taskData") === null ? sessionStorage.setItem("taskData", stringData) : null;

    let data = JSON.parse(sessionStorage.getItem("taskData"));

    // Load button event handler
    $("#loadButton").click(e => {
        let html = "";
        data.map(task => {
            html += `<div id="${task.id}"
                        class="list-group-item">${task.category},${task.taskDescription}
                    </div>`;
        });

        $("#taskList").html(html);
        $("#loadButton").hide();
        $("#addButton").show();
    }); // loadButton.click()

    // Register list item click
    $("#taskList").click(e => {
        const task = taskData.find(t => t.id === parseInt(e.target.id));
        $("#results").text(`you selected ${task.category}, ${task.taskDescription}`);
    }); // taskList div click

    // Add button event handler
    $("#addButton").click(e => {
        const task = data[data.length - 1];
        $("#results").text(`adding task ${task.id + 101}`);
        data.push({ "id": task.id + 101, "category": "new", "taskDescription": "task" });
        sessionStorage.setItem("taskData", JSON.stringify(data));
        let html = "";
        data.map(task => {
            html += `<div id="${task.id}"
                        class="list-group-item">${task.category},${task.taskDescription}
                    </div>`;
        });
        $("#taskList").html(html);
    }); // addButton.click()

}); // jQuery routine