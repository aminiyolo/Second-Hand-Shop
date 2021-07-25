import axios from "axios";

const fetcher = async (url) =>
  await axios.get(url).then((response) => response.data);
export default fetcher;
