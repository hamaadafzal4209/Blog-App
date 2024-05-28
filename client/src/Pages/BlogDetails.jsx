import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FiEdit } from "react-icons/fi"; 

function BlogDetails() {
    const {userInfo} = useContext(UserContext);
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
            <p className="text-center text-xs text-gray-600">{format(new Date(blogDetail.createdAt), 'MMM d, yyyy, HH:mm')}</p>
            <p className="text-center text-sm font-bold pt-1 pb-3">by {blogDetail.author.username}</p>
            {userInfo.id === blogDetail.author._id && (
                <div className="flex items-center justify-center mb-5 mt-1">
                    <Link
                        to={`/edit/${blogDetail._id}`}
                        className="cursor-pointer font-semibold flex items-center bg-green-600 hover:bg-green-700 rounded-md transition duration-300 text-white px-4 py-2"
                    >
                        <FiEdit className="mr-1" /> Edit this post
                    </Link>
                </div>
            )}
            <div className="max-h-72 overflow-hidden rounded-lg mb-4 w-full">
                <img src={`http://localhost:4000/${blogDetail.cover}`} alt={blogDetail.title} className=" mb-4 h-full w-full object-cover" />
            </div>
            <p className="text-gray-700 mb-4">{blogDetail.summary}</p>
            <div dangerouslySetInnerHTML={{ __html: blogDetail.content }} className="text-gray-800" />
        </div>
    );
}

export default BlogDetails;
