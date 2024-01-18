import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import AddPost from "./pages/AddPost";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";
import User from "./pages/User";
import "./App.css";

const App = () => {
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post" element={<Post />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
