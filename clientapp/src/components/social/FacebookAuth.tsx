import { Button, Card, CardActions, CardMedia } from '@mui/material';
import React, { useEffect } from 'react';
import { useInitFbSDK } from '../Auth/fb-hook';

export const FacebookAuth = () => {
    const PAGE_ID = process.env.REACT_APP_PAGEID;
    const image = "/assets/facebook.png";
    const isFb = useInitFbSDK();
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
    }, [fbUserAccessToken, PAGE_ID]);

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
    }, [postText, fbPageAccessToken, PAGE_ID]);


    useEffect(()=> {
        if(isFb) {
            console.log('FB success')
        }
    }, [isFb]);
    return(
        <div>
            {fbPageAccessToken ? (
                <section className="app-section">
                <h3>Write something to the page</h3>
                <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Message..." 
                    disabled={isPublishing}
                />
                <input type="file" name="image" ></input>
                <Button
                    onClick={sendPostToPage}
                    className="btn confirm-btn"
                    disabled={!postText || isPublishing}
                >
                    {isPublishing ? "Publishing..." : "Publish"}
                </Button>
                </section>
            ) : (
                <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    className="card-img"
                    component="img"
                    height="80"
                    image={image}
                    alt="fb"
                />
                <CardActions className="card-link">
                {fbUserAccessToken ? (
                    <Button onClick={logOutOfFB}>
                    Log out
                    </Button>
                ) : (
                    <Button onClick={logInToFB} >
                    Login with Facebook
                    </Button>
                )}
                </CardActions>
            </Card>
            )}
        </div>
    )
}