import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "./contexts/authContext";

const Post = () => {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/blogs/${id}`)
      .then((res) => {
        // console.log(res.data)
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [`http://localhost:3001/blogs/${id}`]);

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:3001/blogs/${id}`)
      .then((res) => {
        if (res.data === "deleted") {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button
        onClick={deleteHandler}
        className="btn btn-secondary postiion-absolute"
      >
        Edit
      </button>
      <img
        style={{ width: "200px" }}
        src={post.image && `${server}/uploads/` + post.image}
        alt=""
      />
      <h2>{post && post.title}</h2>

      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  );
};

export default Post;
