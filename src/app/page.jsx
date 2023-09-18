import BlogCard from "@/components/blogCard/BlogCard";

export async function fetchBlogs() {
  try {
    const res = await fetch(process.env.NEXTAUTH_URL + "/api/blog", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return an empty array or handle the error as needed
  }
}

export default async function Home() {
  try {
    const blogs = await fetchBlogs();
    return (
      <div className="container mx-auto px-4 py-8">
        {blogs.length > 0 && (
          <h2 className="text-2xl font-bold mb-4">Blog page</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <h3 className="text-xl">No blogs are currently available</h3>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering the Home component:", error);
    // Handle the error gracefully or display an error message to the user
    return <div>Error loading blogs. Please try again later.</div>;
  }
}
