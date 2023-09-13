import React from 'react';

const ProfileDeleteHandler = ({ token, posts, setPosts, onDeletePost}) => {
    const handleDeletePost = async (postId) => {
        try {
        await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
            "Authorization": `Bearer ${token}`
            }
        });

        setPosts(posts.filter((post) => post.id !== token.userId));
        } catch (error) {
        console.error('Error deleting post:', error);
        }
    };

    // const handleDeleteReply = async (replyId) => {
    //   try {
    //     await fetch(`/api/replies/${replyId}`, {
    //       method: 'DELETE',
    //       headers: {
    //         "Authorization": `Bearer ${token}`
    //       }
    //     });

    //     setReplies(replies.filter((reply) => reply.id !== replyId));
    //   } catch (error) {
    //     console.error('Error deleting reply:', error);
    //   }
    // };

    return (
        <div>
            <h2>Delete Posts:</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <p>{post.title}</p>
                    <button onClick={() => onDeletePost(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
    
export default ProfileDeleteHandler;