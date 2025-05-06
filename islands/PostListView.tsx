import { useSignal } from "@preact/signals";
import { Post } from "../routes/index.tsx";
import { PostCardGrid } from "../components/PostCardGrid.tsx";
import { PostCardList } from "../components/PostCardList.tsx";
import { ToggleView } from "../components/ToggleView.tsx";

type Props = {
  posts: Post[];
};

export default function PostListView({ posts }: Props) {
  const isGrid = useSignal(false);

  return (
    <div>
      <ToggleView isGrid={isGrid} />
      {isGrid.value ? (
        <PostCardGrid posts={posts} />
      ) : (
        <PostCardList posts={posts} />
      )}
    </div>
  );
}