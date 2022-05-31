import React from "react";
import { Comment } from 'semantic-ui-react';
import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";

export default function CommentComponent({fridge, handleAddComment}) {

    return (
        <Comment.Group size="small">
        <Comment>
            <Comment.Content>
                timestamp - username said: text
            </Comment.Content>
        </Comment>
        <AddCommentForm
            handleAddComment={handleAddComment}
            fridge={fridge}
        />
        </Comment.Group>
    )
}