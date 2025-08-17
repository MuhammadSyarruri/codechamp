// Komponen untuk menampilkan soal dan pilihan
export default function DisplayQuestions({
  questions,
  currentQuestion,
  answer,
  handleAnswer,
  isReview = false,
}) {
  if (!questions || questions.length === 0) {
    return <p>Loading...</p>;
  }

  const question = questions[currentQuestion - 1];
  if (!question) {
    return <p>Soal tidak ditemukan</p>;
  }

  return (
    <div className="question-container">
      <p>
        {currentQuestion}. {question.pertanyaan}
      </p>
      {Object.entries(question.pilihan).map(([key, value]) => (
        <Choice
          key={key}
          id={key}
          value={value}
          answer={answer}
          handleAnswer={handleAnswer}
          currentQuestion={currentQuestion}
          isReview={isReview}
          correctAnswer={question.jawaban}
        />
      ))}
    </div>
  );
}

// Komponen untuk pilihan jawaban
function Choice({
  id,
  value,
  answer,
  handleAnswer,
  currentQuestion,
  isReview,
  correctAnswer,
}) {
  return (
    <div className="choice">
      <input
        type="radio"
        id={`choice-${currentQuestion}-${id}`}
        name={`question-${currentQuestion}`}
        checked={answer === id}
        onChange={() => handleAnswer && handleAnswer(currentQuestion - 1, id)}
      />
      <label htmlFor={`choice-${currentQuestion}-${id}`}>
        <span>
          {value}
          {isReview && id === correctAnswer && (
            <span className="correct-answer"> (Benar)</span>
          )}
          {isReview && answer === id && answer !== correctAnswer && (
            <span className="wrong-answer">(Jawaban Anda Salah)</span>
          )}
        </span>
      </label>
    </div>
  );
}
