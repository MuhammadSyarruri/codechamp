export default function NextPrevButton({
  handlePreviousQuestion,
  handleNextQuestion,
  currentQuestion,
  questions,
  answers,
}) {
  return (
    <div className="btn-navigation">
      <button
        onClick={() => {
          handlePreviousQuestion(currentQuestion);
        }}
      >
        Sebelumnya (Q)
      </button>
      <button
        onClick={() => handleNextQuestion(questions, currentQuestion, answers)}
      >
        {currentQuestion === questions.length ? "Selesai" : "Selanjutnya (E)"}
      </button>
    </div>
  );
}
