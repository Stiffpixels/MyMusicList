import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout.js";
import axios from "axios";
import Profmenu from "../components/Profmenu";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
import AdminProfile from "../components/AdminProfile.js";

const Dashboard = () => {
  const [profileChanged, setProfileChanged] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });

  const binToBase64 = (buffer) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image.data.size > 1 * 1000 * 1024) {
      toast.error("Image size cannot be more than 1MB");
      return;
    }
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("profile_pic", image);
    formData.append("profile_pic", image.data);
    try {
      const response = await axios.put(`${process.env.REACT_APP_UPLOAD_API}/api/v1/update/details`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      if (response?.data?.success) {
        setProfileChanged((prevVal) => {
          return prevVal ? false : true;
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const handleFileChange = (e) => {
    if (/image/.test(e.target.files[0].type)) {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      setImage(img);
    } else {
      toast.error("Only an image file can be selected.");
      e.target.value = "";
    }
  };
  const asyncFunc = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`);
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
      setAuth(false);
      localStorage.removeItem("auth");
      navigate("/login");
    }
  };
  useEffect(() => {
    asyncFunc();
  }, [profileChanged]);

  return (
    <>
      <Layout title="My Profile " description="Your profile information">
        <Profmenu />
        <div className="form-container" style={{ width: "100%", margin: "0" }}>
          <section className="form profile-container">
            <div className="profile-image">
              <img src={`data:image/jpg;base64,${binToBase64(user?.avatar?.img?.data?.data)}`} alt=" profile" />
            </div>

            <div className="profile-details">
              <p className="profile-text">{user.name}</p>
              <p className="profile-text">{user.email}</p>
            </div>
          </section>
        </div>
        <div className="form-container" style={{ width: "100%", margin: "0", marginBottom: "1em" }}>
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <h3 className="form-title" style={{ textTransform: "uppercase" }}>
              Edit Profile
            </h3>
            <p className="form-field">
              <label htmlFor="name" className="field-text profile-field-text">
                Name:{" "}
              </label>
              <input className="field-input" value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
            </p>
            <p className="form-field">
              <label htmlFor="email" className="field-text profile-field-text">
                Email:{" "}
              </label>
              <input className="field-input" type="email" value={email} name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            </p>
            <p className="form-field file-input">
              <label htmlFor="profile_pic" className="field-text profile-field-text">
                Profile Picture:{" "}
              </label>
              <input type="file" name="profile_pic" id="profile_pic" onChange={(e) => handleFileChange(e)} accept=".jpg, .jpeg, .png"></input>
            </p>

            <div className="submit-btn-container">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
        {user.role === "admin" && <AdminProfile />}
      </Layout>
    </>
  );
};

export default Dashboard;
