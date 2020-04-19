import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import InputIcon from '@material-ui/icons/Input';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

import firebase from 'firebase';

import "firebase/auth";
import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";
import { config } from "./../firebase";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [state, setState] = React.useState(null);
  const [gotDB, setGotDB] = React.useState(false);

  if (!gotDB) {
    setGotDB(true)

    let path = "users/" + firebase.auth().currentUser.uid + "/customers"
    firebase.firestore().collection(path).where("followup", "==", true).get().then(function (querySnapshot) {
      let data = []
      querySnapshot.forEach(function (doc) {

        let elem = doc.data()
        elem.id = doc.id
        data.push(elem)
      });
      setState({ ...state, "data": data })
    });
  }

  let history = useHistory();

  function RouteToCUstomerDatails(id) {
    history.push("/customer_details/" + id);
  }

  function newCustomer() {
    console.log("new customer")
  }

  return (
    <div className={classes.root}>

      {/* <FirestoreProvider {...config} firebase={firebase}>
      <FirestoreCollection path={"users/" + firebase.auth().currentUser.uid + "/customers"} >

      </FirestoreCollection></FirestoreProvider> */}

      {state !== null ? (<div>

        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Home
            </Typography>
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.root}>
              <CardContent>

                <Typography variant="h5" component="h2">
                  Marked for follow up
                 </Typography>


                <List >
                  {state.data.map((elem, index) =>
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <ContactPhoneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={elem.name + " " + elem.surname + " - " + elem.bussiness}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              Last contacted :
                          </Typography>
                            {(new Date(elem.date)).toTimeString()}
                          </React.Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Details" onClick={() => RouteToCUstomerDatails(elem.id)}>
                          <InputIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}

                </List>

              </CardContent>

            </Card>
          </Grid>
         
          <Grid item xs={12} md={6} lg={4}>
            <Paper className={classes.paper}>...</Paper>
          </Grid>

        </Grid>

      </div>) : (<div>loading or something</div>)}

      <Fab variant="extended" color="primary" className={classes.fab} disabled={false} onClick={() => newCustomer()}>
        <AddCircleIcon className={classes.extendedIcon} />
          New
      </Fab>


    </div>
  );
}
