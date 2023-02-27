import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "./instaIcon.png";
import camera from "./camera.png";
import "./postform.css";
import FileBase64 from 'react-file-base64';
import axios from "axios";
const Postview = () => {
  const [form, setForm] = useState({
    postImage: "",
    author: "",
    location: "",
    description: "",
  });
  const navigate = useNavigate();
  const isAllInputsValied =
    form.postImage.length &&
    form.author.length &&
    form.location.length &&
    form.description.length;
  const [isValid, setIsValied] = useState(false);

  const uploadPost = (e) => {
    e.preventDefault();

    if (isAllInputsValied === 0) {
      setIsValied(true);
    } else setIsValied(false);

    axios.post("https://myinstaappl.onrender.com/api/v1/posts/addpost", {
            postImage:form.postImage.base64,
            author:form.author,
            location:form.location,
            description:form.description
        })
        .then(() => navigate("/postview"))
  };

  return (
    <div>
      <section>
        <div id="div">
          <img
            className="imag1"
            src={image}
            alt="Instagram"
            height="50px"
            width="50px"
          />
          <h2 className="heading">Instaclone</h2>
          <img
            className="camera"
            src={camera}
            alt="camera"
            height="40px"
            width="40px"
          />
        </div>
      </section>
      <section>
      {isValid && (
            <center><div style={{ color: "red", marginTop: "10px" }}>
              All fields are mandatory
            </div></center>
          )}
        <form
          className="form"
          action="/addpost"
          method="post"
          onSubmit={uploadPost}
        >
          <div className="form-file">
            <FileBase64
              multiple={false}
              onDone={(base64) => setForm({ ...form, postImage: base64 })}
            />
          </div>

          <div className="form-details-1">
            <input
              type="text"
              name="author"
              placeholder="  Author"
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              value={form.author}
            />

            <input
              type="text"
              name="location"
              placeholder="  Location"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              value={form.location}
            />
          </div>

          <div className="form-details-2">
            <input
              type="text"
              name="description"
              placeholder="  Description"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              value={form.description}
            />
          </div>
          <div>
            <button className="post-button">Post</button>
          </div>
        </form>
      </section>
    </div>
  );
};
export default Postview;
