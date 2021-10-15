import { Button, Card, CardActions, CardMedia } from '@mui/material';
import React, { useEffect } from 'react';
import { useInitFbSDK } from '../Auth/fb-hook';

export const FacebookAuth = () => {
    const PAGE_ID = "103426328252964";
    const image = "/facebook.png";
    const isFb = useInitFbSDK();
    // App state
    const [fbUserAccessToken, setFbUserAccessToken] = React.useState();
    const [fbPageAccessToken, setFbPageAccessToken] = React.useState();
    const [postText, setPostText] = React.useState("");
    const [isPublishing, setIsPublishing] = React.useState(false);

    // Logs in a Facebook user
    const logInToFB = React.useCallback(() => {
        (window as any).FB.login((response:any) => {
        setFbUserAccessToken(response.authResponse.accessToken);
        });
    }, []);

    // Logs out the current Facebook user
    const logOutOfFB = React.useCallback(() => {
        (window as any).FB.logout(() => {
        setFbUserAccessToken(undefined);
        setFbPageAccessToken(undefined);
        });
    }, []);

    // Checks if the user is logged in to Facebook
    useEffect(() => {
        if (isFb) {
            (window as any).FB.getLoginStatus((response:any) => {
            setFbUserAccessToken(response.authResponse?.accessToken);
        });
        }
    }, [isFb]);

    // Fetches an access token for the page
    useEffect(() => {
        if (fbUserAccessToken) {
        (window as any).FB.api(
            `/${PAGE_ID}?fields=access_token&access_token=${fbUserAccessToken}`,
            ({ access_token }:any) => setFbPageAccessToken(access_token)
        );
        }
    }, [fbUserAccessToken]);

    // Publishes a post on the Facebook page
    const sendPostToPage = React.useCallback(() => {
        setIsPublishing(true);

        (window as any).FB.api(
        `/${PAGE_ID}/feed`,
        "POST",
        {
            message: postText,
            access_token: fbPageAccessToken,
        },
        () => {
            setPostText("");
            setIsPublishing(false);
        }
        );
    }, [postText, fbPageAccessToken]);


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

            {fbUserAccessToken ? (
                <Button onClick={logOutOfFB} className="btn confirm-btn">
                Log out
                </Button>
            ) : (
                <Button onClick={logInToFB} className="btn confirm-btn">
                Login with Facebook
                </Button>
            )}

            {fbPageAccessToken ? (
                <section className="app-section">
                <h3>Write something to the page</h3>
                <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Message..." 
                    disabled={isPublishing}
                />
                <Button
                    onClick={sendPostToPage}
                    className="btn confirm-btn"
                    disabled={!postText || isPublishing}
                >
                    {isPublishing ? "Publishing..." : "Publish"}
                </Button>
                </section>
            ) : (
                <h2 className="placeholder-container">Welcome!</h2>
            )}
        </div>
    )
}