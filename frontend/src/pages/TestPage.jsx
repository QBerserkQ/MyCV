
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { tests } from "../dataJson/tests";
import "./TestPage.css";

// Перемешивает массив алгоритмом Fisher–Yates.
function shuffleArray(items = []) {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

// Создаёт перемешанную копию вопроса, сохраняя correct у каждого варианта.
function shuffleQuestion(question) {
    return {
        ...question,
        options: shuffleArray(question.options ?? []),
    };
}

// Формирует URL изображения внутри папки выбранного теста.
function getImageUrl(path, testId) {
    if (!path) return "";

    if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) {
        return path;
    }

    const cleanPath = path.replace(/^\/+/, "");

    if (cleanPath.startsWith("tests/")) {
        return `/${cleanPath}`;
    }

    return `/tests/${testId}/${cleanPath}`;
}

function getCorrectIndexes(question) {
    return (question.options ?? [])
        .map((option, index) => (option.correct ? index : -1))
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
    const { testId } = useParams();

    const test = tests.find((item) => item.id === testId);

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [checkedQuestions, setCheckedQuestions] = useState({});
    const [finished, setFinished] = useState(false);
    const [showAllQuestions, setShowAllQuestions] = useState(false);

    // Загружаем questions.json выбранного теста.
    useEffect(() => {
        const controller = new AbortController();

        async function loadQuestions() {
            setLoading(true);
            setLoadError("");
            setQuestions([]);
            setCurrentIndex(0);
            setAnswers({});
            setCheckedQuestions({});
            setFinished(false);
            setShowAllQuestions(false);

            if (!test) {
                setLoadError("Testul solicitat nu există.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `/tests/${test.id}/questions.json`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(
                        `Nu s-a putut încărca testul (${response.status}).`
                    );
                }

                const data = await response.json();

                const sourceQuestions = Array.isArray(data)
                    ? data
                    : data.questions ?? [];

                if (
                    !Array.isArray(sourceQuestions) ||
                    sourceQuestions.length === 0
                ) {
                    throw new Error(
                        "Nu au fost găsite întrebări în questions.json."
                    );
                }

                // Перемешиваем вопросы и варианты ответов.
                const shuffledQuestions = shuffleArray(sourceQuestions).map(
                    shuffleQuestion
                );

                setQuestions(shuffledQuestions);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Eroare la încărcarea testului:", error);
                    setLoadError(error.message || "A apărut o eroare.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadQuestions();

        return () => controller.abort();
    }, [testId]);

    const currentQuestion = questions[currentIndex];

    const answeredCount = Object.keys(answers).filter(
        (id) => (answers[id] ?? []).length > 0
    ).length;

    // Подсчёт баллов: правильны должны быть все выбранные ответы.
    const score = useMemo(() => {
        return questions.reduce((total, question) => {
            const selected = answers[question.id] ?? [];
            const correct = getCorrectIndexes(question);

            const isCorrect =
                selected.length === correct.length &&
                selected.every((index) => correct.includes(index));

            return total + (isCorrect ? 1 : 0);
        }, 0);
    }, [answers, questions]);

    // Выбор или отмена выбора варианта ответа.
    function selectOption(optionIndex) {
        if (finished || !currentQuestion) return;

        const question = currentQuestion;
        const previous = answers[question.id] ?? [];
        const multiple = isMultipleChoice(question);

        let next;

        if (multiple) {
            // Для вопросов с несколькими ответами можно выбирать
            // и снимать несколько вариантов.
            if (previous.includes(optionIndex)) {
                next = previous.filter((index) => index !== optionIndex);
            } else {
                next = [...previous, optionIndex];
            }

            // После изменения выбора требуется новая проверка.
            setCheckedQuestions((old) => ({
                ...old,
                [question.id]: false,
            }));
        } else {
            // Для одиночного ответа всегда выбран только один вариант.
            next = [optionIndex];
        }

        setAnswers((old) => ({
            ...old,
            [question.id]: next,
        }));
    }

    // Проверка ответа по кнопке.
    function checkAnswer() {
        if (!currentQuestion) return;

        const selected = answers[currentQuestion.id] ?? [];

        if (selected.length === 0) return;

        setCheckedQuestions((old) => ({
            ...old,
            [currentQuestion.id]: true,
        }));
    }

    function goTo(index) {
        setCurrentIndex(
            Math.max(0, Math.min(index, questions.length - 1))
        );
        setShowAllQuestions(false);
    }

    function finishTest() {
        setFinished(true);
        setShowAllQuestions(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function restartTest() {
        // Новая попытка: перемешиваем вопросы и варианты заново.
        setQuestions((old) => shuffleArray(old).map(shuffleQuestion));
        setAnswers({});
        setCheckedQuestions({});
        setCurrentIndex(0);
        setFinished(false);
        setShowAllQuestions(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (loading) {
        return (
            <main className="test-page">
                <p>Se încarcă testul...</p>
            </main>
        );
    }

    if (loadError || !test || questions.length === 0) {
        return (
            <main className="test-page">
                <h1>{test?.title ?? "Test"}</h1>
                <p>{loadError || "Nu au fost găsite întrebări."}</p>
                <Link className="test-back-link" to="/test">
                    ← Înapoi la teste
                </Link>
            </main>
        );
    }

    const selectedOptions = answers[currentQuestion?.id] ?? [];

    // Правильные ответы показываем только после проверки.
    const feedbackShown =
        isMultipleChoice(currentQuestion)
            ? Boolean(checkedQuestions[currentQuestion?.id])
            : selectedOptions.length > 0;

    return (
        <main className="test-page">
            <header className="test-header">
                <Link className="test-back-link" to="/test">
                    ← Înapoi la teste
                </Link>

                <div className="test-heading">
                    <div>
                        <p className="test-eyebrow">TEST INTERACTIV</p>
                        <h1>{test.title}</h1>
                        <p className="test-subtitle">
                            {test.description || "Verifică-ți cunoștințele."}
                        </p>
                    </div>

                    <div className="test-counter">
                        <strong>
                            {finished ? score : currentIndex + 1}
                        </strong>
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
                    aria-valuenow={
                        finished ? questions.length : answeredCount
                    }
                >
                    <div
                        className="test-progress-fill"
                        style={{
                            width: `${
                                (answeredCount / questions.length) * 100
                            }%`,
                        }}
                    />
                </div>

                <div className="test-progress-label">
                    <span>Răspunsuri selectate</span>
                    <span>
                        {answeredCount} / {questions.length}
                    </span>
                </div>
            </header>

            {finished ? (
                <section className="test-card test-results">
                    <div className="result-icon" aria-hidden="true">
                        ✓
                    </div>

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
                                type="button"
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
                            {currentQuestion.question_images.map(
                                (image, i) => (
                                    <img
                                        key={`${image}-${i}`}
                                        src={getImageUrl(image, test.id)}
                                        alt={`Ilustrație pentru întrebarea ${currentQuestion.id}`}
                                        className="prompt-image"
                                        loading="lazy"
                                    />
                                )
                            )}
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

                            const multiple = isMultipleChoice(currentQuestion);

                            const optionClass = [
                                "answer-option",
                                selected ? "selected" : "",
                                feedbackShown && option.correct ? "is-correct" : "",
                                feedbackShown && selected && !option.correct
                                    ? "is-incorrect"
                                    : "",
                            ]
                                .filter(Boolean)
                                .join(" ");

                            return (
                                <button
                                    key={`${currentQuestion.id}-${index}`}
                                    type="button"
                                    className={optionClass}
                                    onClick={() => selectOption(index)}
                                    aria-pressed={selected}
                                    disabled={multiple && feedbackShown}
                                >
                                    <span className="option-marker">
                                        {selected
                                            ? "✓"
                                            : String.fromCharCode(65 + index)}
                                    </span>

                                    <span className="option-content">
                                        {option.image && (
                                            <img
                                                src={getImageUrl(
                                                    option.image,
                                                    test.id
                                                )}
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

                    {isMultipleChoice(currentQuestion) && (
                        <div className="answer-check">
                            <button
                                type="button"
                                className="test-button primary-button"
                                onClick={checkAnswer}
                                disabled={
                                    selectedOptions.length === 0 || feedbackShown
                                }
                            >
                                Verifică răspunsul
                            </button>
                        </div>
                    )}

                    {feedbackShown && (
                        <p className="answer-feedback" aria-live="polite">
                            {selectedOptions.length ===
                            getCorrectIndexes(currentQuestion).length &&
                            selectedOptions.every((index) =>
                                getCorrectIndexes(currentQuestion).includes(index)
                            )
                                ? "Corect! Ai selectat toate variantele corecte."
                                : "Răspuns incorect. Variantele corecte sunt evidențiate cu verde."}
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
