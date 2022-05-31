import React from "react";
import { Comment } from 'semantic-ui-react';
import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";

export default function CommentComponent({fridge, handleAddComment}) {
    //console.log(fridge)
    const list = fridge.comments.map((comment, index) => {
        
        return (
        <Comment key={index}>
                <Comment.Content>
                    {comment.username} said: {comment.comment}
                </Comment.Content>
        </Comment>
        )
    })

    return (
        <Comment.Group size="small">
        <Comment>
            <Comment.Content>
                timestamp - username said: text
            </Comment.Content>
        </Comment>
        {list}
        <AddCommentForm
            handleAddComment={handleAddComment}
            fridge={fridge}
        />
        </Comment.Group>
    )
}