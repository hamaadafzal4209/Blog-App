import { format } from 'date-fns';

function BlogCard({ post }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <img className="rounded-t-lg" src={post.cover} alt="" />
      </div>
      <div className="p-5">
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</p>
        <div className="flex items-center gap-2">
          <a href="" className="author">{post.author.username}</a>
          <time>{format(new Date(post.createdAt), 'MMM d, yyyy, HH:mm')}</time>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.summary}</p>
      </div>
    </div>
  );
}

export default BlogCard;
