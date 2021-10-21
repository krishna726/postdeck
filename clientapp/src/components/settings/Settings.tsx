import { Button, Card, CardActions, CardMedia } from "@mui/material";
import React, { Fragment } from "react";
import { CustomDialog } from "../dialog/CustomDialog";
import { FacebookAuth } from "../social/FacebookAuth";
import { InstagramAuth } from "../social/InstagramAuth";

export const Settings = () => {
    const fbImage = "/assets/facebook.png";
    const instaImage = "/assets/instagram.png";
    const [isOpen, setIsOpen] = React.useState(false);
    const [authType, setAuthType] = React.useState(<Fragment />);

    const onCloseDialog = () => {
        setIsOpen(!isOpen);
    }

    const onClickCard = (type: string) => {
        let returnValue = <div></div>;
        switch (type) {
            case "FB":
                returnValue = (
                    <FacebookAuth />
                )
                break;
            case "Insta":
                returnValue = (
                    <InstagramAuth />
                )
                break;
            default:
                break;
        }
        setAuthType(<div>{returnValue}</div>)
        setIsOpen(true);
    }

    return(
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    className="card-img"
                    component="img"
                    height="80"
                    image={fbImage}
                    alt="fb"
                />
                <CardActions className="card-link">
                    <Button onClick={() => onClickCard('FB')}>
                        Open Facebook
                    </Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    className="card-img"
                    component="img"
                    height="80"
                    image={instaImage}
                    alt="fb"
                />
                <CardActions className="card-link">
                    <Button onClick={() => onClickCard('Insta')}>
                        Open Instagram
                    </Button>
                </CardActions>
            </Card>
            <CustomDialog isOpen={isOpen} onClose={onCloseDialog}>
                {authType}
            </CustomDialog>
        </div>
    )
}