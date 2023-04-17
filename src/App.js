import "./App.css";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Search from "./components/Search";
import Home from "./components/Home";
import * as BooksAPI from "./BooksAPI";

function App() {
  const shelves = [
    { name: "Currently Reading", shelfId: "currentlyReading" },
    { name: "Want to Read", shelfId: "wantToRead" },
    { name: "Read", shelfId: "read" },
  ];

  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
    });
  }, []);

  const handleChangeBook = (shelf, book) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      setBooks([...books.filter((b) => b.id !== book.id), book]);
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <main className={"app"}>
          <Outlet />
        </main>
      ),
      children: [
        {
          path: "/",
          element: (
            <Home
              books={books}
              shelves={shelves}
              handleChangeBook={handleChangeBook}
            />
          ),
        },
        {
          path: "/search",
          element: (
            <Search
              books={books}
              shelves={shelves}
              handleChangeBook={handleChangeBook}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
