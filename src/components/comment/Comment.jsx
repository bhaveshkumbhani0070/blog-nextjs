import React from "react";
import { useSession } from "next-auth/react";
import { format } from "timeago.js";
import { BsTrash } from "react-icons/bs";

const Comment = ({ comment, setComments }) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const handleDeleteComment = async () => {
    try {
      // Make the API request to delete the comment
      const response = await fetch(`/api/comment/${comment?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });

      if (response.ok) {
        // If the delete operation is successful, update the comments state
        setComments((prevComments) =>
          prevComments.filter((c) => c?._id !== comment?._id)
        );
      } else {
        console.error("Failed to delete comment:", response.status);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-2">
      <div className="flex items-center space-x-2">
        <img
          src="/person.jpeg"
          width="45"
          height="45"
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="text-lg font-semibold">
            {comment?.authorId?.username}
          </h4>
          <span className="text-gray-600 text-sm">
            {format(comment?.createdAt)}
          </span>
        </div>
        <span className="ml-2">{comment?.text}</span>
      </div>
      {session?.user?._id === comment?.authorId?._id && (
        <BsTrash
          onClick={handleDeleteComment}
          className="text-red-500 cursor-pointer hover:text-red-600"
        />
      )}
    </div>
  );
};

export default Comment;
