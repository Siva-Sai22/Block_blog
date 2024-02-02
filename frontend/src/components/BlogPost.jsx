import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../markdownStyles.css";

function BlogPost({ postId }) {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  let dataUrl = "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/blog/${postId}`,
        );
        if (response.ok) {
          const json = await response.json();
          setBlogData(json);
        } else {
          console.error("error");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);
  if (blogData) {
    const blob = new Blob([new Uint8Array(blogData.thumbnail.buffer.data)], {
      type: blogData.thumbnail.mimetype,
    });
    dataUrl = URL.createObjectURL(blob);
  }

  return (
    <>
      {loading && <p className="m-4">Loading...</p>}
      {blogData && (
        <div className="mx-auto my-10 w-[min(100vw,930px)]">
          <h1 className="px-4 text-center text-4xl font-bold">
            {blogData.title}
          </h1>
          <img
            src={dataUrl}
            alt="Thumbnail"
            className="mx-auto mt-4 overflow-hidden rounded-lg"
          />
          <div className="mt-4 text-lg markdown-content">
            <ReactMarkdown>{blogData.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogPost;
