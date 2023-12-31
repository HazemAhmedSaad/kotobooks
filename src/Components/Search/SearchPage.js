import Card from "react-bootstrap/Card";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import "../Books/Book.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeCounter } from "../Store/Actions";
function BasicExample() {
  const { qeuryName } = useParams("");
  const [allBooks, SetAllBooks] = useState([]);
  const [numPage, seeNumPage] = useState(1);
  const [page, setPage] = useState(1);
  const favorites = useSelector((state) => state.favorites);
  const counter = useSelector((state) => state.counter);
  const myDispatcher = useDispatch();
  console.log(favorites);
  // console.log(counter);
  console.log(qeuryName);
  useEffect(() => {
    axios
      .get(`https://example-data.draftbit.com/books`, {
        params: {
          // _limit: 12,
          // _page: page,
          q: qeuryName,
        },
      })
      .then((response) => {
        console.log(response.data);
        SetAllBooks(response.data);
        seeNumPage(response.data.length);
      });
  }, [page, qeuryName]);
  const showPev = () => {
    let currentPage = page;
    if (currentPage >= 1) {
      currentPage--;
      setPage(currentPage);
    }
  };
  const showNext = () => {
    let currentPage = page;
    if (currentPage <= numPage) {
      currentPage++;
      setPage(currentPage);
    }
  };
  return (
    <div className="row g-5 mx-auto container app-b-style  mb-5 small-v">
      {allBooks.map((book) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mx-auto d-flex justify-content-center">
          <Card className="card-book">
            <Link to={`/book-detailes/${book.id}`}>
              <div className="photo-card">
                <Card.Img
                  className="photo"
                  variant="top"
                  src={book.image_url}
                />
              </div>
            </Link>
            <Card.Body className="cord-size">
              <Card.Title className="book-name" title={book.title}>
                {book.title}
              </Card.Title>
              <Link
                className="link-dicor"
                title={book.authors}
                to={`/search/${book.authors}`}
              >
                <Card.Text className="author-name">{book.authors}</Card.Text>
              </Link>
              <div className="sav-rat">
                <p className="rate">{book.rating}</p>
                <button
                  className="btn-icon"
                  onClick={(change) => {
                    let found = false;
                    let deletitem;
                    for (const key in favorites) {
                      if (book.id === favorites[key].id) {
                        found = true;
                        deletitem = key;
                      }
                    }
                    if (!found) {
                      favorites.push(book);

                      myDispatcher(changeCounter(counter + 1));
                    } else {
                      delete favorites[deletitem];
                      myDispatcher(changeCounter(counter - 1));
                    }
                  }}
                >
                  {favorites.some((item) => item.id === book.id) ? (
                    <IoBookmark className="save saved" />
                  ) : (
                    <IoBookmarkOutline className="save" />
                  )}
                </button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
      <div className="mt-5 mx-auto">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item" style={{ width: "150px" }}>
              <button
                className="btn  text-white btn-bord"
                style={{ width: "150px", backgroundColor: "#222" }}
                onClick={showPev}
                disabled={page <= 1 ? true : false}
              >
                {"<< Previous"}
              </button>
            </li>
            <li className="page-item" style={{ width: "150px" }}>
              <button
                className="btn  text-white btn-bord"
                style={{ width: "150px", backgroundColor: "#222" }}
                onClick={showNext}
                disabled={page === numPage ? true : true}
              >
                {"Next >>"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BasicExample;
