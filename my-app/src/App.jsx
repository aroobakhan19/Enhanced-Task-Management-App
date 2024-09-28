// App.jsx
import { BrowserRouter as  Routes, Route, useNavigate } from "react-router-dom";
import { Side } from "./components/sidebar.jsx";

import { AllTask } from "./pages/Alltask.jsx";
import { ImportantTask } from "./pages/Importanttask.jsx";
import { CompletedTask } from "./pages/CompletedTask.jsx";
import { IncompleteTask } from "./pages/Incompletetask.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth.js";

export const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch
useEffect(()=>{
  if(localStorage.getItem("id") && localStorage.getItem("token")){dispatch(authActions.login())}
    
  
  else if(isLoggedIn === false){
    navigate("/signup")
  }
})
  
  return (
   
      <Routes>
        {/* Route for the Signup page without the sidebar */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        {/* Main layout with sidebar */}
        <Route
          path="*"
          element={
            <div className="bg-gray-900 text-white h-screen p-1 flex gap-4">
              <div className="w-1/6 border border-gray-500 rounded p-4">
                <Side />
              </div>
              <div className="w-5/6 border border-gray-500 rounded p-4">
                <Routes>
                  <Route path="/" element={<AllTask />} />
                  <Route path="/Importanttask" element={<ImportantTask />} />
                  <Route path="/CompletedTask" element={<CompletedTask />} />
                  <Route path="/Incompletetask" element={<IncompleteTask />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
   
  );
};
