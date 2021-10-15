import { FacebookAuth } from "../social/FacebookAuth";
import { InstagramAuth } from "../social/InstagramAuth";

export const Settings = () => {
    return(
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <FacebookAuth />
            <InstagramAuth />
        </div>
    )
}