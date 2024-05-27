import BlogCard from "../Components/BlogCard"

function Home() {
  return (
    <div className="px-4 sm:px-10 md:px-16 lg:px-20 py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  )
}

export default Home
