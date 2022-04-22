import React from "react";

const AnswerEditor = ({ answer, context }) => {
  const textAnswer = answer.answer;

  return (
    <div style={{ marginBottom: 10 }}>
      <p>
        <strong>Answer: {textAnswer}</strong>
      </p>
      <span>...{context.slice(answer.start - 30, answer.start)}</span>
      <span style={{ backgroundColor: "yellow" }}>{textAnswer}</span>
      <span>{context.slice(answer.end, answer.end + 30)}...</span>
    </div>
  );
};

export default AnswerEditor;
