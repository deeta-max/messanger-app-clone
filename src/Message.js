import { Card, CardContent, Typography } from '@material-ui/core';
import React, { forwardRef } from 'react';
import "./Message.css";

const Message = forwardRef(({username, text }, ref) => {
     
    const isUser = username === text.username;

    return (
        <div ref={ref} className={`message ${isUser && "message-user"}`}>
        <Card className={isUser ? "message-user-card" : "message-guest-card"} >
            <CardContent>
                <Typography
                color="white"
                variant="h5"
                component="h2">
                    {!isUser && text.username} {text.text}
                </Typography>
            </CardContent>
        </Card>
        </div>
    );
});

export default Message;
