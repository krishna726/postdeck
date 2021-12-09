import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { AppBar, Button, Container, IconButton, Toolbar } from '@mui/material';
import { routes } from './routes';
import { useAppDispatch, useAppSelector } from './hooks';
import { LoginPage } from './components/login/LoginPage';
import { LogoutRounded } from '@mui/icons-material';
import { actions } from './components/interface-enums';
import { RegisterPage } from './components/login/RegisterPage';

function App() {
  const isLoggedIn = useAppSelector(state => state.login_reducer.isLoggedIn);
  const pathName = window.location.pathname;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    dispatch({ type: actions.USER_LOGIN, payload: false });
    return (<Redirect to="/login" />)
  }
  return (
    <div className="App">
      <Router>
        {isLoggedIn && <AppBar position="static">
          <Toolbar variant="regular">
            <h5 style={{ border: '1px solid', padding: '5px' }}>Post Deck</h5>
            <span style={{ paddingLeft: '20px' }}>
              <Button>
                <Link className="custom-link" to="/home">Home</Link>
              </Button>
              <Button>
                <Link className="custom-link" to="/settings">Settings</Link>
              </Button>
            </span>
            <span style={{ position: 'absolute', right: '15px' }}>
              <IconButton onClick={handleLogout} aria-label="delete">
                <LogoutRounded />
              </IconButton>
            </span>
          </Toolbar>
        </AppBar>
        }
        <Container>
          <Switch>
            <Route path="/login"><LoginPage /></Route>
            <Route path="/register"><RegisterPage /></Route>
            {routes.map((route, index) => {
              return(
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={({location}) => {
                    return isLoggedIn ? <route.component /> : <Redirect to={pathName} />
                  }}
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
