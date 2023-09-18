"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const CreateBlog = () => {
  const CLOUD_NAME = "dkwcs7chj";
  const UPLOAD_PRESET = "ml_default";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Nature");
  const [photo, setPhoto] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="text-red-500">Access Denied</p>;
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setPhoto(selectedFile);

      // Create a preview URL for the selected image
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo || !title || !category || !desc) {
      toast.error("All fields are required");
      return;
    }

    try {
      const imageUrl = await uploadImage();

      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          category,
          imageUrl,
          authorId: session?.user?._id,
        }),
      });

      if (!res.ok) {
        throw new Error("Error occurred");
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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-96">
        <h2 className="text-2xl mb-4">Create Post</h2>
        <form onSubmit={handleSubmit}>
          {/* Image Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full mb-3 rounded-lg"
            />
          )}

          {/* Input for selecting an image */}
          <label
            htmlFor="image"
            className="w-full flex items-center cursor-pointer border border-gray-300 rounded-lg py-2 px-3 mb-3 focus:outline-none focus:ring focus:border-blue-400"
          >
            Upload Image <AiOutlineFileImage className="ml-2" />
          </label>
          <input
            id="image"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          <input
            type="text"
            placeholder="Title..."
            className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-3 focus:outline-none focus:ring focus:border-blue-400"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description..."
            className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-3 focus:outline-none focus:ring focus:border-blue-400"
            onChange={(e) => setDesc(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-3 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="Nature">Nature</option>
            <option value="Mountain">Mountain</option>
            <option value="Ocean">Ocean</option>
            <option value="Wildlife">Wildlife</option>
            <option value="Forest">Forest</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400"
          >
            Create
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateBlog;
