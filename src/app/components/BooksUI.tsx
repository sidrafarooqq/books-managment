'use client';

import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

export default function BooksUI() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch all books on load
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async () => {
    if (!title || !author) {
      alert('Please provide both title and author!');
      return;
    }

    try {
      await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author }),
      });
      setTitle('');
      setAuthor('');
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateBook = async () => {
    if (!title || !author || editId === null) {
      alert('Please provide both title and author!');
      return;
    }

    try {
      await fetch('/api/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, title, author }), // Ensure we're sending the correct book ID for update
      });
      setTitle('');
      setAuthor('');
      setEditId(null); // Reset editId after updating
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async (id: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await fetch('/api/books', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = (book: Book) => {
    setEditId(book.id); 
    setTitle(book.title); 
    setAuthor(book.author); 
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-br from-yellow-200 via-orange-300 to-amber-200 h-auto rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Books Management
      </h1>
      <div className="mb-6">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            onClick={() => (editId ? updateBook() : addBook())}
            className={`px-4 py-2 font-semibold text-white rounded-md ${
              editId
                ? 'bg-amber-700 hover:bg-amber-600'
                : 'bg-black hover:bg-orange-400'
            }`}
          >
            {editId ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </div>
      <ul className="space-y-4">
      {books.map((book, index) => (
    <li key={`${book.id}-${index}`}
            className="flex justify-between items-center p-4 border border-gray-300 rounded-md shadow-md bg-white"
          >
            <div>
              <p className="font-bold text-lg text-gray-800">{book.title}</p>
              <p className="text-gray-600">by {book.author}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(book)} 
                className="px-3 py-1 text-sm font-medium text-white bg-black hover:bg-orange-400"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book.id)} 
                className="px-3 py-1 text-sm font-medium text-white bg-black hover:bg-orange-400"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}