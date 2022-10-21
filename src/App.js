import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./Components/Upload/Upload";
import SignUp from "./Components/Signup/SignUp";
import Login from "./Components/Login/Login";
import State from "./Context/State";
import Alert from "./Components/Alert/Alert";
import ProgressBar from "./Components/Progress/ProgressBar";
function App() {
  return (
    <>
      <State>
        <Router>
          <Navbar />
          <ProgressBar />
          <Alert />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </Router>
      </State>
    </>
  );
}

export default App;
