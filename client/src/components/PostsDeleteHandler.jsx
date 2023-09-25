import React from 'react';

const PostsDeleteHandler = ({ token, posts, setPosts, replies, setReplies }) => {

    const handleDeletePost = async (postId) => {
        try {
            await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleDeleteReply = async (replyId) => {
        try {
          await fetch(`/api/replies/${replyId}`, {
            method: 'DELETE',
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
  
          setReplies(replies.filter((reply) => reply.id !== replyId));
        } catch (error) {
          console.error('Error deleting reply:', error);
        }
      };

    return (
        <div>
            <h2>Delete Posts:</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <p>{post.title}</p>
                    <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                </div>
            ))}

            <h2>Delete Replies:</h2>
            {replies.map((reply) => (
                <div key={reply.id}>
                    <p>{reply.text}</p>
                    <button onClick={() => handleDeleteReply(reply.id)}>Delete Reply</button>
                </div>
            ))}
        </div>
    );
};

export default PostsDeleteHandler;
