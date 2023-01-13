const submitButton = document.querySelector('#submit');
const btnOpenModal = document.querySelector('.open-modal');
const btnCloseModal = document.querySelector('.close-modal');
const modalElement = document.querySelector('.modal');
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let pages = document.querySelector('#pages');
let errorMsgSpan = document.querySelector('.error');

function bookFactory(title, author, pages, read) {
  const bookProperties = { title, author, pages, read };

  return {
    ...bookProperties,
  };
}

// Seed library
let myLibrary = [
  bookFactory('Down and Out in Paris and London', 'George Orwell', 232, true),
  bookFactory('Homage to Catalonia', 'George Orwell', 202, true),
];

function createBook(e) {
  e.preventDefault();

  let read = document.querySelector('.read').checked || true;

  // Instantiate new Book object
  const newBook = bookFactory(title.value, author.value, pages.value, read);
  console.log(newBook);
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
    <p>${details.pages} pages</p>
    `;
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
    btn.classList.remove('readBtn');
    btn.classList.add('unread', 'btn');
    btn.innerHTML = 'Not Read';
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

title.addEventListener('input', e => {
  if (!title.validity.patternMismatch) {
    // reset error message view
    errorMsgSpan.textContent = '';
    errorMsgSpan.className = 'error';
  } else {
    showError();
    console.log(title.validationMessage);
  }
});

author.addEventListener('input', e => {
  if (!author.validity.patternMismatch) {
    // reset error message view
    errorMsgSpan.textContent = '';
    errorMsgSpan.className = 'error';
  } else {
    showError();
    console.log(author.validationMessage);
  }
});

pages.addEventListener('input', e => {
  if (!pages.validity.patternMismatch) {
    // reset error message view
    errorMsgSpan.textContent = '';
    errorMsgSpan.className = 'error';
  } else {
    showError();
    console.log(pages.validationMessage);
  }
});

function showError() {
  if (title.validity.patternMismatch) {
    errorToggle();
    errorMsgSpan.textContent =
      'You must add a book title between 4-30 characters in length.';
  } else if (author.validity.patternMismatch) {
    errorToggle();
    errorMsgSpan.textContent = `You must add an author's name between 4-25 characters in length.`;
  } else if (pages.validity.patternMismatch) {
    errorToggle();
    errorMsgSpan.textContent =
      'You can only enter integers into this field between 2 and 5 characters.';
  }
}

function errorToggle() {
  errorMsgSpan.classList.add('active');
}

viewBookList(myLibrary);

// Event listeners
btnOpenModal.addEventListener('click', addClass);
btnCloseModal.addEventListener('click', removeClass);
submitButton.addEventListener('click', createBook);
