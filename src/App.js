import Login from "./Authentication/Login";
import Create from "./CRUD/Create";
import SideBar from "./Componets/SideBar";
import { loginContext } from "./Context/LoginContext";
import { useState } from "react";
import Routinng from "./Router/Routinng";


function App() {
  const [data,setData] = useState([])
  const [token,setToken] = useState('')
  return (
    <loginContext.Provider value={{data,setData,token,setToken}}>
      <Routinng />
      </loginContext.Provider>
  );
}

export default App;
