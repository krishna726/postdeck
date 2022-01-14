import { ReactElement } from 'react';
import { Dialog, DialogTitle } from '@mui/material';

interface ICustomDialog {
    isOpen: boolean;
    children?: ReactElement;
    onClose: Function;
}

export const CustomDialog = (props: ICustomDialog) => {
    const { onClose, children, isOpen } = props;
    const handleClose = () => {
        onClose();
    }
    return (
        <Dialog onClose={handleClose} open={isOpen}>
            <DialogTitle>Set backup account</DialogTitle>
            {children}
        </Dialog>
    )
}