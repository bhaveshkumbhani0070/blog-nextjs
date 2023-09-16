"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const BlogCard = ({
  blog: { title, desc, imageUrl, likes, authorId, _id },
}) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [blogLikes, setBlogLikes] = useState(0);

  useEffect(() => {
    session && likes && setIsLiked(likes.includes(session?.user?._id));
    session && likes && setBlogLikes(likes.length);
  }, [likes, session]);

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/blog/${_id}/like`, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "PUT",
      });

      console.log(res);
      if (res.ok) {
        if (isLiked) {
          setIsLiked((prev) => !prev);
          setBlogLikes((prev) => prev - 1);
        } else {
          setIsLiked((prev) => !prev);
          setBlogLikes((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl dark:bg-gray-800">
      <div className="">
        <Link href={`/blog/${_id}`}>
          <img
            src={imageUrl}
            width="100%"
            height="100%"
            className="rounded-tl-lg rounded-tr-lg hover:opacity-75 transition-opacity duration-300"
          />
        </Link>
        <div className="p-4">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{desc}</p>
            <span className="text-sm mt-2">
              Created By: <span className="font-semibold">1th of January</span>
            </span>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-lg font-semibold">{blogLikes}</span>{" "}
            {isLiked ? (
              <AiFillLike
                onClick={handleLike}
                size={20}
                className="text-blue-500 ml-2 cursor-pointer"
              />
            ) : (
              <AiOutlineLike
                onClick={handleLike}
                size={20}
                className="text-blue-500 ml-2 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
