import React from "react";
import { Button, Form } from 'semantic-ui-react';

export default function AddComment() {
    return (
        <Form reply>
            <Form.Input
                type="text"
            />
            <Button 
                content='Add Reply' 
                primary 
            />
    </Form>
    )
}