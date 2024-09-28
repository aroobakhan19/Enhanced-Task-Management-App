import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
 
 export const Cards = ({home,setInputDiv,data , setUpdateData}) =>
 {
    
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
      };
      
      const handleCompleteTask = async (id) => {
        try {
          const response = await axios.put(
            `http://localhost:1000/api/v2/update-complete-task/${id}`,
            {},
            { headers }
          );
      
          console.log(response.data.message);
        } catch (error) {
          console.log(error);
        }
      };
      const handleImportant = async (id) => {
        try {
          await axios.put(
            `http://localhost:1000/api/v2/update-imp-task/${id}`,
            {},
            { headers }
          );
        } catch (error) {
          console.log(error);
        }
      };
      const handleUpdate = (id, title, desc) => {
        setInputDiv("fixed");
        setUpdatedData({ id, title, desc });
      };
      const deleteTask = async (id) => {
        try {
          const response = await axios.delete(
            `http://localhost:1000/api/v2/delete-task/${id}`,
            { headers }
          );
      
          console.log(response.data.message);
        } catch (error) {
          console.log(error);
        }
      };

    return <div className=" grid grid-cols-3 p-4 gap-4">
        {data && data.map((items,i) =>
        <div className="bg-gray-400 rounded p-4">
 <div> <h3 className="text-xl font-semibold">{items.title}</h3>
 <p className="my-2 ">{items.desc}</p></div>
 <div className="mt-4 w-full flex">
    <button className={`${items.complete === false?"bg-red-600" :"bg-green-600"}  p-2 rounded`}>{items.complete} onClick={()=>handleCompleteTask(items._id)}</button>
    <div className="text-white  p-2 w-3/6 text-xl flex justify-around">
        <button onClick={()=>handleimportant(items._id)}><CiHeart /></button>
        <button onClick={()=>handleupdate(items._id,items._title,items._desc)}><CiEdit /></button>
        <button onClick={()=>handledelete(items._id)}><MdOutlineDeleteOutline /></button>
    </div>
    </div>
        </div>
       
    
    )}
 {home === "true" && (<button onClick={() => setInputDiv("fixed")} className=" justify-center flex items-center bg-gray-400 rounded p-4">
    <h2 className="m-4 text-2xl">Add More</h2></button>)}

 </div>
    
    
 };
