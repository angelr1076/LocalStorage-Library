const submitButton = document.querySelector('#submit');
const btnOpenModal = document.querySelector('.open-modal');
const btnCloseModal = document.querySelector('.close-modal');
const modalElement = document.querySelector('.modal');

// Book constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = read;

    // Methods
    this.bookInfo = function () {
      const wasRead = this.read === true ? 'read' : 'not read';
      return `${this.title} written by ${this.author}, ${this.pages} pages in length was ${wasRead}.`;
    };
    return this.bookInfo();
  }
}

// Seed library
let myLibrary = [
  new Book('Down and Out in Paris and London', 'George Orwell', 232, true),
  new Book('Homage to Catalonia', 'George Orwell', 202, true),
];

function createBook(e) {
  e.preventDefault();

  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('.read').checked;

  // Instantiate new Book object
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  clearForm();
  viewBookList(myLibrary);
  addIdToCard();
}

function addIdToCard() {
  // Set the card's ID
  return myLibrary.forEach((book, i) => {
    book.id = i;
  });
}

function addBookToLibrary(book) {
  // Hide modal
  removeClass();
  // Add book to array
  return myLibrary.push(book);
}

function setCardStyle(element, details) {
  element.classList.add('card');

  element.innerHTML = `
    <h2 class="book-title">${details.title}</h2>

    <p>${details.author}</p>
    <p>${details.pages} pages</p>`;
}

function createCard(book) {
  let bookCard = document.createElement('div');
  bookCard.classList.add('card');
  let bookId = parseInt(book);
  // Set the data-target of the card
  bookCard.setAttribute('data-target', `${bookId}`);
  return bookCard;
}

function removeBookBtn() {
  let btn = document.createElement('button');
  btn.classList.add('removeBtn', 'btn');
  btn.textContent = 'Delete';
  return btn;
}

function readBtn(e) {
  let readStatus = myLibrary[e].read;
  let btn = document.createElement('button');
  if (readStatus === true) {
    btn.classList.add('readBtn', 'btn');
    btn.innerHTML = 'Read';
  } else {
    btn.innerHTML = 'Not Read';
    btn.classList.remove('readBtn');
    btn.classList.add('unread', 'btn');
  }
  return btn;
}

function handleDelete(e) {
  let bookIndex = parseInt(e.path[1].attributes[1].value); // Get book's ID
  myLibrary.splice(bookIndex, 1);
  viewBookList(myLibrary);
}

function handleToggleRead(e) {
  let bookIndex = parseInt(e.path[1].attributes[1].value); // Get book's ID
  let readStatus = myLibrary[bookIndex].read;
  readStatus === true
    ? (myLibrary[bookIndex].read = !true)
    : (myLibrary[bookIndex].read = true);

  viewBookList(myLibrary);
}

function clearDOM(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}

function clearForm() {
  document.querySelector('#form').reset();
}

function viewBookList(list) {
  const bookDiv = document.querySelector('.book-list');
  clearDOM(bookDiv);

  for (book in list) {
    let bookDetails = list[book];
    // Pass book ID to createCard function
    let renderCard = createCard(book);
    const deleteButton = removeBookBtn();
    const readButton = readBtn(book);

    deleteButton.addEventListener('click', handleDelete);
    readButton.addEventListener('click', handleToggleRead);

    setCardStyle(renderCard, bookDetails);
    renderCard.appendChild(readButton);
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
