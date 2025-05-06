import { Post } from "../routes/index.tsx";

type Props = {
  posts: Post[];
};

export const PostCardGrid = ({ posts }: Props) => (
  <div class="grid">
    {posts.map((post) => (
      <div key={post._id} class="border rounded shadow p-4">
        <img style="height: 100px; width: 100px;" src={post.cover} alt={post.title} />
        <h2 class="text-lg font-bold">{post.title}</h2>
        <p>Autor: {post.author}</p>
        <p>Likes: {post.likes}</p>
      </div>
    ))}
  </div>
);
