import axios from "axios";

const fetcher = async (url) => {
  const res = await axios.get(url);
  return res.data;
};
export default fetcher;
