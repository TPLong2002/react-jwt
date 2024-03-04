import Table from "./Table";
import axios from "@/services/Axios";
import { useState, useEffect } from "react";
const UserPage = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await axios.get("/user/show", { withCredentials: true });
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container mx-auto pt-5">
      <Table data={data} fetchData={fetchData} />
    </div>
  );
};
export default UserPage;
