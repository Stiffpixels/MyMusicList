import React, { useState, useEffect, useCallback, memo } from "react";
import Layout from "../components/layout/layout";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import { FaPlus, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

const Home = () => {
  const [music, setMusic] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [AlbumId, setAlbumId] = useState("");
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const fetchMusic = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/music?page=${page}`);
      if (res.data.success) {
        setMusic(res.data.Music);
        setPageCount(res.data.pageCount);
      }
    } catch (error) {
      console.log(error);
      setMusic([]);
    }
  };

  const fetchUser = useCallback(async () => {
    try {
      const user = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`);
      if (user.data.success) {
        const current = user.data.user.musicList.current;
        const completed = user.data.user.musicList.completed;
        const planned = user.data.user.musicList.planning;

        setUserList(current.concat(completed).concat(planned));
      }
    } catch (error) {}
  }, []);

  // const binToBase64 = (buffer) => {
  //   let binary = "";
  //   const bytes = [].slice.call(new Uint8Array(buffer));
  //   bytes.forEach((b) => (binary += String.fromCharCode(b)));
  //   return window.btoa(binary);
  // };
  useEffect(() => {
    fetchMusic();
  }, [isModalOpen, page]);
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Layout title="Best Place to Keep your Music Organized" keywords="Music, Music List, Indian Website" description="home page of My Music List" author="Muzammil">
      <div className="home-container">
        <div className="music-grid">
          {music.length === 0 ? (
            <div className="d-flex spinner flex-column justify-content-center align-items-center" style={{ width: "100%", height: "100%", alignSelf: "center" }}>
              <div className="spinner-border" role="status"></div>
            </div>
          ) : (
            music.map((album, index) => {
              return (
                <div className="music-container" key={index}>
                  <div className="album-cover">
                    <img src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${album.image.public_id}`} alt="music cover" />
                  </div>
                  <div className="music-details">
                    <p className="music-name">{album.name}</p>
                    <div className="artist-and-rating">
                      <p className="artist profile-field-text" style={{ fontSize: "1em" }}>
                        {album.artist}
                      </p>
                      <p className="rating">
                        <FaStar color="#fcb603" style={{ marginTop: "-.35em" }} />
                        {album.rating}
                      </p>
                    </div>
                  </div>
                  <div className="music-buttons">
                    <Link type="button" className="view-more" to={`./album/${album._id}`} state={{ album }}>
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
              );
            })
          )}
          <Modal open={isModalOpen} onClose={() => setModalOpen(false)} albumId={AlbumId} />
        </div>
        <div className="page-numbers-container">
          <div className="page-numbers">
            <p>Page</p>
            <div style={{ display: "inline" }}>
              <label htmlFor="page-btn-left">
                <FaArrowLeft />
              </label>
              <input
                id="page-btn-left"
                type="button"
                className="page-btn"
                onClick={() => {
                  if (page === 1) {
                    return;
                  }
                  setPage(page - 1);
                }}
              />
            </div>
            <input type="button" onClick={(e) => e.preventDefault()} className="page-btn page-number" value={page} style={{ background: "lightGray", padding: "0 .2em" }} />
            <div style={{ display: "inline" }}>
              <label htmlFor="page-btn-right">
                <FaArrowRight />
              </label>
              <input
                type="button"
                id="page-btn-right"
                className="page-btn"
                onClick={(e) => {
                  if (page < pageCount) {
                    setPage(page + 1);
                  } else {
                    return;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default memo(Home);
