import React from "react";

const AnswerEditor = ({ answer, context }) => {
  const textAnswer = answer.answer;
  console.log(textAnswer + " " + answer.start + " " + answer.end);
  console.log(context);
  console.log(context.slice(answer.start, answer.end));

  return (
    <div>
      <p>Answer: {textAnswer}</p>
      <span>...{context.slice(answer.start - 30, answer.start)}</span>
      <span style={{ backgroundColor: "yellow" }}>{textAnswer}</span>
      <span>{context.slice(answer.end, answer.end + 30)}...</span>
    </div>
  );
};

export default AnswerEditor;
