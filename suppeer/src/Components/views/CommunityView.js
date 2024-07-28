import React, { useEffect, useState } from "react";
import SecondaryLayout from "../layout/secondaryLayout";
import { Layout } from "../layout";
import About from "../community/about";
import { CreatePostBtn } from "../community/create-post";
import Header from "../community/header";
//import { Posts } from "../components/post/posts";
import { useParams } from "react-router-dom";
import { getCommunityPosts } from "../../api/communities";
import { Stack } from "@chakra-ui/react";
import PostCard from "../Post/PostCard";

export const CommunityView = () => {
  let params = useParams();
  const [posts, setPosts] = useState([]);
  const [community, setCommunity] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");

  const handleSort = (type) => {
    setSortBy(type);
  };

  useEffect(() => {
    getCommunityPosts(params.communityId).then((data) => {
      setCommunity(data);
      if (!data) {
        console.error("Invalid data:", data);
        return;
      }
      let sortedPosts;
      switch (sortBy) {
        case "createdAt":
          sortedPosts = [...data.posts].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        case "likeCount":
          sortedPosts = [...data.posts].sort((a, b) => {
            const alikeCounts = Array.isArray(a.likeCount)
              ? a.likeCount.length
              : 0;
            const blikeCounts = Array.isArray(b.likeCount)
              ? b.likeCount.length
              : 0;
            return blikeCounts - alikeCounts;
          });
          break;
        case "commentCount":
          sortedPosts = [...data.posts].sort((a, b) => {
            const aComments =
              typeof a.commentCount === "number" ? a.commentCount : 0;
            const bComments =
              typeof b.commentCount === "number" ? b.commentCount : 0;
            return bComments - aComments;
          });
          break;
        default:
          sortedPosts = [...data.posts];
      }

      setPosts(sortedPosts);
    });
  }, [params.communityId, sortBy]);

  return (
    <Layout>
      <Header community={community} />
      <SecondaryLayout>
        <>
        <CreatePostBtn handleSort={handleSort} /> 
          <Stack>
            {posts &&
              posts?.map((post, i) => {
                return <PostCard preview="primary" key={post._id} post={post} />;
              })}
          </Stack>
        </>
        <>
          <About community={community} />
        </>
      </SecondaryLayout>
    </Layout>
  );
};
