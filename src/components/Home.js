import Bookshelf from "./BookShelf";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HomePage = (props) => {
  const { books, handleChangeBook, shelves } = props;

  return (
    <div className="list-books">
      <div>
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf, key) => (
              <Bookshelf
                key={key}
                name={shelf.name}
                books={
                  books &&
                  books.filter((book) => book && book.shelf === shelf.shelfId)
                }
                shelves={shelves}
                handleChangeBook={handleChangeBook}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default HomePage;

HomePage.propTypes = {
  handleChangeBook: PropTypes.func.isRequired,
  books: PropTypes.array,
  shelves: PropTypes.array.isRequired,
};
