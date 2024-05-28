import { useState } from "react";
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

function Create() {
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [content, setContent] = useState();

  return (
    <div className="px-4 sm:px-10 md:px-16 lg:px-20 py-12">
      <form action="" className="flex flex-col gap-4">
        <input
          className="border-2 border-black/70 px-3 py-2 rounded-md focus:outline-none"
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border-2 border-black/70 px-3 py-2 rounded-md focus:outline-none"
          type="text"
          placeholder="summary"
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          id="file"
          className="border-2 border-black/70 px-3 py-2 rounded-md focus:outline-none mt-1 block w-full text-sm text-gray-900 cursor-pointer"
        />
        <ReactQuill
          value={content}
          onChange={(newValue) => setContent(newValue)}
          formats={formats}
          modules={modules}
        />
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Blue
        </button>
      </form>
    </div>
  );
}

export default Create;
