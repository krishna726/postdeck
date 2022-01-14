import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { routes } from './routes';

function App() {
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
