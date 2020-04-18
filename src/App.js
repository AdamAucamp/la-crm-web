import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import routes from "./constants/routes";
import './App.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'firebase/auth';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from '@react-firebase/auth';
import { config } from './firebase';


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
    color: "#888888"
  },
  profile: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
    console.log("close drawer")
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
                  Simple CRM
                </Typography>

                <ProfileButton />

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

              <DrawerMenu />

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
    </div>
  );
}

export default App;




function ProfileButton() {
  const theme = useTheme();
  const classes = useStyles();

  const handleSignout = () => {
    firebase.auth().signOut()
  };

  let history = useHistory();

  function Navigate(nav) {
    history.push(nav);
  }


  return (
    <FirebaseAuthConsumer>{({ isSignedIn }) => {

      if (isSignedIn) {
        return (<div>
          <Tooltip title="Profile" arrow>
            <Button color="inherit" onClick={() => Navigate("/profile")}>
              {firebase.auth().currentUser.email}</Button>
          </Tooltip>
          <Tooltip title="Sign Out" arrow>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleSignout}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>

        </div>)
      } else {
        return (<div>
          <Tooltip title="Sign In" arrow>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => Navigate("/")}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </div>)
      }
    }}</FirebaseAuthConsumer>
  );
}

function DrawerMenu() {
  let history = useHistory();

  function handleClick(nav) {
    history.push(nav);
  }

  return (
    <MenuList>
    <MenuItem onClick={() => handleClick("/")} >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <Typography variant="inherit"  >Home</Typography>
    </MenuItem>
    <MenuItem onClick={() => handleClick("/customer_list")} >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Typography variant="inherit"  >Customer List</Typography>
    </MenuItem>
    <MenuItem onClick={() => handleClick("/settings")} >
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <Typography variant="inherit"  >Settings</Typography>
    </MenuItem>
    
    <MenuItem onClick={() => handleClick("/test")} >
      <ListItemIcon>
        <ErrorIcon />
      </ListItemIcon>
      <Typography variant="inherit"  >Test</Typography>
    </MenuItem>
  </MenuList>
  );
}