var gTableSelector = '#booksTbody';
var gBooks = [
    {
        name: 'Harry Potter And The Goblet Of Fire',
        id: 1,
        price: 50,
        description: 'Sedrik Dies',
        rate: 0
    },
    {
        name: 'Harry Potter And The Prisoner Of Azkaban ',
        id: 2,
        price: 50,
        description: 'Nobody Dies',
        rate: 0
    },
    {
        name: 'Harry Potter And The Chamber Of Secrets',
        id: 3,
        price: 50,
        description: 'Piece of V the real G souls die',
        rate: 0
    },
    {
        name: 'Harry Potter And The Deathly Hollows',
        id: 4,
        price: 50,
        description: 'Everybody Dies',
        rate: 0
    }
];
var gGbooksLastLegnth = gBooks.length;

function init() {
    renderBooksTable(gBooks, gTableSelector);
}

function renderBooksTable(books, selector) {
    var strTbody = '';
    for (var i = 0; i < books.length; i++) {
        var book = books[i];
        strTbody +=
            `<tr>
                <th scope="row">${book.id}</th>
                <td>${book.name}</td>
                <td>${book.price}</td>
                <td>
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#readModal"
                     data-BookId="" onclick="showModal(${book.id})">Read</button>
                    <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#updateModal"
                     data-BookId="" onclick="fillEditModal(${book.id})" >Update</button>
                    <button type="button" class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
                </td>
            </tr>`;
    }

    strTbody += `<tr>
    <th scope="row"></th>
    <td> <input type="text" class="form-control" id="newItemName" value=""></td>
    <td> <input type="text" class="form-control" id="newItemPrice" value=""></td>
    <td>
        <button type="button" class="btn btn-warning" onclick="addNewItem()">Add</button>
    </td>
</tr>`
    var elBooksTbody = document.querySelector(selector);
    elBooksTbody.innerHTML = strTbody;
}

function addNewItem() {
    var newItemName = document.querySelector('#newItemName').value;
    var newItemPrice = document.querySelector('#newItemPrice').value;
    if (newItemName.length === 0 || newItemPrice.length === 0) {
        console.log('one the the input is too short.');
        return;
    }
    var newBook = {
        name: newItemName,
        id: gGbooksLastLegnth + 1,
        price: newItemPrice,
        description: ''
    }
    gGbooksLastLegnth++;
    gBooks.push(newBook);
    renderBooksTable(gBooks, gTableSelector);
}

function deleteBook(bookId) {
    var idxToDelete = getIdxById(gBooks, bookId);
    gBooks.splice(idxToDelete, 1);
    renderBooksTable(gBooks, '#booksTbody');
}

function getIdxById(array, id) {//return the index of the book by same Id
    for (var i = 0; i < array.length; i++) {
        var book = array[i];
        if (book.id === id) {
            return i;
        }
    }
}

function fillEditModal(bookId) {
    var bookIdx = getIdxById(gBooks, bookId);
    var strModalContent =
        `<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Book</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">New Name:</label>
                                <input type="text" class="form-control" id="updateName" value="${gBooks[bookIdx].name}">
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">New Price:</label>
                                <input type="text" class="form-control" id="updatePrice" value="${gBooks[bookIdx].price}">
                            </div>
                            <div class="form-group">
                                <label for="recipient-text" class="col-form-label">New Description:</label>
                                <textarea class="form-control" id="updateDescription" > ${gBooks[bookIdx].description} </textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning" onclick="readAndAddNewBook(${bookIdx})" data-dismiss="modal">Update</button>
                    </div>
                </div>
            </div>
        </div>`;

    var elModalContainer = document.querySelector('#modalContainer');
    elModalContainer.innerHTML = strModalContent;
}

function readAndAddNewBook(bookIdx) {
    var bookName = document.querySelector('#updateName').value;
    var bookPrice = document.querySelector('#updatePrice').value;
    var bookDescription = document.querySelector('#updateDescription').value;
    var currBook = gBooks[bookIdx];
    currBook.name = bookName;
    currBook.price = bookPrice;
    currBook.description = bookDescription;
    renderBooksTable(gBooks,gTableSelector);
}

function showModal(bookId) {
    var bookIdx = getIdxById(gBooks, bookId);
    var strReadModalContainer =
        `<div class="modal fade" id="readModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="readModal">Book Information</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>                            
                            <label for="recipient-name" class="col-form-label">${gBooks[bookIdx].name}</label>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Description:</label>
                            <label for="recipient-name" class="col-form-label">${gBooks[bookIdx].description}</label>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Price:</label>
                            <label for="recipient-name" class="col-form-label">${gBooks[bookIdx].price}</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`;
    var readModalContainer = document.querySelector('#readModalContainer');
    readModalContainer.innerHTML = strReadModalContainer;
}

