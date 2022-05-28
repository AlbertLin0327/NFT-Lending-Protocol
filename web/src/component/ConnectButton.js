import { useWeb3React } from "@web3-react/core"
import { injected } from "./InjectedConnector"
import { Button, Container } from "react-bootstrap"

export default function ConnectButton() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    
    <Container>
      {active ? 
        <Button variant="outline-success" onClick={disconnect}>Connect to {account}, Disconnect</Button>: 
        <Button variant="outline-success" onClick={connect}>Connect Wallet</Button>
      }      
    </Container>
  );
}