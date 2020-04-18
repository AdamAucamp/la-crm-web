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
import { Tooltip } from '@material-ui/core';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
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
    firebase.firestore().collection(path).doc(id).set(data, { merge: true }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}

function UpdateCustomerField(id, field, data) {
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

    
    const [render, setRender] = React.useState(true);
    function doRender(){
        setRender(!render)
    }



    const [gotDB, setGotDB] = React.useState(false);
    const [edited, setEdited] = React.useState(false);
    const [activeTask, setActiveTask] = React.useState(0);



    const handleStep = (step) => () => {
        setActiveTask(step);
        console.log("step ",step)
    };


    const updateState = (prop, value) => {
        setState({ ...state, [prop]: value })
        console.log(prop, value)
        setEdited(true)
    }

    const updateTask = (field,value,i)=>{
        let tempState = state

        tempState.tasks[i][field] = value
        setState(tempState)
        console.log(field, value)
        setEdited(true)
        doRender()

    }






    let { id } = useParams()

    if (!gotDB) {
        setGotDB(true)

        let path = "users/" + firebase.auth().currentUser.uid + "/customers"

        firebase.firestore().collection(path).doc(id).get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());

                let tempState = doc.data()
                if (tempState.tasks == null) {

                    console.log("no tasks set, getting settings")

                    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then(function (user) {
                        if (doc.exists) {
                            console.log("Document data:", user.data());

                            let tasks = []

                            user.data().settings.tasks.map((name) => {
                                tasks.push({ name: name, state: false, note: "", modified: new Date().getTime() })
                            })




                            tempState.tasks = tasks

                            setState(tempState)

                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });



                } else {
                    setState(tempState)
                }



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
                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils} variant="outlined">
                                <KeyboardDatePicker
                                    label="Date Last Contacted"
                                    variant="outlined"
                                    fullWidth
                                   
                                    
                                    value={new Date(state.date)}
                                    onChange={(e) => { updateState("date", e.getTime()) }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider> */}

                            <form className={classes.container} noValidate>
                                <TextField
                                    type="datetime-local"
                                    label="Date Last Contacted"
                                    variant="outlined"
                                    fullWidth

                                    value={dateString(state.date)}
                                    onChange={(e) => { updateState("date", new Date(e.target.value).getTime()) }}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
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

                            <Paper className={classes.paper}>Mandaat gestuur, nda gestuur,  nda terugontvang, finansiele inligting gestuur, </Paper>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            {/* <Tooltip title={"Last Updated - " + (state.tick != null ? new Date(state.tick.date).toDateString() : "none")} arrow>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.tick != null ? state.tick.state : false}
                                            onChange={(e) => updateState("tick", { state: e.target.checked, date: new Date().getTime(), note: (state.tick != null ? state.tick.note : "") })}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="TICK"
                                />
                            </Tooltip>

                            <TextField
                                label="Note"
                                multiline
                                rows={5}
                                value={state.tick != null ? state.tick.note : ""}
                                onChange={(e) => updateState("tick", { state: (state.tick != null ? state.tick.state : false), date: new Date().getTime(), note: e.target.value })}
                                variant="outlined"
                                fullWidth
                            /> */}
                        </Grid>



                    </Grid>


                    {/* <Grid container item spacing={3} style={{ paddingTop: 20 }} >
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
                    </Grid> */}

                    {state.tasks != null &&

                        <Grid container item spacing={3} style={{ paddingTop: 20 }} >
                            <Grid item xs={12}  >

                                {JSON.stringify(state.tasks)}

                                <Stepper activeStep={activeTask} orientation="vertical">
                                    {state.tasks.map((task, index) => (
                                        <Step
                                            key={index}
                                           
                                            completed={task.state}>
                                            <StepLabel >
                                                <Grid item xs={12} md={6} lg={4} onClick={handleStep(index)}>
                                                    <TextField
                                                        label="Title"
                                                        // variant="outlined"
                                                        fullWidth
                                                        value={task.name}
                                                        onChange={(e) => updateTask("name", e.target.value,index)} />
                                                </Grid>

                                                {/* {task.name} */}

                                            </StepLabel>
                                            <StepContent>
                                                {/* <Typography>{task.name}</Typography> */}


                                                <Tooltip title={"Last Updated - " + (task.state != null ? new Date(task.modified).toDateString() : "none")} arrow>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={task.state}
                                                                onChange={(e) => updateTask("state",e.target.checked,index)}
                                                                name="Completed"
                                                                color="primary"
                                                            />
                                                        }
                                                        label="Completed"
                                                    />
                                                </Tooltip>

                                                <TextField
                                                    label="Note"
                                                    multiline
                                                    rows={5}
                                                    value={task.note}
                                                    onChange={(e)=>updateTask("note",e.target.value,index)}
                                                    variant="outlined"
                                                    fullWidth
                                                />




                                                <div className={classes.actionsContainer}>
                                                    <div>
                                                        <Button
                                                            disabled={activeTask === 0}
                                                            onClick={handleStep(index-1)}
                                                            className={classes.button}
                                                        >
                                                            Back
                                                    </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={handleStep(index+1)}
                                                            className={classes.button}
                                                        >
                                                            {activeTask === state.tasks.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>

                            </Grid>
                        </Grid>}










                </Grid>











                <Fab variant="extended" color="primary" className={classes.fab} disabled={!edited} onClick={() => { UpdateCustomer(id, state); setEdited(false) }}>
                    <SaveIcon className={classes.extendedIcon} />
                    Save
                </Fab>


            </div> : <div>state-null</div>}
        </div>
    );
}





function dateString(param) {
    var m = new Date(param);
    var dateString =
        m.getUTCFullYear() + "-" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
        ("0" + m.getUTCDate()).slice(-2) + "T" +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);

    return dateString

}