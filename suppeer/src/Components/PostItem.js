
import React, { useState } from 'react';

const PostItem = ({ post, onVote, onReply }) => {
    const [reply, setReply] = useState('');

    const submitReply = (e) => {
        e.preventDefault();
        onReply(post.id, reply);
        setReply('');
    };

    return (
        <li>
            <div>
                {post.user}: {post.content} (Votes: {post.votes})
                <button onClick={() => onVote(post.id, 1)}>Upvote</button>
                <button onClick={() => onVote(post.id, -1)}>Downvote</button>
            </div>
            {post.replies.map((reply, index) => (
                <div key={index} style={{ marginLeft: '20px' }}>
                    {reply.user}: {reply.content}
                </div>
            ))}
            <form onSubmit={submitReply}>
                <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Reply..." />
                <button type="submit">Submit</button>
            </form>
        </li>
    );
};

export default PostItem;
