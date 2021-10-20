import { Button, Card, CardActions, CardMedia, Modal, Backdrop, Box, Fade, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useInitFbSDK } from '../Auth/fb-hook';

export const InstagramAuth = () => {
    const image = "/assets/instagram.png";
    const isFb = useInitFbSDK();

    const [imageUrl, setImageUrl] = useState("");
    const [postCaption, setPostCaption] = useState("");
    const [isSharingPost, setIsSharingPost] = useState(false);
    const [fbUserAccessToken, setFbUserAccessToken] = useState("");

    //Modal handling
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    // Checks if the user is logged in to Facebook
    useEffect(() => {
        if (isFb) {
            (window as any).FB.getLoginStatus((response:any) => {
            setFbUserAccessToken(response.authResponse?.accessToken);
        });
        }
    }, [isFb]);


    /* --------------------------------------------------------
   *                      FACEBOOK LOGIN
   * --------------------------------------------------------
   */

    // Check if the user is authenticated with Facebook
    useEffect(() => {
      if (isFb) {
        (window as any).FB.getLoginStatus((response:any) => {
        setFbUserAccessToken(response.authResponse?.accessToken);
        });
      }
    }, [isFb]);


    const logInToFB = React.useCallback(() => {
        (window as any).FB.login((response:any) => {
        setFbUserAccessToken(response.authResponse.accessToken);
        },
        {
            // Scopes that allow us to publish content to Instagram
            scope: "instagram_basic,pages_show_list",
        });

        //Open our modal with post form
        handleOpen();
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
            (response:any) => {
            resolve(response.data);
            }
        );
        });
    };

    const getInstagramAccountId = (facebookPageId:any) => {
        return new Promise((resolve) => {
        (window as any).FB.api(
            facebookPageId,
            {
              access_token: fbUserAccessToken,
              fields: "instagram_business_account,id,username",
            },
            (response:any) => {
              resolve(response.instagram_business_account.id);
            }
          );
        });
    };

    const createMediaObjectContainer = (instagramAccountId:any) => {
        return new Promise((resolve) => {
        (window as any).FB.api(
            `${instagramAccountId}/media`,
            "POST",
            {
              access_token: fbUserAccessToken,
              image_url: imageUrl,
              caption: postCaption,
            },
            (response:any) => {
              resolve(response.id);
            }
          );
        });
    };

    const publishMediaObjectContainer = (
        instagramAccountId:any,
        mediaObjectContainerId:any
      ) => {
        return new Promise((resolve) => {
        (window as any).FB.api(
            `${instagramAccountId}/media_publish`,
            "POST",
            {
              access_token: fbUserAccessToken,
              creation_id: mediaObjectContainerId,
            },
            (response:any) => {
              resolve(response.id);
            }
          );
        });
    };

    const shareInstagramPost = async () => {
      setIsSharingPost(true);
      const facebookPages:any = await getFacebookPages();
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
    
    return(
        <div>
        {fbUserAccessToken ? (
          <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          >
            <Fade in={open}>
              <Box component="form" sx={style} noValidate autoComplete="off">
                <section className="app-section">
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    <input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </Typography>
                  <br />
                  <TextField id="outlined-basic" label="Write Caption" variant="outlined"
                    value={postCaption}
                    onChange={(e) => setPostCaption(e.target.value)} margin="normal"
                  />
                  <br />
                  <Button variant="outlined"
                    onClick={shareInstagramPost}
                    className="btn action-btn"
                    disabled={isSharingPost || !imageUrl}
                  >
                    {isSharingPost ? "Sharing..." : "Share"}
                  </Button>
                </section>
              </Box>
            </Fade>
          </Modal>
        ) : null }
        
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
            Log out of Facebook
            </Button>
          ) : (
            <Button onClick={logInToFB}>
            Login with Facebook
            </Button>
          )}
          </CardActions>
        </Card>
            
        </div>
    )
}