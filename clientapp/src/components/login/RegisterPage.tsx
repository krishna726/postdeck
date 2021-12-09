import React, { ChangeEvent, useState } from 'react';
import { Button, Container, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { actions } from '../interface-enums';
import { checkLogin, setUsersInLocalDB } from '../utility';
import { useHistory } from 'react-router';

export const RegisterPage = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retryPassword, setRetryPassword] = useState('');
    const [emailError, setEmailError] = useState({error: false, helperText: ''});
    const [passwordError, setPasswordError] = useState({error: false, helperText: ''});
    const [retryPasswordError, setRetryPasswordError] = useState({error: false, helperText: ''});
    const [registerError, setRegisterError] = useState('');
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
                setPasswordError({error: true, helperText: 'Enter valid password with minimum of 6 words and maximum of 10 words.'})
            }else{
                setPasswordError({error: false, helperText: ''})
            }
        }
    }
    const handleRetryPasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRetryPassword(e.target.value);
        if(e.target.value) {
            if(!checkRetryPasswordValidation(e.target.value)) {
                setRetryPasswordError({error: true, helperText: 'Both passwords are not matching.'})
            }else{
                setRetryPasswordError({error: false, helperText: ''})
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
    const checkRetryPasswordValidation = (retryPassword: string) => {
        if(password === retryPassword) {
            return true;
        }
        return false;
    }
    const register = () => {
        if(email && password && retryPassword) {
            if(!emailError.error && !passwordError.error && !retryPasswordError.error) {
                if(checkEmailValidation(email) && checkPasswordValidation(password) && checkRetryPasswordValidation(retryPassword)) {
                    if(!checkLogin(email, password)) {
                        setUsersInLocalDB(email, password, email+password)
                        dispatch({type: actions.REGISTER, payload: {email: email, userToken: email+password}});
                        history.push('/')
                    }else{
                        setRegisterError('User is already available')
                    }
                }
            }
        }
    }
    const goToLogin = () => {
        history.push('/');
    }

    return (
        <Container>
            {registerError && <Snackbar open={registerError !== ''} onClose={() => setRegisterError('')} message={registerError}></Snackbar>}
            <Grid container sx={{marginTop: '50px', display: 'flex', justifyContent: 'center'}}>
                <Grid item xs={12} sx={{marginBottom: '10px'}}>
                    <h1>
                        <Typography>Register</Typography>
                    </h1>
                </Grid>
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
                <Grid item xs={12} sx={{marginBottom: '10px'}}>
                    <TextField
                        error={retryPasswordError.error}
                        helperText={retryPasswordError.helperText}
                        value={retryPassword}
                        id="outlined-password-input two"
                        label="Confirm Password"
                        type="password"
                        onChange={handleRetryPasswordChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={register}>
                        Register
                    </Button>
                    <Button onClick={goToLogin}>
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}