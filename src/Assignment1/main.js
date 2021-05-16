const jsonList = JSON.stringify([{ "name": "cat", "description": "fluffy white cat", "url": "https://www.thesprucepets.com/thmb/wWZ_Mympqnlq6hUbrnK6p2wIERk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/twenty20_e47b3798-dd9b-40b1-91ef-1d820337966e-5aa3f798642dca00363b0df1.jpg" },
{ "name": "black dog", "description": "3000 dollar dog", "url": "https://www.sritch.com/images/dogs-vancouver-20141108-0574.jpg" }]);

function navigate(bool) {
    const main = document.getElementById("main-page");
    const card = document.getElementById("card-page");
    if (bool) {
        main.style.display = 'block';
        card.style.display = 'none';
    } else {
        main.style.display = 'none';
        card.style.display = 'block';
    }
}

function deleteRow(currentRow) {
    index = currentRow.rowIndex;
    document.getElementById("card-list").deleteRow(index);
}

function insertListItem(name, url, description, bool) {
    const list = document.getElementById("card-list");
    let row;
    if (bool) {
        row = list.insertRow(1);
    } else {
        row = list.insertRow(list.rows.length);
    }
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.innerHTML = name;
    cell2.innerHTML = "<img alt=URL Invalid src=" + url + ">"
    cell3.innerHTML = description;
    cell4.innerHTML = "<button type=button onclick=deleteRow(this.parentNode.parentNode)>Delete</button>"
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("image").value = "";
    document.getElementById("description").value = "";
}

function addToList(bool = false) {
    const name = document.getElementById("name").value;
    const url = document.getElementById("image").value;
    const description = document.getElementById("description").value;
    insertListItem(name, url, description, bool);
    clearInputs();
}

function loadList() {
    const list = JSON.parse(jsonList);
    for (const items of list) {
        insertListItem(items.name, items.url, items.description, false);
    }
}

window.onload = loadList;