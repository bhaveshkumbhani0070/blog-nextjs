"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { AiOutlineFileImage } from "react-icons/ai";

const Edit = (ctx) => {
  const CLOUD_NAME = "doojo83ea";
  const UPLOAD_PRESET = "my_blog_project";
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Nature");
  const [photo, setPhoto] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/blog/${ctx.params.id}`
      );
      const blog = await res.json();
      setTitle(blog.title);
      setDesc(blog.desc);
      setCategory(blog.category);
      setImagePreview(blog.imageUrl);
    }
    fetchBlog();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="text-red-500">Access Denied</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || category === "" || desc === "") {
      toast.error("All fields are required");
      return;
    }

    try {
      let imageUrl = null;
      if (photo) {
        imageUrl = await uploadImage();
      }

      const body = {
        title,
        desc,
        category,
      };

      if (imageUrl != null) {
        body.imageUrl = imageUrl;
      }

      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/blog/${ctx.params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          method: "PUT",
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        throw new Error("Error has occurred");
      }

      const blog = await res.json();

      router.push(`/blog/${blog?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!photo) return;

    const formData = new FormData();

    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data["secure_url"];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full mb-3 rounded-lg"
            />
          )}

          <label
            htmlFor="image"
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          >
            Upload Image <AiOutlineFileImage />
          </label>
          <input
            id="image"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <input
            value={title}
            type="text"
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none focus:ring focus:border-blue-400"
          />
          <textarea
            value={desc}
            placeholder="Description..."
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-3 h-32 resize-none focus:outline-none focus:ring focus:border-blue-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="Nature">Nature</option>
            <option value="Mountain">Mountain</option>
            <option value="Ocean">Ocean</option>
            <option value="Wildlife">Wildlife</option>
            <option value="Forest">Forest</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 focus:outline-none focus:ring focus:border-blue-400"
          >
            Edit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Edit;
