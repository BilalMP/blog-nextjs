import Blog from "@/components/blog-overview"

const getAllBlogs = async () => {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/read-blogs", {
      method: "GET",
      cache: "no-cache"
    })
    const result = await apiResponse.json()
    return result?.blogs
  } catch (error) {
    throw new Error(error)
  }
}

const BlogsPage = async () => {
  const blogsList = await getAllBlogs()
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-600 min-h-screen">
      <div className="px-10 py-10">
        <header className="text-3xl font-bold">Blogs</header>
        <Blog blogsList={blogsList} />
      </div>
    </div>
  )
}

export default BlogsPage