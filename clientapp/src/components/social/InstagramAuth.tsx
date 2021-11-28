import { Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useInitFbSDK } from '../Auth/fb-hook';


export const InstagramAuth = () => {
  const isFb = useInitFbSDK();

  const [imageUrl, setImageUrl] = useState("");
  const [postCaption, setPostCaption] = useState("");
  const [isSharingPost, setIsSharingPost] = useState(false);
  const [fbUserAccessToken, setFbUserAccessToken] = useState("");

  // Checks if the user is logged in to Facebook
  useEffect(() => {
    if (isFb) {
      (window as any).FB.getLoginStatus((response: any) => {
        setFbUserAccessToken(response.authResponse?.accessToken);
      });
    }
  }, [isFb]);


  /* --------------------------------------------------------
 *                      FACEBOOK LOGIN
 * --------------------------------------------------------
 */

  const logInToFB = React.useCallback(() => {
    (window as any).FB.login((response: any) => {
      setFbUserAccessToken(response.authResponse.accessToken);
    },
      {
        // Scopes that allow us to publish content to Instagram
        scope: "instagram_basic,pages_show_list",
      });
  }, []);

  const logOutOfFB = () => {
    (window as any).FB.logout(() => {
      setFbUserAccessToken("");
    });
  };

  /* --------------------------------------------------------
 *             INSTAGRAM AND FACEBOOK GRAPH APIs
 * --------------------------------------------------------
 */

  const getFacebookPages = () => {
    return new Promise((resolve) => {
      (window as any).FB.api(
        "me/accounts",
        { access_token: fbUserAccessToken },
        (response: any) => {
          resolve(response.data);
        }
      );
    });
  };

  const getInstagramAccountId = (facebookPageId: any) => {
    return new Promise((resolve) => {
      (window as any).FB.api(
        facebookPageId,
        {
          access_token: fbUserAccessToken,
          fields: "instagram_business_account,id,username",
        },
        (response: any) => {
          resolve(response.instagram_business_account.id);
        }
      );
    });
  };

  const createMediaObjectContainer = (instagramAccountId: any) => {
    return new Promise((resolve) => {
      (window as any).FB.api(
        `${instagramAccountId}/media`,
        "POST",
        {
          access_token: fbUserAccessToken,
          image_url: imageUrl,
          caption: postCaption,
        },
        (response: any) => {
          resolve(response.id);
        }
      );
    });
  };

  const publishMediaObjectContainer = (
    instagramAccountId: any,
    mediaObjectContainerId: any
  ) => {
    return new Promise((resolve) => {
      (window as any).FB.api(
        `${instagramAccountId}/media_publish`,
        "POST",
        {
          access_token: fbUserAccessToken,
          creation_id: mediaObjectContainerId,
        },
        (response: any) => {
          resolve(response.id);
        }
      );
    });
  };

  const shareInstagramPost = async () => {
    setIsSharingPost(true);
    const facebookPages: any = await getFacebookPages();
    const instagramAccountId = await getInstagramAccountId(facebookPages[0].id);
    const mediaObjectContainerId = await createMediaObjectContainer(
      instagramAccountId
    );

    await publishMediaObjectContainer(
      instagramAccountId,
      mediaObjectContainerId
    );

    setIsSharingPost(false);

    // Reset the form state
    setImageUrl("");
    setPostCaption("");
  };

  return (
    <div>
      {fbUserAccessToken ? (
        <section className="app-section">
          <Typography id="transition-modal-title" variant="h6" component="h2" margin="normal">
            Post to Instagram
          </Typography>
          <Button id="outlined-basic" variant="outlined">
            <input id="outlined-basic"
              value={imageUrl}
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Upload an Image" hidden
            />
          </Button>
          <br />
          <TextField id="outlined-basic" label="Write Caption" variant="outlined"
            value={postCaption}
            onChange={(e) => setPostCaption(e.target.value)} margin="normal"
          />
          {fbUserAccessToken && (
            <Button onClick={logOutOfFB}>
              Log out
            </Button>
          )}
          <br />
          <Button variant="outlined"
            onClick={shareInstagramPost}
            className="btn action-btn"
            disabled={isSharingPost || !imageUrl}
          >
            {isSharingPost ? "Sharing..." : "Share"}
          </Button>
        </section>
      ) : (
        <div>
          <Button onClick={logInToFB}>
            Log in
          </Button>
        </div>
      )}
    </div>
  )
}