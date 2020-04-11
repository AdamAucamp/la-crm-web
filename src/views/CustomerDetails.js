import React from 'react';
import {
    useParams
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SaveIcon from '@material-ui/icons/Save';

import firebase from 'firebase';




const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
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
    firebase.firestore().collection('customers').doc(id).set(data).then(() => {
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
        
        firebase.firestore().collection("customers").doc(id).get().then(function (doc) {
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
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField label="Name" value={state.name} onChange={(e) => updateState("name", e.target.value)} />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField label="Surname" value={state.surname} onChange={(e) => updateState("surname", e.target.value)} />
                    </Grid>
                </Grid>


                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!edited}
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={() => { UpdateCustomer(id, state); setEdited(false) }}
                >
                    Save
                </Button>


            </div> : <div>state-null</div>}
        </div>
    );
}