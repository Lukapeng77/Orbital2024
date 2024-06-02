
import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, onVote, onReply }) => {
    return (
        <ul>
            {posts.map(post => (
                <PostItem key={post.id} post={post} onVote={onVote} onReply={onReply} />
            ))}
        </ul>
    );
};

export default PostList;
