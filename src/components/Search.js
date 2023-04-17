import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

const SearchPage = (props) => {
  const { handleChangeBook, books, shelves } = props;
  const [input, setInput] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  useEffect(() => {
    if (!input) {
      setSearchedBooks([]);
      return;
    }

    BooksAPI.search(input)
      .then((searchedBooks) => {
        if (searchedBooks.error) {
          return setSearchedBooks([]);
        }

        // add shelf prop
        searchedBooks = searchedBooks.map((book) => {
          for (let b of books) {
            if (b.id === book.id) return { ...book, shelf: b.shelf };
          }
          return { ...book, shelf: "none" };
        });

        setSearchedBooks(searchedBooks);
      })
      .catch((err) => console.log("Search Error:", err));
  }, [input]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <NavLink className="close-search" to="/">
          Close
        </NavLink>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={input}
            onChange={(e) => {
              e.preventDefault();
              setInput(e.target.value);
            }}
          />
        </div>
      </div>

      {input && (
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.map((book, key) => (
              <li key={key}>
                <Book
                  book={book}
                  shelves={shelves}
                  handleChangeBook={handleChangeBook}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

SearchPage.propTypes = {
  handleChangeBook: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
};
