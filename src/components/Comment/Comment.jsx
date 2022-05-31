import React from "react";
import { Comment, Header } from 'semantic-ui-react';
import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";

export default function CommentComponent({fridge}) {

    return (
        <Comment.Group size="small">
        <Comment>
            <Comment.Content>
                timestamp - username said: text
            </Comment.Content>
        </Comment>
        <AddCommentForm />
        </Comment.Group>
    )
}