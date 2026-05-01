// 



import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Actions from "../components/Actions";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useEffect } from "react";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import Comment from "../components/Comment";
import postsAtom from "../atoms/postsAtom";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const currentPost = posts[0];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
        console.log(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are You sure want to delete this post?.")) return;
      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.message, "error");
        return;
      }
      showToast("Success", "Post Deleted Successfully 😁", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  // ✅ FIXED: was (!user && loading) — crashed when loading done but user still null
  if (!user || loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Spinner size="xl" color="green.400" thickness="3px" />
      </div>
    );
  }

  // ✅ FIXED: guard if post not loaded yet
  if (!currentPost) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* ── Post header ── */}
      <div className="flex items-center justify-between mb-4">

        {/* Left: avatar + username */}
        <div className="flex items-center gap-3">
          <Avatar
            src={user.profilePic}
            size="md"
            name={user.username}
            className="ring-2 ring-emerald-400/20"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-100 font-syne">
              {user.username}
            </span>
            <Image src="/verified.png" w="4" h="4" />
          </div>
        </div>

        {/* Right: timestamp + delete */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </span>
          {currentUser?._id === user._id && (
            <button
              onClick={handleDeletePost}
              className="
                p-2 rounded-lg text-slate-500
                hover:text-red-400 hover:bg-red-400/10
                transition-all duration-200
              "
              title="Delete post"
            >
              <DeleteIcon boxSize={4} />
            </button>
          )}
        </div>
      </div>

      {/* ── Post text ── */}
      <p className="text-slate-200 text-sm leading-relaxed mb-4 font-dm">
        {currentPost.text}
      </p>

      {/* ── Post image ── */}
      {currentPost.img && (
        <div className="
          rounded-xl overflow-hidden mb-4
          border border-white/[0.07]
          shadow-[0_4px_24px_rgba(0,0,0,0.4)]
        ">
          <Image
            src={currentPost.img}
            w="full"
            className="object-cover max-h-[500px] w-full"
          />
        </div>
      )}

      {/* ── Actions (like, comment, share) ── */}
      <div className="flex gap-3 my-3">
        <Actions post={currentPost} />
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/[0.06] my-4" />

      {/* ── App promo banner ── */}
      <div className="
        flex items-center justify-between
        px-4 py-3 rounded-xl
        bg-slate-900/60 border border-white/[0.06]
        backdrop-blur-md
      ">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👏</span>
          <span className="text-xs text-slate-400 font-dm">
            Get the app to like, reply and post.
          </span>
        </div>
        <button className="
          font-syne text-xs font-bold tracking-wide
          px-4 py-1.5 rounded-full
          bg-emerald-400/10 border border-emerald-400/25 text-emerald-400
          hover:bg-emerald-400/20 hover:shadow-[0_0_16px_rgba(52,211,153,0.2)]
          transition-all duration-200
        ">
          Get
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/[0.06] my-4" />

      {/* ── Comments ── */}
      <div className="flex flex-col">
        {currentPost.replies.map((reply) => (
          <Comment
            key={reply._id}
            reply={reply}
            lastReply={
              reply._id ===
              currentPost.replies[currentPost.replies.length - 1]._id
            }
          />
        ))}
      </div>

    </div>
  );
};

export default PostPage;
