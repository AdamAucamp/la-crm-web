import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

import firebase from 'firebase';

import "firebase/auth";
import { FirestoreProvider, FirestoreCollection, FirestoreDocument } from "@react-firebase/firestore";
import { config } from "./../firebase";



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function CustomerDetails() {

    const classes = useStyles();

    const [state, setState] = React.useState(null);
    const [gotDB, setGotDB] = React.useState(false);


    const updateState = (prop, value) => {
        setState({ ...state, [prop]: value })
        console.log(prop, value)
    }

    let { id } = useParams()

    var docRef = firebase.firestore().collection("customers").doc(id);
    if (!gotDB) {
        docRef.get().then(function (doc) {
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

        setGotDB(true)
    }








    function deleteCustomer(id) {
        firebase.firestore().collection('customers').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    function AddCustomer(data) {
        let autoID = firebase.firestore().collection('customers').doc().id;
        firebase.firestore().collection('customers').doc(autoID).set(data).then(() => {
            console.log("Document successfully added!");
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    function UpdateCustomer(id, data) {
        firebase.firestore().collection('customers').doc(id).set(data).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }





    return (
        <div>
            {/*    <FirestoreProvider {...config} firebase={firebase}>

              <FirestoreDocument path={path}>

                    {d2 => {
                        setState(d2.value)
                        console.log("reload")
                        return d2.isLoading ? <div> Loading -  {JSON.stringify(d2).toString()} </div> : <div>

                            {state != null ? <div>

                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Name" value={state.name} onChange={(e) => updateState("name", e.target.value)} />
                                    </Grid>
                                </Grid>

                                {JSON.stringify(d2).toString()}

                                <h3>ID: {id}</h3>


                            </div> : <div>No Data for - {id} </div>} </div>;
                    }}

                </FirestoreDocument> 

            </FirestoreProvider>*/}

            {state != null ? <div>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField label="Name" value={state.name} onChange={(e) => updateState("name", e.target.value)} />
                    </Grid>
                </Grid></div> : <div>state-null</div>}
        </div>
    );
}