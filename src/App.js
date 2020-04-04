import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useFirestoreDocData, useFirestore, SuspenseWithPerf} from 'reactfire';

import { Counter } from './features/counter/Counter';

function App() {
  return (
    <div className="App">


       {/*
        SuspenseWithPerf behaves the same as Suspense,
        but also automatically measures load times with the User Timing API
        and reports it to Firebase Performance Monitoring
      */}
      <SuspenseWithPerf
        fallback={'loading burrito status...'}
        traceId={'load-burrito-status'}
      >
        <Burrito />


        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        
      </SuspenseWithPerf>
    </div>
  );
}

export default App;


function Burrito() {
  // lazy load the Firestore SDK and create a document reference
  const burritoRef = useFirestore()
    .collection('customers')
    .doc('xYYwDvxOpXicVDTEiJdU');

  // subscribe to the doc. just one line!
  const burrito = useFirestoreDocData(burritoRef);

  // get the value from the doc
  const name = burrito.email;

  return <p>The burrito is {name}</p>;
}