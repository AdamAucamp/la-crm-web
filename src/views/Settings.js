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

    const [newTask, setNewTask] = React.useState("");

    function updateNewTask(value) {
        setNewTask(value)
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
                setState(doc.data())

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }

    function AddToTaskList(data) {
        let tempState = state
        tempState.settings.tasks.push(data)

        setState(tempState)
        UpdateSettingsField(tempState)

        setNewTask("")
        setGotDB(false)
    }

    function RemoveFromTaskList(i) {
        let tempState = state
        let removed = tempState.settings.tasks.splice(i, 1);

        setState(tempState)
        UpdateSettingsField(tempState)

        setNewTask("")
        setGotDB(false)
    }

    function UpdateTaskTitle(i,data){

    }




    let history = useHistory();

    function RouteToCUstomerDatails(id) {
        history.push("/customer_details/" + id);
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
                            Settings
                    </Typography>
                    </Grid>


                    <Grid item xs={12} md={6} lg={4}>
                        <Card className={classes.root}>
                            <CardContent>

                                <Typography variant="h5" component="h5">
                                    Default Tasks
                                </Typography>

                                <List>

                                    {state.settings.tasks.map((field, idx) => {
                                        return (
                                            <ListItem key={idx}>

                                                <TextField
                                                    label="Task"
                                                    value={field}
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={(e) => UpdateTaskTitle(e.target.value)}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AssignmentTurnedInIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />

                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>RemoveFromTaskList(idx)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        );
                                    })}
                                    <ListItem>

                                        <TextField
                                            label="New Task"
                                            value={newTask != null ? newTask : ""}
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => setNewTask(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AssignmentTurnedInIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={() => AddToTaskList(newTask)}>
                                                <AddCircleIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>

                                </List>

                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>{JSON.stringify(state)}</Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>{JSON.stringify(state.settings.tasks)}</Paper>
                    </Grid>
                </Grid>




            </div>) : (<div>loading or something</div>)}


        </div>
    );
}
