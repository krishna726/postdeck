import { Button, Card, CardActions, CardMedia } from "@mui/material";
import React, { Fragment } from "react";
import { CustomDialog } from "../dialog/CustomDialog";
import { FacebookAuth } from "../social/FacebookAuth";
// import { InstagramAuth } from "../social/InstagramAuth";

export const Settings = () => {
    const image = "/assets/facebook.png";
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
                    <Button onClick={() => onClickCard('FB')}>
                        Open Facebook
                    </Button>
                </CardActions>
            </Card>
            <CustomDialog isOpen={isOpen} onClose={onCloseDialog}>
                {authType}
            </CustomDialog>
            {/* <InstagramAuth /> */}
        </div>
    )
}