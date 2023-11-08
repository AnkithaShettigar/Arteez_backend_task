import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Books.css';
import Search from '../Search/Search';

function Books() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    ISBN: '',
    quantity: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const filterBooks = (searchText) => {
    const filteredBooks = books.filter((book) =>
      Object.values(book).some((field) =>
        field.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setBooks(filteredBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, [isSearchModalOpen]);

  const apiUrl = 'http://localhost:4000'; // Update with your backend API URL

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const validateCreateData = () => {
    if (!formData.title || !formData.id) {
      setErrorMessage('All fields are required');
      setTimeout(() => setErrorMessage(''), 3000);

      return false;
    }
    return true;
  };

  const handleCreateBook = async () => {
    if (!validateCreateData()) {
      return;
    }

    try {
      const existingBook = books.find(
        (book) => book.id === formData.id || book.title === formData.title
      );

      if (existingBook) {
        setErrorMessage('ID or Title already exists');
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        await axios.post(`${apiUrl}/api/book`, formData);
        fetchBooks(); // Refresh book list after creation
        setFormData({
          id: '',
          title: '',
          author: '',
          ISBN: '',
          quantity: '',
        });
        setErrorMessage('');
        setSuccessMessage('Book created successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error creating book:', error);
      setErrorMessage('Failed to create book check Id or title');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleFetchBook = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/api/book/${id}`);
      setFormData(response.data);
      setEditMode(true);
      setSuccessMessage('Book fetched successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error fetching book by ID:', error);
    }
  };

  const handleUpdateBook = async () => {
    try {
      await axios.put(`${apiUrl}/api/book/update/${formData.id}`, formData);
      fetchBooks(); // Refresh book list after update
      setFormData({
        id: '',
        title: '',
        author: '',
        ISBN: '',
        quantity: '',
      });
      setEditMode(false);
      setSuccessMessage('Book updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/book/delete/${id}`);
      fetchBooks(); // Refresh book list after deletion
      setSuccessMessage('Book deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="book-content">
      <h3 style={{ marginLeft: '650px' }}>Add/Edit Book </h3>
      <Search
        onSearch={filterBooks}
        setSearchModalOpen={setSearchModalOpen}
        isSearchModalOpen={isSearchModalOpen}
      />
      <form action="POST">
        <input
          type="text"
          className="book-fill"
          placeholder="Book ID"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        />
        <input
          type="text"
          className="book-fill"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          className="book-fill"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        <input
          type="text"
          className="book-fill"
          placeholder="ISBN"
          value={formData.ISBN}
          onChange={(e) => setFormData({ ...formData, ISBN: e.target.value })}
        />
        <input
          type="number"
          className="book-fill"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
        />
        {editMode ? (
          <button type="button" className="book-btn" onClick={handleUpdateBook}>
            Update
          </button>
        ) : (
          <button type="button" className="book-btn" onClick={handleCreateBook}>
            Create
          </button>
        )}
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <h2 style={{ marginLeft: '650px' }}>Book List</h2>
      <table border="2" className="list-book">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.ISBN}</td>
              <td>{book.quantity}</td>
              <td className="add-delete">
                <button
                  className="add-btn"
                  onClick={() => handleFetchBook(book.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
