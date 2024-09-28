import { MdOutlineCancel } from "react-icons/md";


export const Input = ({InputDiv,setInputDiv,updateData}) =>{
    const [Data, setData] = useState({ title: "", desc: "" });

    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`
    };
    
    const change = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const submitData = async () => {
      if (Data.title === "" || Data.desc === "") {
        alert("All fields are required");
      } else {
        await axios.post(
          "http://localhost:1000/api/v2/create-task",
          Data,
          { headers }
        );
        setData({title: "", desc: ""});
        setInputDiv("hidden")
      }
    };

return  <div> 
    <div className={`${InputDiv}  top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
<div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
    <div className=" w-3/6 bg-gray-600 p-4 rounded ">
    <div className="flex justify-end text-xl">
        <button onClick={() => setInputDiv("hidden")} className="text-xl"><MdOutlineCancel /></button>
        </div>
    <input type="text" placeholder="title" name="title" className="px-3 py-2 w-full rounded bg-gray-800 my-3" value={Data.title} onClick={change}/>
    <textarea name="desc" id="" cols="30" rows="10" placeholder="description" className="px-3 py-2 w-full bg-gray-800 rounded my-3" value={Data.title} onClick={change}></textarea>
    <button className="px-3 py-2 w-full rounded bg-blue-600  text-black text-2xl" onClick={submitData}>submit</button>
    </div>
</div>
</div>

 }