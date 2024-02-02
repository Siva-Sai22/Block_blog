import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";

function BlogForm() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const sendBlog = async () => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("content", value);
    formData.append("title",title);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/blog", {
        method: "POST",
        body: formData,
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
        <h2 className="m-4 text-2xl">Create a New Blog</h2>
        <button
          className="mr-7 rounded-lg bg-blue-500 px-4 py-1  text-white"
          onClick={sendBlog}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>

      <label htmlFor="title" className="ml-4 mr-2 text-xl">
        {" "}
        Title:{" "}
      </label>
      <input
        type="text"
        id="title"
        className="rounded-lg border-2 px-2 py-1"
        size={34}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <br />

      <label htmlFor="thumbnail" className="ml-4 mr-2 text-xl">
        Thumbnail:
      </label>
      <div className="relative inline-block mt-4">
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="hidden"
        />
        <label
          htmlFor="thumbnail"
          className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Choose File
        </label>
        <span className="ml-4">{!thumbnail ? "Upload a file":`Uploaded.`}</span>
      </div>

      <div className="m-4 h-[700px]">
        <MDEditor value={value} onChange={setValue} height={700} />
      </div>
    </>
  );
}

export default BlogForm;
