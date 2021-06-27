$(function () {
    // Task data to parse
    // Will be retrieved from elsewhere later (database or json file?)
    //const stringData =
    //    `[  { "id": 123, "category": "School", "taskDescription": "Test" },
    //        { "id": 456, "category": "School", "taskDescription": "Project" },
    //        { "id": 789, "category": "Work", "taskDescription": "Client Meeting" } ]`;
    
    //sessionStorage.getItem("taskData") === null ? sessionStorage.setItem("taskData", stringData) : null;
    //let data = JSON.parse(sessionStorage.getItem("taskData"));
    let data;
    // Load button event handler
    $("#loadButton").click(async e => {
        // If not loaded, retrieve task data from GitHub
        if (sessionStorage.getItem("taskData") === null) {
            const url = "https://raw.githubusercontent.com/elauersen/info3070/master/jqueryex5.json";
            $("#results").text('Locating student data on GitHub, please wait...');

            // Fetch API is asynchronous, notice the use of the await keyword
            try {
                let response = await fetch(url);
                if (!response.ok)
                    throw new Error(`Status - ${response.status}, Text - ${response.statusText}`); // catch this
                data = await response.json(); // this returns a promise, so we await it
                sessionStorage.setItem("taskData", JSON.stringify(data));
                $("results").text("GitHub data loaded!");
            }
            catch (error) {
                $("#results").text(error.message);
            }
        } else {
            data = JSON.parse(sessionStorage.getItem("taskData"));
        }

        let html = "";
        data.map(task => {
            html += `<div id="${task.id}"
                        class="list-group-item">${task.category},${task.taskDescription}
                    </div>`;
        });

        $("#taskList").html(html);
        $("#loadButton").hide();
        $("#addButton").show();
        $("#removeButton").show();
    }); // loadButton.click()

    // Register list item click
    $("#taskList").click(e => {
        const task = data.find(t => t.id === parseInt(e.target.id));
        $("#results").text(`you selected ${task.id}, ${task.category}, ${task.taskDescription}`);
    }); // taskList div click

    // Add button event handler
    $("#addButton").click(e => {
        if (data.length > 0) {
            const task = data[data.length - 1];
            data.push({ "id": task.id + 101, "category": "new", "taskDescription": "task" });
            $("#results").text(`adding task ${task.id + 101}`);
        } else {
            data.push({ "id": 101, "category": "new", "taskDescription": "task" });
        }
        sessionStorage.setItem("taskData", JSON.stringify(data));
        let html = "";
        data.map(task => {
            html += `<div id="${task.id}"
                        class="list-group-item">${task.category},${task.taskDescription}
                    </div>`;
        });
        $("#taskList").html(html);
    }); // addButton.click()

    // Remove button event handler
    $("#removeButton").click(e => {
        // Make sure array contains data
        if (data.length > 0) {
            const task = data[data.length - 1];
            data.splice(-1, 1); // Remove last entry from array
            $("#results").text(`removed task ${task.id}`);
            // Put the updated data back in session storage
            sessionStorage.setItem("taskData", JSON.stringify(data));
            let html = "";
            data.map(task => {
                html += `<div id="${task.id}" class="list-group-item">${task.category},${task.taskDescription}</div>`;
            });
            $("#taskList").html(html);
        } else {
            $("#results").text(`no students to remove`);
        }
    }); // Remove button event handler

}); // jQuery routine