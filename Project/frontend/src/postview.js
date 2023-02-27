import React, { useEffect, useState } from "react";
import "./post.css";
import { Link } from "react-router-dom";
import image from "./instaIcon.png";
import camera from "./camera.png";
import axios from "axios";
const Postview = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
      axios.get("https://myinstaappl.onrender.com/api/v1/posts").then((res)=>{
        setData(res.data.post);
      })
    },[]);
    console.log(data);

  if (data == null) {
    return (
      <center>
        <h1>Loading...</h1>
      </center>
    );
  }
  return (
    <section>
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
          <Link to="/postform">
            <img
              className="camera"
              src={camera}
              alt="camera"
              height="38px"
              width="38px"
            />
          </Link>
        </div>
      </section>
      <section>
        {props.val === true ? window.location.reload(true) : ""}
        {data.map((item, index) => (
          <div id="card-content" key={index}>
            <div id="head-part">
              <b>{item.author}</b>
              <div className="sub-content">
                {item.location}
                <i className="fa-solid fa-ellipsis fa-lg"></i>
              </div>
            </div>

            <div id="image-content">
              <img
                className="imgTag"
                src={item.postImage}
                key={index}
                alt="PostImage"
              />
            </div>
            <div id="likes-content">
              <i className="fa-regular fa-heart fa-lg"></i>
              <i className="fa-regular fa-paper-plane fa-lg"></i>
              <span className="dateField">{item.date}</span>
            </div>
            <span className="likes">{item.likes} likes</span>
            <div className="desc">
              <b>{item.description}</b>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Postview;
