import { NextResponse } from 'next/server';

let books = [
  { id: 1, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" },
  { id: 2, title: " A Journey to the Bottom of the Sea (Hardcover)", author: " Steve Jenkins" },
  { id: 3, title: "The Tiny Seed (Paperback) ", author: "Eric Carle " },
  { id: 4, title: " Cities of the Ocean (Paperback)", author: "Maris Wicks" },
];

// GET request: Retrieve list of books

export async function GET(){
  try{
      return NextResponse.json(books,  {status:200})
  }catch(error){
      return NextResponse.json(
      {message:"Error Fetching Books"},
      {status:500}
  )
  }
}

// POST request: Add a new book

export async function POST(request: Request) {
  try {
      const { id, title, author } = await request.json();
      const newBook = { id, title, author };

      books.push(newBook);

      return NextResponse.json(
          { message: "Book added successfully", book: newBook },
          { status: 201 }
      );
  } catch (error) {
      return NextResponse.json(
          { message: "Error adding the book" },
          { status: 500 }
      );
  }
}


// PUT request: Update a book by id

export async function PUT(request: Request) {
  try {
      const { id, title, author } = await request.json();
      const bookIndex = books.findIndex((book) => book.id === id);

      if (bookIndex === -1) {
          return NextResponse.json(
              { message: "Book not found" },
              { status: 404 }
          );
      }

      books[bookIndex] = { id, title, author };

      return NextResponse.json(
          { message: "Book updated successfully", book: books[bookIndex] },
          { status: 200 }
      );
  } catch (error) {
      return NextResponse.json(
          { message: "Error updating the book" },
          { status: 500 }
      );
  }
}

// DELETE request: Delete a book by id

export async function DELETE(request: Request) {
  try {
      const { id } = await request.json();
      const bookIndex = books.findIndex((book) => book.id === id);

      if (bookIndex === -1) {
          return NextResponse.json(
              { message: "Book not found" },
              { status: 404 }
          );
      }

      books.splice(bookIndex, 1);

      return NextResponse.json(
          { message: "Book deleted successfully" },
          { status: 200 }
      );
  } catch (error) {
      return NextResponse.json(
          { message: "Error deleting the book" },
          { status: 500 }
      );
  }
}