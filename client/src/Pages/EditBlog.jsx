import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];

function EditBlog() {
    const { id } = useParams();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [files, setFiles] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        // Fetch blog details based on id
        fetch(`http://localhost:4000/post/${id}`)
            .then((response) => response.json())
            .then((blogdetails) => {
                setTitle(blogdetails.title);
                setSummary(blogdetails.summary);
                setContent(blogdetails.content);
            })
            .catch((error) => console.error("Error fetching blog details:", error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        if (files) {
            data.set("file", files[0]);
        }

        try {
            const response = await fetch(`http://localhost:4000/post/${id}`, {
                method: "PUT",
                body: data,
                credentials: 'include',
            });

            if (response.ok) {
                history.push(`/post/${id}`);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Failed to update post");
        }
    };

    return (
        <div className="px-4 sm:px-10 md:px-16 lg:px-20 py-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    className="border-2 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="border-2 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Summary"
                    name="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                <input
                    type="file"
                    id="files"
                    onChange={(e) => setFiles(e.target.files)}
                    className="border-2 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-700 cursor-pointer"
                />
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    formats={formats}
                    modules={modules}
                    className="border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none text-white font-medium rounded-lg py-2.5 text-sm"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
}

export default EditBlog;
