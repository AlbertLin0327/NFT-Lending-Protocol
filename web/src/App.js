import logo from './logo.svg';
import './App.css';
import Header from './header/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from "web3/dist/web3.min";

function getLibrary(provider) {
  return new Web3(provider)
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <Header />
      </div>
    </Web3ReactProvider>
  );
}



export default App;
