import { useState,useEffect } from "react";
import { Cards } from "../components/cards.jsx";
import { Input } from "../components/inputdata.jsx";
import { IoAddCircleSharp } from "react-icons/io5";
import { Axios } from "axios";
export const AllTask = () =>{
   const [InputDiv,setInputDiv] = useState ("hidden");
   const [Data,getdata]=useState();
   const[updateData , setUpdateData]= useState({
    id :"",title:"",desc :""
   })
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
    return (<div> 
        <div>
            <div className="w-full flex justify-end px-4 py-2">
                <button onClick={() => setInputDiv("fixed")} className="text-4xl text-gray-400"><IoAddCircleSharp /></button>
            </div>
        </div>
         <Cards home={"true"} InputDiv={InputDiv} setInputDiv={setInputDiv} data={Data.tasks} setUpdateData={setUpdateData} />
         <Input  InputDiv={InputDiv} setInputDiv={setInputDiv}  updateData={updateData}/>
    </div>)
}