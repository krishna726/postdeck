import { Button } from '@mui/material';
import React, { useEffect } from 'react';

interface IFacebookAuth {
    fbAccessToken: string;
    updateFbAccessToken: Function;
    fbUserToken: string;
    updateFbUserToken: Function;
    isFb: boolean;
}

export const FacebookAuth = (props: IFacebookAuth) => {
    const PAGE_ID = process.env.REACT_APP_PAGEID;
    const isFb = props.isFb;
    const fbPageAccessToken = props.fbAccessToken;
    const setFbPageAccessToken = props.updateFbAccessToken;
    const fbUserAccessToken = props.fbUserToken;
    const setFbUserAccessToken = props.updateFbUserToken;

    const [postText, setPostText] = React.useState("");
    const [isPublishing, setIsPublishing] = React.useState(false);

    // Logs in a Facebook user
    const logInToFB = React.useCallback(() => {
        if((window as any).FB) {
            (window as any).FB.login((response:any) => {
                setFbUserAccessToken(response.authResponse.accessToken || '');
            });
        }
    }, [setFbUserAccessToken]);

    useEffect(() => {
        logInToFB();
    }, [logInToFB]);

    // Checks if the user is logged in to Facebook
    useEffect(() => {
        if (isFb) {
            (window as any).FB.getLoginStatus((response:any) => {
                setFbUserAccessToken(response.authResponse?.accessToken);
            });
        }
    }, [isFb, setFbUserAccessToken]);

    // Fetches an access token for the page
    useEffect(() => {
        if (fbUserAccessToken) {
        (window as any).FB.api(
            `/${PAGE_ID}?fields=access_token&access_token=${fbUserAccessToken}`,
            ({ access_token }:any) => setFbPageAccessToken(access_token)
        );
        }
    }, [fbUserAccessToken, PAGE_ID, setFbPageAccessToken]);

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
                <div>
                    <h1>Missing page access token.</h1>
                </div>
            )}
        </div>
    )
}