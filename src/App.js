import React, { createContext, useContext, useState } from 'react';

const initialBooks = [
  { id: 1, title: 'React in Action', author: 'Mark T. Thomas' },
  { id: 2, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford' },
];

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(initialBooks);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, removeBook }}>
      {children}
    </BookContext.Provider>
  );
};

const BookList = () => {
  const { books } = useContext(BookContext);

  return (
    <div>
      <h2>Kitap Listesi</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

const BookForm = () => {
  const { addBook } = useContext(BookContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      addBook({ id: Date.now(), title, author });
      setTitle('');
      setAuthor('');
    }
  };

  return (
    <div>
      <h2>Yeni Kitap Ekle</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Kitap Adı" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Yazar" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
};

function App() {
  return (
    <BookProvider>
      <div className="App">
        <BookList />
        <BookForm />
      </div>
    </BookProvider>
  );
}

export default App;
