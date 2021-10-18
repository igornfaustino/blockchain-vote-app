import React from "react";

function VoteOption(props) {
  const { onClick, children } = props;

  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default VoteOption;
