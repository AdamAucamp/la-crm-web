import React from 'react';
import {
    useParams
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import firebase from 'firebase';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

// function deleteCustomer(id) {
//     firebase.firestore().collection('customers').doc(id).delete().then(() => {
//         console.log("Document successfully deleted!");
//     }).catch((error) => {
//         console.error("Error removing document: ", error);
//     });
// }

// function AddCustomer(data) {
//     let autoID = firebase.firestore().collection('customers').doc().id;
//     firebase.firestore().collection('customers').doc(autoID).set(data).then(() => {
//         console.log("Document successfully added!");
//     }).catch((error) => {
//         console.error("Error adding document: ", error);
//     });
// }

function UpdateCustomer(id, data) {
    let path = "users/" + firebase.auth().currentUser.uid + "/customers"
    firebase.firestore().collection(path).doc(id).set(data).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}

// function  GetCustomer(id){
//     firebase.firestore().collection("customers").doc(id).get().then(function (doc) {
//         if (doc.exists) {
//             console.log("Document data:", doc.data());
//             return doc.data()
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//             return null
//         }
//     }).catch(function (error) {
//         console.log("Error getting document:", error);
//     });
// }

export default function CustomerDetails() {

    const classes = useStyles();

    const [state, setState] = React.useState(null);
    
    const [gotDB, setGotDB] = React.useState(false);
    const [edited, setEdited] = React.useState(false);


    const updateState = (prop, value) => {
        setState({ ...state, [prop]: value })
        console.log(prop, value)
        setEdited(true)
    }

    let { id } = useParams()

    if (!gotDB) {
        setGotDB(true)

        let path = "users/" + firebase.auth().currentUser.uid + "/customers"

        firebase.firestore().collection(path).doc(id).get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setState(doc.data())


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }








    return (
        <div>

            {state != null ? <div>

                <Grid container >
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={6} lg={4}>
                            <TextField
                                label="Name" value={state.name}
                                variant="outlined"
                                fullWidth
                                onChange={(e) => updateState("name", e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField
                                label="Surname"
                                variant="outlined"
                                fullWidth
                                value={state.surname} onChange={(e) => updateState("surname", e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField
                                label="Bussiness Name"
                                variant="outlined"
                                fullWidth
                                value={state.bussiness} onChange={(e) => updateState("bussiness", e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={state.email} onChange={(e) => updateState("email", e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField
                                label="Phone"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={state.phone} onChange={(e) => updateState("phone", e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }} />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    label="Date Last Contacted"
                                    variant="outlined"
                                    fullWidth
                                    format="dd/MM/yyyy"
                                    value={new Date(state.date)}
                                    onChange={(e) => { updateState("date", e.getTime()) }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>





                        <Grid item xs={6} md={3} lg={2} >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.followup}
                                        onChange={(e) => updateState("followup", !state.followup)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Should Follow Up"
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>

                            <Paper className={classes.paper}>item</Paper>
                        </Grid>

                    </Grid>
                    

                    <Grid container item spacing={3} style={{ paddingTop: 20 }} >
                        <Grid item xs={12} md={6} >
                            <TextField
                                label="Note"
                                multiline
                                rows={10}
                                value={state.note}
                                onChange={(e) => updateState("note", e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                </Grid>











                <Fab variant="extended" color="primary" className={classes.fab} disabled={!edited} onClick={() => { UpdateCustomer(id, state); setEdited(false) }}>
                    <SaveIcon className={classes.extendedIcon} />
                    Save
                </Fab>


            </div> : <div>state-null</div>}
        </div>
    );
}