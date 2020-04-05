import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import firebase from 'firebase';

import "firebase/auth";
import { FirestoreProvider, FirestoreCollection, FirestoreDocument, FirestoreMutation } from "@react-firebase/firestore";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import * as firebaseui from 'firebaseui'
import { config } from "./../firebase";



const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
       
       
                    <FirestoreProvider {...config} firebase={firebase}>
                      <div>This is my app</div>
                      <FirestoreCollection path="/customers/" limit={4}>
                        {d => {
                          return d.isLoading ? "Loading" : <pre>  {JSON.stringify(d, null, 2)} </pre>;
                        }}
                      </FirestoreCollection>

<FirestoreMutation type="set" path="/customers/xuN114eU5s9JjZSDTy44">
  {({ runMutation }) => {
    return (
      <div>
        <h2> Mutate state </h2>
        <button
          onClick={() => {
            runMutation({
              name: "updated value",
              
            }).then(res => {
              console.log("Ran mutation ", res);
            });
          }}
        >
          Mutate Set
        </button>
      </div>
    );
  }}
</FirestoreMutation>
                    </FirestoreProvider>


      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}



