import { useMemo, useState } from "react";
import questionsData from "@/dataJson/q1.json";
import "./TestPage.css";

function shuffleOptions(options = []) {
    const shuffled = [...options];

    // Fisher–Yates: amestecare uniformă a variantelor
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

const sourceQuestions = Array.isArray(questionsData)
    ? questionsData
    : questionsData.questions ?? [];

// Ordinea se amestecă o singură dată la încărcarea paginii,
// iar proprietatea option.correct rămâne atașată variantei corecte.
const questions = sourceQuestions.map((question) => ({
    ...question,
    options: shuffleOptions(question.options),
}));

function getImageUrl(path) {
    if (!path) return "";
    if (path.startsWith("/")) return path;
    return `/${path.replace(/^\.?\//, "")}`;
}

function getCorrectIndexes(question) {
    return question.options
        .map((option, index) => option.correct ? index : -1)
        .filter((index) => index !== -1);
}

function isMultipleChoice(question) {
    return (
        question.type === "multi_select" ||
        question.type === "multiple_select" ||
        getCorrectIndexes(question).length > 1
    );
}

function TestPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [finished, setFinished] = useState(false);
    const [showAllQuestions, setShowAllQuestions] = useState(false);

    const currentQuestion = questions[currentIndex];

    const answeredCount = Object.keys(answers).filter(
        (id) => answers[id].length > 0
    ).length;

    const score = useMemo(() => {
        return questions.reduce((total, question) => {
            const selected = answers[question.id] ?? [];
            const correct = getCorrectIndexes(question);

            const isCorrect =
                selected.length === correct.length &&
                selected.every((index) => correct.includes(index));

            return total + (isCorrect ? 1 : 0);
        }, 0);
    }, [answers]);

    if (!questions.length) {
        return (
            <main className="test-page">
                <h1>Test de biochimie</h1>
                <p>Nu au fost găsite întrebări în questions.json.</p>
            </main>
        );
    }

    function selectOption(optionIndex) {
        if (finished) return;

        const question = currentQuestion;
        const previous = answers[question.id] ?? [];
        const multiple = isMultipleChoice(question);

        let next;

        if (multiple) {
            next = previous.includes(optionIndex)
                ? previous.filter((index) => index !== optionIndex)
                : [...previous, optionIndex];
        } else {
            next = [optionIndex];
        }

        setAnswers((old) => ({
            ...old,
            [question.id]: next,
        }));
    }

    function goTo(index) {
        setCurrentIndex(Math.max(0, Math.min(index, questions.length - 1)));
        setShowAllQuestions(false);
    }

    function finishTest() {
        setFinished(true);
        setShowAllQuestions(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function restartTest() {
        setAnswers({});
        setCurrentIndex(0);
        setFinished(false);
        setShowAllQuestions(false);
    }

    const selectedOptions = answers[currentQuestion?.id] ?? [];
    const feedbackShown = selectedOptions.length > 0;

    return (
        <main className="test-page">
            <header className="test-header">
                <a className="test-back-link" href="/">
                    ← Înapoi la pagina principală
                </a>

                <div className="test-heading">
                    <div>
                        <p className="test-eyebrow">TEST INTERACTIV</p>
                        <h1>Test de biochimie</h1>
                        <p className="test-subtitle">
                            Întrebări bazate pe documentul PDF
                        </p>
                    </div>

                    <div className="test-counter">
                        <strong>{finished ? score : currentIndex + 1}</strong>
                        <span>
                            {finished
                                ? `din ${questions.length} puncte`
                                : `din ${questions.length} întrebări`}
                        </span>
                    </div>
                </div>

                <div
                    className="test-progress"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={questions.length}
                    aria-valuenow={finished ? questions.length : answeredCount}
                >
                    <div
                        className="test-progress-fill"
                        style={{
                            width: `${(answeredCount / questions.length) * 100}%`,
                        }}
                    />
                </div>

                <div className="test-progress-label">
                    <span>Răspunsuri selectate</span>
                    <span>{answeredCount} / {questions.length}</span>
                </div>
            </header>

            {finished ? (
                <section className="test-card test-results">
                    <div className="result-icon" aria-hidden="true">✓</div>
                    <p className="test-eyebrow">TEST FINALIZAT</p>
                    <h2>
                        Ai obținut {score} din {questions.length} puncte
                    </h2>
                    <p className="result-percentage">
                        {Math.round((score / questions.length) * 100)}%
                    </p>
                    <p className="result-description">
                        Un răspuns este considerat corect numai dacă toate
                        variantele corecte au fost selectate și nicio variantă
                        greșită nu a fost selectată.
                    </p>

                    <div className="result-actions">
                        <button
                            className="test-button secondary-button"
                            onClick={() => {
                                setFinished(false);
                                setShowAllQuestions(true);
                            }}
                        >
                            Revizuiește răspunsurile
                        </button>
                        <button
                            className="test-button primary-button"
                            onClick={restartTest}
                        >
                            Reîncepe testul
                        </button>
                    </div>
                </section>
            ) : showAllQuestions ? (
                <section className="test-card">
                    <div className="question-topline">
                        <h2>Toate întrebările</h2>
                        <button
                            className="text-button"
                            onClick={() => setShowAllQuestions(false)}
                        >
                            Înapoi la test
                        </button>
                    </div>

                    <div className="question-grid">
                        {questions.map((question, index) => (
                            <button
                                key={question.id}
                                className={`question-grid-item ${
                                    answers[question.id]?.length
                                        ? "is-answered"
                                        : ""
                                }`}
                                onClick={() => goTo(index)}
                                title={`Întrebarea ${question.id}`}
                            >
                                {question.id}
                            </button>
                        ))}
                    </div>
                    <p className="grid-hint">
                        Verde — ai selectat un răspuns. Alege orice număr
                        pentru a reveni la întrebare.
                    </p>
                </section>
            ) : (
                <section className="test-card">
                    <div className="question-topline">
                        <span className="question-number">
                            ÎNTREBAREA {currentQuestion.id}
                        </span>
                        <button
                            className="text-button"
                            onClick={() => setShowAllQuestions(true)}
                        >
                            Toate întrebările
                        </button>
                    </div>

                    <h2 className="question-title">
                        {currentQuestion.question}
                    </h2>

                    {currentQuestion.question_images?.length > 0 && (
                        <div className="question-images">
                            {currentQuestion.question_images.map((image, i) => (
                                <img
                                    key={`${image}-${i}`}
                                    src={getImageUrl(image)}
                                    alt={`Ilustrație pentru întrebarea ${currentQuestion.id}`}
                                    className="prompt-image"
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    )}

                    <p className="answer-instruction">
                        {isMultipleChoice(currentQuestion)
                            ? "Selectează toate variantele corecte."
                            : "Selectează o singură variantă."}
                    </p>

                    <div className="answer-list">
                        {currentQuestion.options.map((option, index) => {
                            const selected = selectedOptions.includes(index);

                            const optionClass = [
                                "answer-option",
                                selected ? "selected" : "",
                                feedbackShown && option.correct ? "is-correct" : "",
                                feedbackShown && selected && !option.correct
                                    ? "is-incorrect"
                                    : "",
                            ].filter(Boolean).join(" ");

                            return (
                                <button
                                    key={`${currentQuestion.id}-${index}`}
                                    type="button"
                                    className={optionClass}
                                    onClick={() => selectOption(index)}
                                    aria-pressed={selected}
                                >
                                    <span className="option-marker">
                                        {selected ? "✓" : String.fromCharCode(65 + index)}
                                    </span>

                                    <span className="option-content">
                                        {option.image && (
                                            <img
                                                src={getImageUrl(option.image)}
                                                alt={`Imagine pentru varianta ${index + 1}`}
                                                className="option-image"
                                                loading="lazy"
                                            />
                                        )}

                                        {option.text && (
                                            <span className="option-text">
                                                {option.text}
                                            </span>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {feedbackShown && (
                        <p className="answer-feedback" aria-live="polite">
                            Verde — răspuns corect. Roșu — ai selectat un răspuns greșit.
                            {isMultipleChoice(currentQuestion) &&
                                " Poți selecta sau deselecta în continuare variante."}
                        </p>
                    )}

                    <footer className="question-navigation">
                        <button
                            className="test-button secondary-button"
                            onClick={() => goTo(currentIndex - 1)}
                            disabled={currentIndex === 0}
                        >
                            ← Înapoi
                        </button>

                        <span className="navigation-count">
                            {currentIndex + 1} / {questions.length}
                        </span>

                        {currentIndex < questions.length - 1 ? (
                            <button
                                className="test-button primary-button"
                                onClick={() => goTo(currentIndex + 1)}
                            >
                                Următoarea →
                            </button>
                        ) : (
                            <button
                                className="test-button primary-button"
                                onClick={finishTest}
                            >
                                Finalizează testul
                            </button>
                        )}
                    </footer>

                    {currentIndex === questions.length - 1 && (
                        <p className="finish-hint">
                            Poți reveni la întrebările anterioare înainte
                            de a finaliza testul.
                        </p>
                    )}
                </section>
            )}
        </main>
    );
}

export default TestPage;

