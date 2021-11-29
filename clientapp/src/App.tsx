import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { AppBar, Button, Container, IconButton, Toolbar } from '@mui/material';
import { routes } from './routes';
import { useAppDispatch, useAppSelector } from './hooks';
import { LoginPage } from './components/login/LoginPage';
import { LogoutRounded } from '@mui/icons-material';
import { actions } from './components/interface-enums';

function App() {
  const isLoggedIn = useAppSelector(state => state.login_reducer.isLoggedIn);
  const token = sessionStorage.getItem('token');
  const dispatch = useAppDispatch();
  if(!isLoggedIn && !token) {
    return <LoginPage />
  }
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    dispatch({ type: actions.USER_LOGIN, payload: false });
  }
  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Toolbar variant="regular">
            <h5 style={{border: '1px solid', padding: '5px'}}>Post Deck</h5>
            <span style={{paddingLeft: '20px'}}>
                <Button>
                  <Link className="custom-link" to="/">Home</Link>
                </Button>
                <Button>
                  <Link className="custom-link" to="/settings">Settings</Link>
                </Button>
            </span>
            <span style={{position: 'absolute', right: '15px'}}>
              <IconButton onClick={handleLogout} aria-label="delete">
                <LogoutRounded />
              </IconButton>
            </span>
          </Toolbar>
        </AppBar>
        <Container>
          <Switch>
            {routes.map((route, index) => {
              return(
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  children={<route.component />}
                />
              )
            })}
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
