import { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";

function Home() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  }, []);

  return (
    <div className="px-4 sm:px-10 md:px-16 lg:px-20 py-12">
      <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 && posts.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
