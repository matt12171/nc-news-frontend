import { Body } from "../components/Body";
import { Header } from "../components/Header";
import { PanelButtons } from "../components/PanelButtons";
import "./App.css";
import { Username } from "../context/UsernameContext";

function App() {
  return (
    <div>
      <Username>
        <Header />
        <PanelButtons />
        <Body />
      </Username>
    </div>
  );
}

export default App;
