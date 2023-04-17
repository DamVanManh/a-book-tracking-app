import Book from "./Book";
import PropTypes from "prop-types";

const Bookshelf = (props) => {
  const { books, name, handleChangeBook, shelves } = props;

  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books &&
              books.map((book, key) => (
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
      </div>
    </div>
  );
};

export default Bookshelf;

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  handleChangeBook: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  shelves: PropTypes.array.isRequired,
};
