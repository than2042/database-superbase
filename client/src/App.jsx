import { Routes, Route } from "react-router-dom";
import AddPost from "./pages/addpost/AddPost";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import Post from "./pages/post/Post";
import User from "./pages/user/User";
import "./App.css";

const App = () => {
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
