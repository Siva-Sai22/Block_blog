import { useEffect, useState } from "react";

function BlogPost({ postId }) {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && !blogData && <p>Not found</p>}
      {!loading && blogData && <p>{blogData.content}</p>}
    </>
  );
}

export default BlogPost;
