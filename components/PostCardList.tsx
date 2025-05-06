import { Post } from "../routes/index.tsx";

type Props = {
  posts: Post[];
};

export const PostCardList = ({ posts }: Props) => (
  <div class="space-y-4">
    {posts.map((post) => (
      <div key={post._id} class="border p-4 rounded shadow">
        <h2 class="text-xl font-semibold">{post.title}</h2>
        <p class="text-gray-600">Autor: {post.author}</p>
        <p> Likes: {post.likes}</p>
      </div>
    ))}
  </div>
);
