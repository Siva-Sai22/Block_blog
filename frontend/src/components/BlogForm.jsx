import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";

function BlogForm() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const sendBlog = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: value }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        navigate(`/blog/${responseData.IpfsHash}`);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="m-4 text-xl">Create a New Blog</h2>
        <button
          className="mr-7 rounded-lg bg-blue-500 px-4 py-1  text-white"
          onClick={sendBlog}
        >
          Publish
        </button>
      </div>
      <div className="m-4 h-[700px]">
        <MDEditor value={value} onChange={setValue} height={700} />
      </div>
    </>
  );
}

export default BlogForm;
