"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Loading from "@/app/components/loading";
import { assets, dummyPostsData, User, Post } from "@/app/assets/assets";
import StoriesBar from "./StoriesBar";
import PostCard from "./PostCard";
import RecentMessages from "./RecentMessages";

const Feed = () => {
  const [feeds, setFeeds] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData as Post[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      {/* القسم الأيسر */}
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6">
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* الشريط الجانبي الأيمن */}
      <div className="max-xl:hidden sticky top-0">
        <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
          <h3 className="font-semibold text-slate-800">Sponsored</h3>
          <Image
            src={assets.sponsored_img}
            className="w-75 h-50 rounded-md"
            alt=""
          />
          <p className="text-slate-600">Email marketing</p>
          <p className="text-slate-400">ٍSupercharge your marketing with a powerful, easy-to-use platform built for results.</p>
        </div>
        <RecentMessages />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
