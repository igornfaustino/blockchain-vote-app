import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ResultsPage from "./pages/ResultsPage";

import VotePage from "./pages/VotePage";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <VotePage />
          </Route>
          <Route path="/results">
            <ResultsPage />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
