import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory 
} from "react-router-dom";

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from '@material-ui/core/MenuList';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleIcon from '@material-ui/icons/People';
import ErrorIcon from '@material-ui/icons/Error';
import HomeIcon from '@material-ui/icons/Home';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import routes from "./constants/routes";
import './App.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import "firebase/auth";
import { FirestoreProvider, FirestoreCollection, FirestoreDocument } from "@react-firebase/firestore";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import * as firebaseui from 'firebaseui'
import { config } from "./firebase";


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  MenuLink: {
     textDecoration: "none",
     color:"#888888"
      },
}));


// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};


function App() {


  
  const theme = useTheme();  
  const classes = useStyles();


  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [user, setUser] = useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignoutClose = () => {
    setAnchorEl(null);
    firebase.auth().signOut()
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    console.log("open drawer")
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    console.log("closw drawer")
  };





  return (
    <div className="App">
      <Router>
      <FirebaseAuthProvider firebase={firebase} {...config}>
      <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: drawerOpen,
            })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap className={classes.title}>
            CRM APP THING
          </Typography>

            <FirebaseAuthConsumer>
            {({ isSignedIn }) => {
              return (<div>
                {isSignedIn ? (<div>
                  {firebase.auth().currentUser.email}
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={ handleSignoutClose}>Sign Out</MenuItem>
                  </Menu>
                </div>) : (<div>not singed in </div>)} </div>)}} 
          </FirebaseAuthConsumer>
        </Toolbar>
      </AppBar>
      

            
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
        
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        
        <MenuList>
        <Link to="/" className={classes.MenuLink} >
          <MenuItem  >
          <ListItemIcon>
            <HomeIcon  />
          </ListItemIcon>
          <Typography variant="inherit" className={classes.MenuLink}>Home</Typography>
          </MenuItem>
          </Link>

        <Link to="/customer_list" className={classes.MenuLink} >
          <MenuItem  >
          <ListItemIcon>
            <PeopleIcon  />
          </ListItemIcon>
          <Typography variant="inherit" className={classes.MenuLink}>Customer List</Typography>
          </MenuItem>
          </Link>

          <Link to="/card" className={classes.MenuLink} >
          <MenuItem  >
          <ListItemIcon>
            <ErrorIcon  />
          </ListItemIcon>
          <Typography variant="inherit" className={classes.MenuLink}>Test</Typography>
          </MenuItem>
          </Link>

        </MenuList>

        <Divider />
      </Drawer>
      
      
            
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <FirebaseAuthConsumer>
            {({ isSignedIn }) => {
              return (<div>
                {isSignedIn ? <div>

                    <Switch>
                      {routes.map(route => (
                        <Route
                          key={route.path}
                          path={route.path}
                          exact={route.exact}
                          component={route.main}
                        />
                      ))}
                    </Switch>


                </div> : <div>
                    <p>Please sign-in:</p>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                  </div>}
              </div>

              );
            }}
          </FirebaseAuthConsumer>
      </main>



       
      </div>
      </FirebaseAuthProvider>
      </Router>




      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    
    
    
    
    </div>
  );
}

export default App;
