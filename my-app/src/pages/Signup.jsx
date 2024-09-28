 import { password } from "bun"
 import axios, { Axios } from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
export const Signup = () =>{
const history = useNavigate();
const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn)
if (isLoggedIn) {
    history('/');
   
  }
    const change = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const Submit = async () => {
        try {
            if (Data.username === "" || Data.email === "" || Data.password === "") {
                alert("All fields are required");
              } else {
                const response = await axios.post("http:localhost:3000/api/v1/sign-in",Data);
                setData({username :"", email:"", password:""})
                alert(response.data.message)
               
              }
        } catch (error) {
            console.log(error.response.data.message);
        }
      
    };

    return <div className="h-screen flex items-center justify-center bg-gray-600">
        <div className="p-4 w-2/6 rounded bg-gray-800">
<div className=" text-3xl text-white font-semibold justify-center">signup</div>
<input type="username" name="username"
placeholder="UserName" className="bg-gray-700 w-full px-2 py-3 my-3 rounded" onChange={change} value={Data.username} />

<input type="email" name="email"
placeholder="xyz@gmail.com" className="bg-gray-700 w-full px-2 py-3 my-3 rounded"onChange={change} value={Data.email} />

<input type="password" name="password"
placeholder="Password" className="bg-gray-700 w-full px-2 py-3 my-3 rounded"onChange={change} value={Data.password} />
<div className="w-full flex items- center justify-between"> <button className=" bg-blue-600  font-semibold text-white px-3 py-2 rounded" onClick={Submit}>SignUp</button>
<Link to="/Login" className=" text-white"> Already having an account? Login here</Link>
</div>
        </div>
    </div>
    
}