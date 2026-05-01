// import { Box, Flex, Spinner } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import useShowToast from "../hooks/useShowToast";
// import Post from "../components/Post";
// import { useRecoilState } from "recoil";
// import postsAtom from "../atoms/postsAtom";
// import SuggestedUserss from "../components/SuggestedUserss";

// const HomePage = () => {
//   const showToast = useShowToast();
//   const [posts, setPosts] = useRecoilState(postsAtom);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getFeedPosts = async () => {
//       setLoading(true);
//       setPosts([]);
//       try {
//         const res = await fetch("/api/posts/feed");
//         const data = await res.json();

//         if (data.error) {
//           showToast("Error", data.error, "error");
//           return;
//         }
//         // console.log(data);
//         setPosts(data);
//       } catch (error) {
//         showToast("Error", error.message, "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     getFeedPosts();
//   }, [showToast, setPosts]);
//   return (
//     <Flex gap={10} alignItems={"flex-start"}>
//       <Box flex={75}>
//         {!loading && posts.length === 0 && (
//           <h1>Follow Some Users to see the Posts</h1>
//         )}
//         {loading && (
//           <Flex justify={"center"}>
//             <Spinner size={"xl"} />
//           </Flex>
//         )}
//         {Array.isArray(posts) &&
//           posts.map((post) => (
//             <Post key={post._id} post={post} postedBy={post.postedBy} />
//           ))}
//       </Box>
//       <Box flex={25} display={{ base: "none", md: "block" }}>
//         <SuggestedUserss />
//       </Box>
//     </Flex>
//   );
// };

// export default HomePage;



import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUserss from "../components/SuggestedUserss";
import "./styles/Homepage.css"; // ✅ fixed

/* ─────────────────────────────────────────
   Skeleton Card  (animate-pulse via Tailwind
   + shimmer via CSS for the gradient sweep)
───────────────────────────────────────── */
const SkeletonPost = ({ delay = 0, showImage = false }) => (
  <div
    className="flex gap-3 py-5 border-b border-white/[0.05]"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Avatar circle */}
    <div className="sk-shimmer w-10 h-10 rounded-full shrink-0" />

    {/* Lines */}
    <div className="flex-1 flex flex-col gap-3 pt-1">
      <div className="sk-shimmer h-2.5 w-[30%] rounded-full" />
      <div className="sk-shimmer h-2.5 w-full  rounded-full" />
      <div className="sk-shimmer h-2.5 w-[60%] rounded-full" />

      {showImage && (
        <div className="sk-shimmer h-40 w-full rounded-xl mt-1" />
      )}

      {/* Action row */}
      <div className="flex gap-4 mt-1">
        <div className="sk-shimmer h-2 w-8 rounded-full" />
        <div className="sk-shimmer h-2 w-8 rounded-full" />
        <div className="sk-shimmer h-2 w-8 rounded-full" />
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   Empty State
───────────────────────────────────────── */
const EmptyFeed = () => (
  <div className="post-animate flex flex-col items-center justify-center py-24 px-6 text-center gap-5">
    {/* Icon bubble */}
    <div className="
      w-20 h-20 rounded-full
      bg-emerald-400/10 border border-emerald-400/20
      flex items-center justify-center text-3xl
      shadow-[0_0_40px_rgba(52,211,153,0.12)]
    ">
      🌐
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-syne text-xl font-bold text-slate-100 tracking-tight">
        Your feed is quiet
      </h2>
      <p className="font-dm text-sm text-slate-500 leading-relaxed max-w-[260px]">
        Follow people to fill this space with posts, thoughts, and moments.
      </p>
    </div>

    <a
      href="/explore"
      className="
        font-syne text-[13px] font-semibold tracking-wide
        text-emerald-400
        px-5 py-2.5 rounded-full
        border border-emerald-400/30 bg-emerald-400/10
        hover:bg-emerald-400/20 hover:shadow-[0_0_24px_rgba(52,211,153,0.18)]
        hover:-translate-y-0.5
        transition-all duration-200
        flex items-center gap-2
      "
    >
      ✦ Explore accounts
    </a>
  </div>
);

/* ─────────────────────────────────────────
   HomePage
───────────────────────────────────────── */
const HomePage = () => {
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);

  /* ── Original fetch logic — untouched ── */
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res  = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    /* ── Root: deep dark background ── */
    <div className="font-dm relative min-h-screen bg-[#070b11] overflow-x-hidden pb-20">

      {/* ── Decorative background blobs ── */}
      <div
        className="
          blob pointer-events-none fixed -top-32 -left-32 z-0
          w-[480px] h-[480px] rounded-full
          bg-emerald-500/[0.05] blur-[110px]
        "
      />
      <div
        className="
          blob-2 pointer-events-none fixed bottom-20 -right-24 z-0
          w-[380px] h-[380px] rounded-full
          bg-indigo-500/[0.06] blur-[100px]
        "
      />

      {/* ── Noise grain overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* ── Page content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="flex gap-6 lg:gap-10 items-start">

          {/* ════════════════════════════════
              FEED COLUMN
          ════════════════════════════════ */}
          <div className="flex-1 min-w-0">

            {/* Section label */}
            <div className="
              font-syne flex items-center gap-3
              text-[10px] font-bold tracking-[0.18em] uppercase text-slate-500
              mb-5 pb-3 border-b border-white/[0.06]
            ">
              <span className="
                live-dot w-1.5 h-1.5 rounded-full
                bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]
              " />
              Your Feed
            </div>

            {/* ── Skeleton loaders ── */}
            {loading && (
              <div>
                <SkeletonPost delay={0}   showImage />
                <SkeletonPost delay={90}  />
                <SkeletonPost delay={180} showImage />
                <SkeletonPost delay={270} />
                <SkeletonPost delay={360} />
              </div>
            )}

            {/* ── Empty state ── */}
            {!loading && posts.length === 0 && <EmptyFeed />}

            {/* ── Posts list ── */}
            {!loading && Array.isArray(posts) &&
              posts.map((post, i) => (
                <div
                  key={post._id}
                  className="
                    post-animate
                    border-b border-white/[0.05] last:border-0
                    hover:bg-white/[0.012] transition-colors duration-200
                  "
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  <Post post={post} postedBy={post.postedBy} />
                </div>
              ))
            }
          </div>

          {/* ════════════════════════════════
              SIDEBAR — hidden on mobile
          ════════════════════════════════ */}
          <aside className="hidden md:block w-64 lg:w-72 shrink-0">
            <div className="
              sidebar-animate
              sticky top-6
              rounded-2xl overflow-hidden
              bg-slate-900/70 border border-white/[0.06]
              backdrop-blur-xl
              shadow-[0_0_40px_rgba(52,211,153,0.05),inset_0_1px_0_rgba(255,255,255,0.04)]
            ">
              {/* Sidebar header */}
              <div className="
                font-syne flex items-center gap-2
                text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500
                px-5 py-4 border-b border-white/[0.06]
              ">
                <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.9)]" />
                Suggested for you
              </div>

              {/* Sidebar body */}
              <div className="py-2">
                <SuggestedUserss />
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
