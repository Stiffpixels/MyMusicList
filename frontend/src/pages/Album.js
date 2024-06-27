import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Album = () => {
  const location = useLocation();
  const { album } = location.state;

  // const { albumId } = useParams();
  // const [album, setAlbum] = useState({});
  // const getAlbum = async () => {
  //   try {
  //     const resp = await axios.get(`${process.env.REACT_APP_API}/api/v1/musicDetail?id=${albumId}`);
  //     if (resp.data.success) {
  //       setAlbum(resp.data.Music);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAlbum();
  // }, []);

  return (
    <Layout title="Album">
      <div className="form" style={{ margin: "2em 0" }}>
        <div className="album-container">
          <div className="album_cover">
            <img src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${album?.image?.public_id}`} alt={album.name} />
          </div>
          <div className="album-details">
            <div className="artist-and-rating" style={{ marginTop: ".5em" }}>
              <h3 style={{ fontFamily: "Roboto Condensed, sans-serif" }}>{album.name}</h3>
              <p style={{ fontSize: "1rem", fontWeight: "bolder" }}>
                <FaStar color="#fcb603" size={20} style={{ marginTop: "-.2em" }} />
                {album.rating}
              </p>
            </div>

            <p>{album.description}</p>
            <div className="Songs" style={{ marginTop: "2em" }}>
              <p style={{ fontWeight: "bolder" }}>Songs:</p>
              <ul style={{ listStyle: "none" }}>
                {album?.songs?.map((song, index) => {
                  return (
                    <li key={index} style={{ background: "white", padding: ".5em", borderRadius: "10px", marginTop: ".75em" }}>
                      <label style={{ fontSize: "1.1rem" }}>{song.songName}</label>
                      <br></br>
                      <label style={{ fontSize: ".75em" }}>Credits: {song.credits}</label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="Songs" style={{ marginTop: "2em" }}>
              <p style={{ fontWeight: "bolder" }}>Reviews:</p>
              <ul style={{ listStyle: "none" }}>
                {album?.reviews?.map((review, index) => {
                  return (
                    <li key={index} style={{ background: "white", padding: ".5em", borderRadius: "10px", marginTop: ".75em" }}>
                      <div className="artist-and-rating">
                        <label style={{ fontSize: "1.1rem" }}>{review.name}</label>
                        <p style={{ fontSize: ".7rem", fontWeight: "bolder" }}>
                          <FaStar color="#fcb603" size={15} style={{ marginTop: "-.2em" }} />
                          {review.rating}
                        </p>
                      </div>

                      <label style={{ fontSize: ".75em" }}> {review.comment}</label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Album;
