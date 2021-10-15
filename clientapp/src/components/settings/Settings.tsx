import { Button, Card, CardActions, CardMedia } from '@mui/material';
import { useEffect } from 'react';
import { useInitFbSDK } from '../Auth/fb-hook';

export const Settings = () => {
    const image = "/facebook.png";
    const isFb = useInitFbSDK();

    useEffect(()=> {
        if(isFb) {
            console.log('FB success')
        }
    }, [isFb]);

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