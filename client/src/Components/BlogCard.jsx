import { format } from 'date-fns';

function BlogCard({ post }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <img className="rounded-t-lg" src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
      <div className="p-5">
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</p>
        <div className="flex items-center gap-2">
          <a href="" className="author">Name</a>
          <time>{format(new Date(post.createdAt), 'MMM d, yyyy, HH:mm')}</time>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.summary}</p>
      </div>
    </div>
  );
}

export default BlogCard;
