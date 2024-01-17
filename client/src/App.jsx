import { Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import AddPost from "./pages/AddPost";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";
import User from "./pages/User";
import "./App.css";

const App = () => {
  return (
    <>
      <div>
        <div className="linkContainer">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/post">Posts</Link>
          <Link to="/add-post">Add Posts</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post" element={<Post />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
