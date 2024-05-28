import { formatISO9075 } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogDetails() {
    const [blogDetail, setBlogDetail] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then((response) => response.json())
            .then((blogdetails) => setBlogDetail(blogdetails))
            .catch((error) => console.error("Error fetching blog details:", error));
    }, [id]);

    if (!blogDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-2">{blogDetail.title}</h2>
            <p className="text-center text-xs text-gray-600">{formatISO9075(new Date(blogDetail.createdAt))}</p>
            <p className="text-center text-sm font-bold pt-1 pb-3">by {blogDetail.author.username}</p>
            <div className="max-h-80 overflow-hidden rounded-lg mb-4">
                <img src={`http://localhost:4000/${blogDetail.cover}`} alt={blogDetail.title} className=" mb-4 object-cover" />
            </div>
            <p className="text-gray-700 mb-4">{blogDetail.summary}</p>
            <div dangerouslySetInnerHTML={{ __html: blogDetail.content }} className="text-gray-800" />
        </div>
    );
}

export default BlogDetails;
