import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import PostListView from "../islands/PostListView.tsx";

export type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  cover: string;
  likes: number;
};

export type Data = {
  posts: Post[];
};

export const handler: Handlers<Data> = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const response = await axios.get("https://back-p5-y0e1.onrender.com/api/posts/");
    const posts:Post[] = response.data.data.posts;
    return ctx.render({ posts });
  },
};

export default function Page(props: PageProps<Data>) {
  return (
    <div>
      <h1>Listado de Posts</h1>
      <PostListView posts={props.data.posts} />
    </div>
  );
}