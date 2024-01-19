import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <img className="heroImage" src="./images/dive.webp " alt="dive" />
      <div className="heroText">
        <h1 className="createPost">Create your post!!</h1>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ea rem
          et soluta nostrum maiores ut corrupti nemo dolorum facilis, numquam,
          fugit ipsa. Dicta tempora libero dolor maiores reiciendis modi!
        </p>
      </div>
      <div className="circle"></div>
    </div>
  );
};

export default Home;
