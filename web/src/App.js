import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from "web3/dist/web3.min";
import { BrowserRouter as Router, } from 'react-router-dom';

import Routess from './route';
import Header from './header/index';

function getLibrary(provider) {
  return new Web3(provider)
}

function App() {
  return (
    <Router>
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className="App">
          <Header />
          <Routess />
        </div>
      </Web3ReactProvider>
    </Router>
  );
}



export default App;
