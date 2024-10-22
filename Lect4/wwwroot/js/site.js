const uri = 'api/todoitems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    var addNameTextbox = document.getElementById('add-name');
    /*console.log(addNameTextbox.value);*/

    var item = {
        name: addNameTextbox.value.trim(),
        isComplete: false
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }
    )
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        }

        )
        .catch((error) => console.error('Unable to add item', error));

}

function displayEditForm(id) {
    var item = todos.find(item => item.id == id);
    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-iscomplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}
function _displayCount(itemCount) {
    const name = (itemCount == 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {

    var tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    var button = document.createElement('button');

    data.forEach(item => {
        var isCompletedCheckbox = document.createElement('input');
        isCompletedCheckbox.type = 'checkbox';
        isCompletedCheckbox.disabled = true;
        isCompletedCheckbox.checked = item.isComplete;


        var tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompletedCheckbox);

        let td2 = tr.insertCell(1);
        var textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        var editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        var deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
        td4.appendChild(deleteButton);
    });

    todos = data;
}

function updateItem() {
    let itemId = document.getElementById("edit-id").value;

    // anonymous object
    let item = {
        id: parseInt(itemId),
        name: document.getElementById("edit-name").value.trim() ,
        isComplete: document.getElementById("edit-iscomplete").checked 
    }

    fetch(
        `${uri}/${itemId}`,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(item)  // JSON String          
        }
    )
    .then(() => getItems())
    .catch(error => console.error('unable to update item', error));

    closeInput();
    return false;
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
    .then(() => getItems())
    .catch(error => console.error('unable to delete item', error));
}