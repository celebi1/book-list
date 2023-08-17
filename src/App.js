import React, { createContext, useContext, useState } from 'react';
import './App.css';

const initialBooks = [
  // ...
];

const BookContext = createContext();

const App = () => {
  const [books, setBooks] = useState(initialBooks);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [titleError, setTitleError] = useState('');
  const [authorError, setAuthorError] = useState('');

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError('Lütfen bir başlık girin');
      return;
    }

    if (!author.trim()) {
      setAuthorError('Lütfen bir yazar adı girin');
      return;
    }

    addBook({ id: Date.now(), title, author });
    setTitle('');
    setAuthor('');
    setTitleError('');
    setAuthorError('');
  };

  return (
    <div className="App">
      <h2>Kitap Listesi</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>

      <div className="book-form">
        <h2>Yeni Kitap Ekle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Kitap Adı"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError('');
            }}
          />
          {titleError && <p className="error-message">{titleError}</p>}

          <input
            type="text"
            placeholder="Yazar"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setAuthorError('');
            }}
          />
          {authorError && <p className="error-message">{authorError}</p>}

          <button type="submit">Ekle</button>
        </form>
      </div>
    </div>
  );
};

export default App;
