const Comment = ({ postId, comments, onAddComment }) => {
    const postComments = comments.filter(c => c.postId === postId);
    
    const handleAddComment = (text) => {
        onAddComment(postId, text);
    };

    return (
        <div>
            {postComments.map(c => <div key={c.commentId}>{c.text}</div>)}
            {/* Add a textbox and button to submit a new comment */}
            {/* Call handleAddComment when a new comment is submitted */}
        </div>
    );
};

