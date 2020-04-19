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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import InputIcon from '@material-ui/icons/Input';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
import { TextField, InputAdornment } from '@material-ui/core';
import { findByPlaceholderText } from '@testing-library/react';

function UpdateSettings(id, data) {
    let path = "users/" + firebase.auth().currentUser.uid + "/customers"
    firebase.firestore().collection(path).doc(id).set(data, { merge: true }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}

function UpdateSettingsField(data) {

    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set(data, { merge: true }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Settings() {
    const classes = useStyles();
    const [state, setState] = React.useState(null);
    const [gotDB, setGotDB] = React.useState(false);

    const [newEvent, setNewEvent] = React.useState("");
    const [newClassification, setNewClassification] = React.useState("");
    const [newInterest, setNewInterest] = React.useState("");


    const [render, setRender] = React.useState(true);
    function doRender() {
        setRender(!render)
    }

    // function handleChange(i, event) {
    //     const values = [...fields];
    //     values[i].value = event.target.value;
    //     setFields(values);
    // }

    // function handleAdd() {
    //     const values = [...fields];
    //     values.push({ value: null });
    //     setFields(values);
    // }

    // function handleRemove(i) {
    //     const values = [...fields];
    //     values.splice(i, 1);
    //     setFields(values);
    // }


    if (!gotDB) {
        setGotDB(true)


        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                let tempState = doc.data()

                if (doc.data().settings == null) {
                    console.log("No settings");
                    tempState.settings = { events: [], interests: [], classifications: [] }


                }

                setState(tempState)

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }

    function addToEventsList(data) {
        let tempState = state
        tempState.settings.events.push(data)

        setState(tempState)
        UpdateSettingsField(tempState)

        setNewEvent("")
        setGotDB(false)
    }

    function DeleteFromEventList(i) {
        let tempState = state
        let removed = tempState.settings.events.splice(i, 1);

        setState(tempState)
        UpdateSettingsField(tempState)

        setNewEvent("")
        setGotDB(false)
    }

    function UpdateEvent(i, data) {

    }

    function addToList(list, data) {
        let tempState = state
        tempState.settings[list].push(data)
        setState(tempState)
        UpdateSettingsField(tempState)
        setGotDB(false)
    }


    function deleteFromList(list, i) {
        let tempState = state
        let removed = tempState.settings[list].splice(i, 1);
        setState(tempState)
        UpdateSettingsField(tempState)
        setGotDB(false)
    }

    function updateListItem(list, data, i) {
        let tempState = state
        tempState.settings[list][i] = data
        setState(tempState)
        UpdateSettingsField(tempState)
        setGotDB(false)
    }



    return (
        <div className={classes.root}>

            {/* <FirestoreProvider {...config} firebase={firebase}>
      <FirestoreCollection path={"users/" + firebase.auth().currentUser.uid + "/customers"} >
      </FirestoreCollection></FirestoreProvider> */}

            {state !== null ? (<div>
                {state.settings !== null &&
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom>
                                Settings
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h5">
                                        Default Interests
                                    </Typography>
                                    <List>
                                        {state.settings.interests.map((field, idx) => {
                                            return (
                                                <ListItem key={idx}>
                                                    <TextField
                                                        label="Interest"
                                                        value={field}
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={(e) => updateListItem("interests", e.target.value, idx)}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <AssignmentTurnedInIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteFromList("interests",idx)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            );
                                        })}
                                        <ListItem>
                                            <TextField
                                                label="New Interest"
                                                value={newInterest}
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => setNewInterest(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AssignmentTurnedInIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="Add" onClick={() => {addToList("interests", newInterest);setNewInterest("")}}>
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>

                        
                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h5">
                                        Default Events
                                    </Typography>
                                    <List>
                                        {state.settings.events.map((field, idx) => {
                                            return (
                                                <ListItem key={idx}>
                                                    <TextField
                                                        label="Event"
                                                        value={field}
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={(e) => updateListItem("events", e.target.value, idx)}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <AssignmentTurnedInIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteFromList("events",idx)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            );
                                        })}
                                        <ListItem>
                                            <TextField
                                                label="New Event"
                                                value={newEvent}
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => setNewEvent(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AssignmentTurnedInIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="Add" onClick={() => {addToList("events", newEvent);setNewEvent("")}}>
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h5">
                                        Default Classifications
                                    </Typography>
                                    <List>
                                        {state.settings.classifications.map((field, idx) => {
                                            return (
                                                <ListItem key={idx}>
                                                    <TextField
                                                        label="Classification"
                                                        value={field}
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={(e) => updateListItem("classifications", e.target.value, idx)}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <AssignmentTurnedInIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteFromList("classifications",idx)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            );
                                        })}
                                        <ListItem>
                                            <TextField
                                                label="New Classification"
                                                value={newClassification}
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => setNewClassification(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AssignmentTurnedInIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="Add" onClick={() => {addToList("classifications", newClassification);setNewClassification("")}}>
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>










                        {/* <SettingList title="Default Events" field="events" list={state.settings.events} createRef={addToList} /> */}




                        <Grid item xs={4}>
                            <Paper className={classes.paper}>...</Paper>
                        </Grid>

                    </Grid>

                }</div>) : (<div>loading or something</div>)}
        </div>
    );
}




function SettingList(title, field, list, createRef, updateRef, deleteRef) {

    const [newField, setNewField] = React.useState("");

    console.log(title, list)


    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card >
                <CardContent>
                    {/* <Typography variant="h5" component="h5">
                        {title}
                    </Typography> */}
                    <List>
                        {/* {list.map((field, idx) => {
                            return (
                                <ListItem key={idx}>
                                    <TextField
                                        label={idx}
                                        value={field}
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => updateRef(e.target.value, field, idx)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AssignmentTurnedInIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteRef(field, idx)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })} */}
                        <ListItem>
                            <TextField
                                label={"Title"}
                                value={newField}
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setNewField(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AssignmentTurnedInIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => createRef(newField, field)}>
                                    <AddCircleIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Grid>
    )

}