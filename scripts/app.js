const submitButton = document.querySelector('#submit');
let myLibrary = [
  new Book('Down and Out in Paris and London', 'George Orwell', 232, true),
  new Book('Homage to Catalonia', 'George Orwell', 202, true),
  new Book('Shooting an Elephant', 'George Orwell', 368, false),
];
// let myLibrary = [];

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
  return myLibrary.push(book);
}

function clearForm() {
  document.querySelector('#form').reset();
}

function setStyling(element, details) {
  element.setAttribute(
    'style',
    'display: flex; flex-direction: column; border: 2px solid black; padding: 1em; margin: 1em 1em 1em 0; border-radius: 5px; height: 250px; width: 250px; justify-content: center; text-align: center; line-height: 1.5',
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

function viewBookList(list) {
  const bookDiv = document.querySelector('.book-list');

  for (book in list) {
    let bookDetails = list[book];
    let bookCard = document.createElement('div');
    setStyling(bookCard, bookDetails);
    bookDiv.appendChild(bookCard);
  }

  return bookDiv;
}

viewBookList(myLibrary);

// Event listeners
submitButton.addEventListener('click', createBook);
