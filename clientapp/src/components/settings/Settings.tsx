import { Button, Card, CardActions, CardMedia } from '@mui/material';
import React from 'react';

export const Settings = () => {
    const image = "/facebook.png";
    return(
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="fb"
                />
                <CardActions>
                    <Button size="small">Authenticate</Button>
                </CardActions>
            </Card>
        </div>
    )
}