import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

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

function Create() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [files, setFiles] = useState(null);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("file", files[0]);

        try {
            const response = await fetch("http://localhost:4000/post", {
                method: "POST",
                body: data,
                credentials: 'include',
            });

            if (response.ok) {
                navigate("/");
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post");
        }
    };

    return (
        <div className="px-4 sm:px-10 md:px-16 lg:px-20 py-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    className="border-2 border-black/70 px-3 py-2 rounded-md focus:outline-none"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="border-2 border-black/70 px-3 py-2 rounded-md focus:outline-none"
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
                    className="border-2 border-black/70 px-3 py-2 rounded-md focus:outline-none mt-1 block w-full text-sm text-gray-900 cursor-pointer"
                />
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    formats={formats}
                    modules={modules}
                    className="mt-1"
                />
                <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}

export default Create;
