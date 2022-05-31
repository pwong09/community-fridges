import React from "react";
import { Comment, Button, Icon } from 'semantic-ui-react';
import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";

export default function CommentComponent({user, fridge, handleAddComment, handleDeleteComment}) {
    //console.log(fridge)
    const list = fridge.comments.map((comment, index) => {
        
        let clickHandler = null;
        if (user) {
            clickHandler = comment.user === user._id ? () => handleDeleteComment(fridge, comment._id) : null;
        }

        return (
        <Comment key={index}>
                <Comment.Content>
                    {comment.createdAt.slice(0,10)} <strong>{comment.username}</strong> said: 
                    {comment.comment}
                    <Icon name='trash' onClick={clickHandler} />
                </Comment.Content>
        </Comment>
        )
    })

    return (
        <Comment.Group size="small">
        {list}
        <AddCommentForm
            handleAddComment={handleAddComment}
            fridge={fridge}
        />
        </Comment.Group>
    )
}