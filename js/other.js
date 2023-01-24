fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('dataTable');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.address}</td>
                <td><button class="edit-btn">Edit</button></td>
            `;
            table.appendChild(row);
        });

        // Add an event listener to the edit buttons
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const row = event.target.parentNode.parentNode;
                const cells = row.querySelectorAll('td');
                // Make the cells editable
                cells.forEach(cell => {
                    const currentContent = cell.textContent;
                    cell.innerHTML = `<input type="text" value="${currentContent}">`;
                });
                // Change the button text
                event.target.textContent = "Save";
                event.target.classList.remove("edit-btn");
                event.target.classList.add("save-btn");
                event.target.addEventListener("click", (e) => {
                    //save data
                    cells.forEach(cell => {
                        const input = cell.querySelector("input");
                        item[input.name] = input.value;
                    });
                    //Change the button text
                    event.target.textContent = "Edit";
                    event.target.classList.remove("save-btn");
                    event.target.classList.add("edit-btn");
                    //update cells with the new data
                    cells.forEach(cell => {
                        cell.textContent = item[cell.getAttribute("name")];
                    });
                });
            });
        });
    });

const dataString = JSON.stringify(data);
const link = document.createElement('a');
link.setAttribute('download', 'data.json');
link.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(dataString));

