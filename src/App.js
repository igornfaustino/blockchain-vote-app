import "./App.css";
import useCandidates from "./hooks/useCandidates";
import useVote from "./hooks/useVote";

function App() {
  const candidates = useCandidates();
  const { vote, expireDate, totalVotes, remainingVotes } = useVote(candidates);

  return (
    <div className="App">
      <header className="App-header">
        <p>{expireDate}</p>
        <p>total: {totalVotes}</p>
        <p>remaining: {remainingVotes}</p>
        <hr />
        {candidates.map((candidate) => (
          <p key={candidate.id} onClick={() => vote(candidate.id)}>
            {candidate.name}
          </p>
        ))}
      </header>
    </div>
  );
}

export default App;
