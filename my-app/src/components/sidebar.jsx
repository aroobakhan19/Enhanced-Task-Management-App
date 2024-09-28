// sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { Axios } from "axios";
import { useState } from "react";
export const Side = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    { title: "All tasks",
       link: "/" },
    { title: "Important tasks",
       link: "/Importanttask" },
    { title: "Completed tasks",
       link: "/CompletedTask" },
    { title: "Incomplete tasks",
       link: "/Incompletetask" },
  ];
  const [Data,getdata]=useState();
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear('id');
    localStorage.clear('token');
    history('/signup');
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        { headers }
      );
  
      setData(response.data.data);
    };
  
    fetch();
  }, []);
  return (
    <div className="flex flex-col justify-between mt-3 p-3">
      {Data &&(
          <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}
    
      <div>
        {data.map((item, i) => (
          <Link to={item.link} key={i} className="my-3 text-white flex item-center">
            {item.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-400 w-full p-2 rounded" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};
