import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import { FaPlus, FaStar } from "react-icons/fa";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

const Home = () => {
  const [music, setMusic] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [AlbumId, setAlbumId] = useState("");
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/music?page=${page}`
      );
      if (res.data.success) {
        setMusic(res.data.Music);
        setPageCount(res.data.pageCount);
      }
    } catch (error) {
      console.log(error);
      setMusic([]);
    }
    try {
      const user = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`);
      if (user.data.success) {
        const current = user.data.user.musicList.current;
        const completed = user.data.user.musicList.completed;
        const planned = user.data.user.musicList.planning;

        setUserList(current.concat(completed).concat(planned));
      }
    } catch (error) {}
  };
  const binToBase64 = (buffer) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const getPageNumber = (e) => {
    e.preventDefault();
    if (page < pageCount) {
      if (e.target.id === "page-btn-2") {
        return page + 1;
      } else {
        return page + 2;
      }
    } else {
      e.target.display = "none";
    }
  };

  useEffect(() => {
    fetchData();
  }, [isModalOpen, page]);

  return (
    <Layout
      title="Best Place to Keep your Music Organized"
      keywords="Music, Music List, Indian Website"
      description="home page of My Music List"
      author="Muzammil"
    >
      <div className="home-container">
        <div className="music-grid">
          {music.length === 0 ? (
            <div
              className="d-flex spinner flex-column justify-content-center align-items-center"
              style={{ width: "100%", height: "100%", alignSelf: "center" }}
            >
              <div className="spinner-border" role="status"></div>
            </div>
          ) : (
            music.map((album, index) => {
              return (
                <>
                  <div className="music-container" key={index}>
                    <div className="album-cover">
                      <img
                        src={`data:image/jpg;base64,${binToBase64(
                          album?.image?.data?.data
                        )}`}
                        alt="music cover"
                      />
                    </div>
                    <div className="music-details">
                      <p className="music-name">{album.name}</p>
                      <div className="artist-and-rating">
                        <p
                          className="artist profile-field-text"
                          style={{ fontSize: "1em" }}
                        >
                          {album.artist}
                        </p>
                        <p className="rating">
                          <FaStar
                            color="#fcb603"
                            style={{ marginTop: "-.35em" }}
                          />
                          {album.rating}
                        </p>
                      </div>
                    </div>
                    <div className="music-buttons">
                      <Link
                        type="button"
                        className="view-more"
                        to={`./album/${album._id}`}
                      >
                        View More
                      </Link>
                      {!userList.includes(album._id) && (
                        <button
                          type="button"
                          className="btn bg-success text-light"
                          onClick={(e) => {
                            e.preventDefault();
                            setAlbumId(album._id);
                            setModalOpen(true);
                          }}
                          style={{
                            padding: "0 .3em .17em .3em",
                            fontSize: ".85rem",
                          }}
                        >
                          <FaPlus />
                        </button>
                      )}
                    </div>
                  </div>
                </>
              );
            })
          )}
          <Modal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            albumId={AlbumId}
          />
        </div>
        <div className="page-numbers-container">
          <div className="page-numbers">
            <input
              type="button"
              className="page-btn"
              onClick={() => {
                if (page === 1) {
                  return;
                }
                setPage(page - 1);
              }}
              value="<<"
            />
            <input
              type="button"
              onClick={(e) => e.preventDefault()}
              className="page-btn"
              value={page}
              style={{ background: "lightGray", padding: "0 .2em" }}
            />
            <input
              type="button"
              onClick={(e) => setPage(Number(e.target.value))}
              className="page-btn"
              id="page-btn-2"
              value={(e) => getPageNumber(e)}
            />
            <input
              type="button"
              className="page-btn"
              onClick={(e) => setPage(Number(e.target.value))}
              value={(e) => getPageNumber(e)}
            />
            <input
              type="button"
              className="page-btn"
              onClick={(e) => {
                if (page < pageCount) {
                  setPage(page + 1);
                } else {
                  return;
                }
              }}
              value=">>"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
