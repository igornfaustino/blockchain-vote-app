import VoteOption from "./components/VoteOption";
import useCandidates from "./hooks/useCandidates";
import useVote from "./hooks/useVote";

function App() {
  const candidates = useCandidates();
  const { vote, expireDate, totalVotes, remainingVotes } = useVote(candidates);

  return (
    <div>
      <p>{expireDate}</p>
      <p>total: {totalVotes}</p>
      <p>remaining: {remainingVotes}</p>
      <hr />
      {candidates.map((candidate) => (
        <VoteOption key={candidate.id} onClick={() => vote(candidate.id)}>
          {candidate.name}
        </VoteOption>
      ))}
    </div>
  );
}

export default App;
