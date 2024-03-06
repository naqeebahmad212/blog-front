import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const UseFetch = (url, inputs) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);
  return data;
};

export default UseFetch;
