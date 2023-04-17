import PropTypes from "prop-types";

const Book = (props) => {
  const { book, handleChangeBook, shelves } = props;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${
              book.imageLinks && book.imageLinks.smallThumbnail
            }")`,
          }}
        ></div>

        <div className="book-shelf-changer">
          <select
            onChange={(e) => handleChangeBook(e.target.value, book)}
            value={book.shelf}
          >
            {book.shelf === "none" && (
              <option value="none" disabled>
                Add to...
              </option>
            )}
            {book.shelf !== "none" && (
              <option value="none" disabled>
                Move to...
              </option>
            )}
            {shelves.map((shelf) => (
              <option key={shelf.shelfId} value={shelf.shelfId}>
                {shelf.name}
              </option>
            ))}
            {book.shelf !== "none" && <option value="none">None</option>}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors && book.authors.join(", ")}
      </div>
    </div>
  );
};

export default Book;

Book.propTypes = {
  book: PropTypes.object.isRequired,
  handleChangeBook: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired,
};
