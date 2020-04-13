import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

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
import InputIcon from '@material-ui/icons/Input';

import firebase from 'firebase';

import "firebase/auth";
import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";
import { config } from "./../firebase";




const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Input: forwardRef((props, ref) => <InputIcon color="primary" {...props} ref={ref} />),
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

function deleteCustomer(id) {
  let path = "users/" + firebase.auth().currentUser.uid + "/customers"
  firebase.firestore().collection(path).doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

function AddCustomer(data) {
  let path = "users/" + firebase.auth().currentUser.uid + "/customers"
  let autoID = firebase.firestore().collection(path).doc().id;
  firebase.firestore().collection(path).doc(autoID).set(data).then(() => {
    console.log("Document successfully added!");
  }).catch((error) => {
    console.error("Error adding document: ", error);
  });
}

function UpdateCustomer(id, data) {
  let path = "users/" + firebase.auth().currentUser.uid + "/customers"
  firebase.firestore().collection(path).doc(id).set(data).then(() => {
    console.log("Document successfully updated!");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });
}

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Bussiness', field: 'bussiness' },
      { title: 'Number', field: 'phone', type: 'numeric' },
      { title: 'Email', field: 'email' },

    ],
    data: [
      { name: 'loading', surname: 'loading', phone: 123456789, email: 'loading@loading.com'},
    ],
  });


  const [gotDB, setGotDB] = React.useState(false);

  

  if (!gotDB) {
      setGotDB(true)
      console.log("doing this")

      let path = "users/" + firebase.auth().currentUser.uid + "/customers"

      firebase.firestore().collection(path).get().then(function(querySnapshot) {
        let data = []
        querySnapshot.forEach(function(doc) {

            let elem = doc.data()
            elem.id = doc.id
            data.push(elem)
        });
        setState({...state, "data": data})
    });
  }

  let history = useHistory();

  function RouteToCUstomerDatails(id) {
    history.push("/customer_details/"+id);
  }






  return (
    <div>

      <MaterialTable
                  icons={tableIcons}
                  title="Customer List"
                  columns={state.columns}
                  data={state.data}
                  actions={[
                    {
                      icon: tableIcons.Input,
                      tooltip: 'Edit User Data',
                      onClick: (event, rowData) => {
                        RouteToCUstomerDatails(rowData.id)
                      }
                    }
                  ]}
                  options={{
                    exportButton: true
                  }}
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();

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

                         UpdateCustomer(oldData.id, newData)

                         


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

                          deleteCustomer(oldData.id)

                          setState((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                          });
                        }, 600);
                      }),
                  }}
                /> 
    </div>
  );
}