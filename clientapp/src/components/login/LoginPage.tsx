import React, { ChangeEvent, useState } from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { actions } from '../interface-enums';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState({error: false, helperText: ''});
    const [passwordError, setPassworError] = useState({error: false, helperText: ''});
    const dispatch = useAppDispatch();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value);
        if(e.target.value) {
            if(!checkEmailValidation(e.target.value)) {
                setEmailError({error: true, helperText: 'Enter valid email.'})
            }else{
                setEmailError({error: false, helperText: ''})
            }
        }
    }
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value);
        if(e.target.value) {
            if(!checkPasswordValidation(e.target.value)) {
                setPassworError({error: true, helperText: 'Enter valid password.'})
            }else{
                setPassworError({error: false, helperText: ''})
            }
        }
    }
    const checkEmailValidation = (email: string) => {
        const regex = /\S+@\S+\.\S+/igm;
        if(regex.test(email)) {
            return true;
        }
        return false;
    }
    const checkPasswordValidation = (password: string) => {
        const regex = /[a-zA-Z0-9]{6,10}/igm;
        if(regex.test(password)) {
            return true;
        }
        return false;
    }
    const logIn = () => {
        if(email && password) {
            if(!emailError.error && !passwordError.error) {
                if(checkEmailValidation(email) && checkPasswordValidation(password)) {
                    dispatch({type: actions.USER_LOGIN, payload: true});
                    sessionStorage.setItem('token', email+password);
                }
            }
        }
    }

    return (
        <Container>
            <Grid container sx={{marginTop: '50px', display: 'flex', justifyContent: 'center'}}>
                <Grid item xs={12} sx={{marginBottom: '10px'}}>
                    <TextField
                        error={emailError.error}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        helperText={emailError.helperText}
                        value={email}
                        onChange={handleEmailChange}
                    />
                </Grid>
                <Grid item xs={12} sx={{marginBottom: '10px'}}>
                    <TextField
                        error={passwordError.error}
                        helperText={passwordError.helperText}
                        value={password}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={logIn}>
                        Log in
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}