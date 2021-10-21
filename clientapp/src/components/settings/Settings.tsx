import { Button, Card, CardActions, CardMedia } from "@mui/material";
import React, { Fragment } from "react";
import { useInitFbSDK } from "../Auth/fb-hook";
import { CustomDialog } from "../dialog/CustomDialog";
import { FacebookAuth } from "../social/FacebookAuth";
// import { InstagramAuth } from "../social/InstagramAuth";

export const Settings = () => {
    const image = "/assets/facebook.png";
    const isFb = useInitFbSDK();
    const [fbUserAccessToken, setFbUserAccessToken] = React.useState('');
    const [fbPageAccessToken, setFbPageAccessToken] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const [authType, setAuthType] = React.useState(<Fragment />);

    const onCloseDialog = () => {
        setIsOpen(!isOpen);
    }

    // Logs out the current Facebook user
    const logOutOfFB = React.useCallback(() => {
        if((window as any).FB) {
            (window as any).FB.logout(() => {
                setFbUserAccessToken('');
                setFbPageAccessToken('');
            });
        }
    }, []);

    const updateAccessToken = (token: string) => {
        setFbPageAccessToken(token);
    }

    const updateUserToken = (token: string) => {
        setFbUserAccessToken(token);
    }

    const onClickCard = (type: string) => {
        let returnValue = <div></div>;
        switch (type) {
            case "FB":
                returnValue = (
                    <FacebookAuth
                        fbAccessToken={fbPageAccessToken}
                        updateFbAccessToken={updateAccessToken}
                        fbUserToken={fbUserAccessToken}
                        updateFbUserToken={updateUserToken}
                        isFb={isFb}
                    />
                )
                break;
            case "Insta":
                returnValue = (<div>Insta</div>)
                break;
            default:
                break;
        }
        setAuthType(<div>{returnValue}</div>)
        setIsOpen(true);
    }

    return(
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
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
                    <Button onClick={() => onClickCard('FB')}>
                        Login with Facebook
                    </Button>
                )}
                </CardActions>
            </Card>
            <CustomDialog isOpen={isOpen} onClose={onCloseDialog}>
                {authType}
            </CustomDialog>
            {/* <InstagramAuth /> */}
        </div>
    )
}