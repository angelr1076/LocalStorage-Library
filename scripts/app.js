let myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.read = Boolean(read);

  this.bookInfo = function () {
    const wasRead = this.read === true ? 'read' : 'not read';
    console.log(
      `${this.title} written by ${this.author}, ${this.pages} pages in length was ${wasRead}.`,
    );
  };

  return this.bookInfo();
}

function addBookToLibrary(...book) {
  // Seed library with starter books
  const book1 = new Book(
    'Down and Out in Paris and London',
    'George Orwell',
    213,
    true,
  );

  const book2 = new Book('Homage to Catalonia', 'George Orwell', 232, true);

  // Push to myLibrary
  myLibrary.push(book1, book2, ...book);
}

const book3 = new Book('Shooting an Elephant', 'George Orwell', 368, false);

addBookToLibrary(book3);

console.log(myLibrary);
