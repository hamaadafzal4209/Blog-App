import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function BlogCard({ post }) {
  // Function to truncate the summary
  const truncateSummary = (summary, maxLength) => {
    if (summary.length > maxLength) {
      return summary.substring(0, maxLength) + '...'; // Add ellipsis if truncated
    }
    return summary;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className='h-72 sm:h-80 overflow-hidden'>
        <Link to={`/post/${post._id}`}>
          <img className="rounded-t-lg h-full w-full object-cover object-top" src={`http://localhost:4000/${post.cover}`} alt={post.title} />
        </Link>
      </div>
      <div className="p-5 text-gray-600 italic">
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</p>
        <div className="flex items-center gap-2">
          <a href="#" className="author">{post.author.username}</a>
          <time>{format(new Date(post.createdAt), 'MMM d, yyyy, HH:mm')}</time>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{truncateSummary(post.summary, 100)}</p>
      </div>
    </div>
  );
}

export default BlogCard;
