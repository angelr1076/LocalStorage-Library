const submitButton = document.querySelector('#submit');
const btnOpenModal = document.querySelector('.open-modal');
const btnCloseModal = document.querySelector('.close-modal');
const modalElement = document.querySelector('.modal');

// Constructor...
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);

    // Methods
    this.bookInfo = function () {
      const wasRead = this.read === true ? 'read' : 'not read';
      return `${this.title} written by ${this.author}, ${this.pages} pages in length was ${wasRead}.`;
    };
    this.read = Boolean(read);
    return this.bookInfo();
  }
}

let myLibrary = [
  new Book('Down and Out in Paris and London', 'George Orwell', 232, true),
  new Book('Homage to Catalonia', 'George Orwell', 202, true),
  new Book('Shooting an Elephant', 'George Orwell', 368, false),
];
let count = myLibrary.length - 3;

// let myLibrary = [];
// let count = myLibrary.length;

function createBook(e) {
  e.preventDefault();
  // myLibrary = [];

  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('#read').value;

  // Instantiate new Book object
  const newBook = new Book(title, author, pages, read); // Add ID when instantiating
  addBookToLibrary(newBook);
  clearForm();
  viewBookList(myLibrary);
}

function addBookToLibrary(book) {
  // Hide modal
  removeClass();
  // Add book to array
  return myLibrary.push(book);
}

function clearForm() {
  document.querySelector('#form').reset();
}

function setCardStyle(element, details) {
  element.setAttribute(
    'style',
    'display: flex; flex-direction: column; justify-content: space-between; text-align: center; background-color: #fff; padding: 1em; margin: 1em 1em 1em 0; border-radius: 5px; height: 250px; width: 250px; line-height: 1.5; box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.2);',
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

function removeBookBtn() {
  let btn = document.createElement('button');
  // Style button
  btn.setAttribute(
    'style',
    'color: red; height: 2.5em; width: 50%; border-radius: 5px; margin: 0 auto; font-weight: bold; text-transform: uppercase; cursor: pointer;',
  );
  btn.innerHTML = 'Delete';
  return btn;
}

function handleDelete(e) {
  // Get book's data-target
  let bookIndex = parseInt(e.path[1].attributes[1].value);
  // newArray = myLibrary.splice(bookIndex, 1);
  myLibrary = myLibrary.filter((book, index) => {
    if (book !== bookIndex) {
      return index;
    }
  });
  console.log(myLibrary);
  viewBookList(myLibrary);
}

function clearDOM(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}

function viewBookList(list) {
  const bookDiv = document.querySelector('.book-list');
  clearDOM(bookDiv);

  for (book in list) {
    let bookDetails = list[book];
    let renderCard = createCard();
    const deleteButton = removeBookBtn();

    deleteButton.addEventListener('click', handleDelete);
    setCardStyle(renderCard, bookDetails);

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

viewBookList(myLibrary);

// Event listeners
btnOpenModal.addEventListener('click', addClass);
btnCloseModal.addEventListener('click', removeClass);
submitButton.addEventListener('click', createBook);
