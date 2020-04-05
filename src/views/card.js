import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

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




const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Number', field: 'number', type: 'numeric' },
      { title: 'Email', field: 'email' },
      
    ],
    data: [
      { name: 'FakeNsme', surname: 'FakeSurname', number: 845624578 },
      { name: 'FakeNsme2', surname: 'FakeSurname2', number: 84562423423 },
    ],
  });
  

 function deleteCustomer(id){
    firebase.firestore().collection('customers').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

   function AddCustomer(data){
    let autoID = firebase.firestore().collection('customers').doc().id;
    firebase.firestore().collection('customers').doc(autoID).set(data).then(() => {
      console.log("Document successfully added!");
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

     function UpdateCustomer(id,data){
    firebase.firestore().collection('customers').doc(id).set(data).then(() => {
      console.log("Document successfully updated!");
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });
  }



  return (
    <div>
    <FirestoreProvider {...config} firebase={firebase}>
      <FirestoreCollection path="/customers/" >
        {d => {return d.isLoading ? "Loading" : <pre> 

        <MaterialTable
      icons={tableIcons}
      title="Customer List"
      columns={state.columns}
      data={d.value}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();


                          console.log("newData")
                console.log(newData)


              AddCustomer(newData)



              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();


              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();

            

              setState((prevState) => {
                const data = [...prevState.data];

                deleteCustomer(d.ids[d.value.indexOf(oldData)])

                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    /> </pre>;}}
</FirestoreCollection>
 </FirestoreProvider>  
    </div>
  );
}