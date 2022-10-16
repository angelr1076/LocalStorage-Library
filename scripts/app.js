const submitButton = document.querySelector('#submit');
const btnOpenModal = document.querySelector('.open-modal');
const btnCloseModal = document.querySelector('.close-modal');
const modalElement = document.querySelector('.modal');

let myLibrary = [
  new Book('Down and Out in Paris and London', 'George Orwell', 232, true),
  new Book('Homage to Catalonia', 'George Orwell', 202, true),
  new Book('Shooting an Elephant', 'George Orwell', 368, false),
];

// let myLibrary = [];
let count = myLibrary.length + 1;

// Constructor...
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.read = Boolean(read);

  // Methods
  this.bookInfo = function () {
    const wasRead = this.read === true ? 'read' : 'not read';
    console.log(
      `${this.title} written by ${this.author}, ${this.pages} pages in length was ${wasRead}.`,
    );
  };

  return this.bookInfo();
}

function createBook(e) {
  e.preventDefault();
  myLibrary = [];

  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('#read').value;

  // Instantiate new Book object
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  clearForm();
  viewBookList(myLibrary);
}

function addBookToLibrary(book) {
  modalElement.classList.remove('open');
  return myLibrary.push(book);
}

function clearForm() {
  document.querySelector('#form').reset();
}

function setStyling(element, details) {
  element.setAttribute(
    'style',
    'display: flex; flex-direction: column; background-color: #fff; padding: 1em; margin: 1em 1em 1em 0; border-radius: 5px; height: 250px; width: 250px; justify-content: center; text-align: center; line-height: 1.5',
  );

  element.innerHTML = `
    <h3 class="title">${details.title}</h3>
    <br>
    <hr>
    <br>
    <p>${details.author}</p>
    <p>${details.pages} pages</p>
    <p>${details.read === true ? 'Read' : 'Unread'}</p>`;
}

function createCard() {
  let bookCard = document.createElement('div');
  bookCard.classList.add('card');
  bookCard.setAttribute('data-target', `${count++}`); // Set target ID

  return bookCard;
}

function handleDelete() {
  let deleteBookBtn = document.createElement('button');
  deleteBookBtn.setAttribute(
    'style',
    'color: white; background-color: blue; height: 2em; border-radius: 5px;',
  );
  deleteBookBtn.innerHTML = 'Delete';
  return deleteBookBtn;
}

function viewBookList(list) {
  const bookDiv = document.querySelector('.book-list');

  for (book in list) {
    let bookDetails = list[book];
    let renderCard = createCard();
    const deleteButton = handleDelete();
    setStyling(renderCard, bookDetails);

    renderCard.appendChild(deleteButton);
    bookDiv.appendChild(renderCard);
  }

  return bookDiv;
}

function addClass() {
  return modalElement.classList.add('open');
}

function removeClass() {
  return modalElement.classList.remove('open');
}

function deleteBook(id) {}

viewBookList(myLibrary);

// Event listeners
btnOpenModal.addEventListener('click', addClass);
btnCloseModal.addEventListener('click', removeClass);
submitButton.addEventListener('click', createBook);
