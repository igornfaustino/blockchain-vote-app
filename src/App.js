import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddCandidatesPage from "./pages/AddCandidatesPages";
import ResultsPage from "./pages/ResultsPage";

import VotePage from "./pages/VotePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <VotePage />
            </Route>
            <Route path="/results">
              <ResultsPage />
            </Route>
            <Route path="/candidates">
              <AddCandidatesPage />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
