import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Tooltip, IconButton } from '@material-ui/core';

import firebase from 'firebase';
import 'firebase/auth';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from '@react-firebase/auth';
import { config } from './../firebase';

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

export default function Profile() {
  const classes = useStyles();

  let currentUser = firebase.auth().currentUser

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Profile
            </Typography>
          </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card className={classes.root}>
            <CardContent>
               <Typography variant="h5" gutterBottom>
                Your Details
              </Typography>

              {/*<Typography variant="caption" display="block" gutterBottom align="left">
                UID - {currentUser.uid}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom align="left">
                Display Name - {currentUser.displayName}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom align="left">
                Email - {currentUser.email}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom align="left">
                Phone - {currentUser.phoneNumber}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom align="left">
                Provider - {currentUser.providerId}
              </Typography> */}

              {/* <Typography variant="caption" display="block" gutterBottom>
                Object - {JSON.stringify(currentUser)}
              </Typography> */}
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow>
                  </TableRow>
                </TableHead>
                <TableBody>


                  <TableRow key="1">
                    <TableCell align="right">UID</TableCell>
                    <TableCell align="right">{currentUser.uid}</TableCell>
                  </TableRow>
                  
                  <TableRow key="1">
                    <TableCell align="right">Display Name</TableCell>
                    <TableCell align="right">{currentUser.displayName}</TableCell>
                  </TableRow>
                  
                  <TableRow key="1">
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">{currentUser.email}</TableCell>
                  </TableRow>

                  <TableRow key="1">
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">{currentUser.phoneNumber}</TableCell>
                  </TableRow>

                </TableBody>
              </Table>

            </CardContent>

          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper className={classes.paper}>...</Paper>
        </Grid>

      </Grid>
    </div>
  );
}
