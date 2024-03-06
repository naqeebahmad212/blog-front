import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { server } from "./contexts/authContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container  d-flex flex-wrap">
      {posts &&
        posts.map((post) => (
          <div
            className="card mt-5 mx-3  mh-100  "
            style={{ width: "18rem" }}
            key={post._id}
          >
            {/* <img src="/" alt="" /> */}
            <div className="post-image">
              <img
                src={post.image && `${server}/uploads/` + post.image}
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              {/* <div className="post-snippet"> {post.body}</div> */}
              <p className="card-text">
                {new Date(post.createdAt).toDateString()}
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
            <Link to={"blogs/" + post._id} className="btn btn-primary">
              Read more
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Home;
