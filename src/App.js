
import './App.css';
import Navbar from './Components/Header/Navbar';
import CreateUser from './Components/UserCreation/createUser';
import UserCreationUtility from './Components/UserCreation/UserCreationUtility';
import UpdateUser from "./Components/UserCreation/CustomViewModal/UpdateUser"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/createuser" element={<CreateUser />} />
          <Route exact path="/" element={<UserCreationUtility />} />
          <Route exact path="/edit/:id" element={<UpdateUser />} />
      
        </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
