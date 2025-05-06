import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";

type Comment = {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
};

type Post = {
  _id: string;
  title: string;
  author: string;
  content: string;
  likes: number;
  cover: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type PostResponse = {
  success: boolean;
  data: Post;
};

export type Data = {
  post: Post;
};

export const handler: Handlers<Data> = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const { id } = ctx.params;
    const response = await axios.get<PostResponse>(
      `https://back-p5-y0e1.onrender.com/api/posts/${id}`
    );
    return ctx.render({ post: response.data.data });
  },

  POST: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const { id } = ctx.params;
    await axios.post(`https://back-p5-y0e1.onrender.com/api/post/${id}/like`);
    
    // Revalidar la página tras un "Me gusta" exitoso para mostrar el nuevo conteo
    return ctx.render();
  },
};

export default function Page(props: PageProps<Data>) {
  // Función que maneja el "Me gusta"
  const handleLike = async () => {
    try {
      // Enviar la petición POST para "Me gusta"
      await axios.post(`https://back-p5-y0e1.onrender.com/api/post/${props.data.post._id}/like`);
      
      // Revalidar o recargar la página después de la respuesta
      window.location.reload();
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  return (
    <div>
      <h1>{props.data.post.author}</h1>
      <h2>{props.data.post.title}</h2>
      <img src={props.data.post.cover} alt="cover" />
      <p>{props.data.post.content}</p>

      <h3>Likes: {props.data.post.likes}</h3>

      <button onClick={handleLike}>Me gusta</button>

      <h3>Comentarios:</h3>
      <ul>
        {props.data.post.comments.map((comment, i) => (
          <li key={i}>
            <strong>{comment.author}</strong>: {comment.content}
            <br />
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}