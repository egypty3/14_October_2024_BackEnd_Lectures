const uri = 'api/todoitems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => console.log( response.json()));
}