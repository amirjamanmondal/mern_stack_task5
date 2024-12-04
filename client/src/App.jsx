import Home from "./components/pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-[url(http://surl.li/hxvqqh)] bg-no-repeat bg-cover flex justify-start items-center flex-col gap-8 pt-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
