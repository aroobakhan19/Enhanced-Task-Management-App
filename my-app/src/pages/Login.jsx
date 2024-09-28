import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { authActions } from "../store/auth";
import { useDispatch,useSelector } from "react-redux";
export const Login = () => {
    const [Data, setData] = useState({ username: "",  password: "" });
    const history = useNavigate
    const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn);
    if (isLoggedIn) {
        history('/');
       
      }
    const dispatch = useDispatch()
    const change = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const Submit = async () => {
        try {
            if (Data.username === "" || Data.email === "" || Data.password === "") {
                alert("All fields are required");
              } else {
                const response = await axios.post("http:localhost:3000/api/v1/login-in",Data);
                setData({username :"", email:"", password:""})
              localStorage.setItem("id",response.data.message);
              localStorage.setItem("token", response.data.token);
              dispatch(authActions.login());
              history("/")
              
              }
        } catch (error) {
            console.log(error.response.data.message);
        }
      
    };
    return  <div className="h-screen flex items-center justify-center bg-gray-600">
    <div className="p-4 w-2/6 rounded bg-gray-800">
<div className=" text-3xl text-white font-semibold justify-center">Login</div>
<input type="username" name="username"
placeholder="UserName" className="bg-gray-700 w-full px-2 py-3 my-3 rounded"onChange={change} value={Data.username}  />



<input type="password" name="password"
placeholder="Password" className="bg-gray-700 w-full px-2 py-3 my-3 rounded" onChange={change} value={Data.password}  />
<div className="w-full flex items- center justify-between"> <button className=" bg-blue-600  font-semibold text-white px-3 py-2 rounded" onClick={Submit}>Login</button>
<Link to="/Signup" className=" text-white"> Not having an account? SignUp</Link>
</div>
    </div>
</div>
}