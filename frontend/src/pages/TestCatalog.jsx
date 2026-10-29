
import { useState } from "react";
import { Link } from "react-router-dom";
import { tests } from "../dataJson/tests";
import "./TestCatalog.css";

export default function TestCatalog() {
    const categories = Object.groupBy
        ? Object.groupBy(tests, (test) => test.category)
        : tests.reduce((groups, test) => {
            const category = test.category;

            if (!groups[category]) {
                groups[category] = [];
            }

            groups[category].push(test);

            return groups;
        }, {});

    const [expandedCategories, setExpandedCategories] = useState({
        "Biochimie II": true,
        "Farmacognozie II": true,
    });

    function toggleCategory(category) {
        setExpandedCategories((previous) => ({
            ...previous,
            [category]: !previous[category],
        }));
    }

    return (
        <main className="test-catalog">
            <header className="catalog-header">
                <p className="catalog-eyebrow">TESTE INTERACTIVE</p>
                <h1>Alege un test</h1>
                <p>
                    Învață în ritmul tău și verifică-ți cunoștințele.
                </p>
            </header>

            <div className="catalog-categories">
                {Object.entries(categories).map(([category, categoryTests]) => {
                    const isExpanded = expandedCategories[category];

                    return (
                        <section
                            className="catalog-category"
                            key={category}
                        >
                            <button
                                type="button"
                                className="catalog-category-toggle"
                                onClick={() => toggleCategory(category)}
                                aria-expanded={Boolean(isExpanded)}
                            >
                                <span className="catalog-category-info">
                                    <span className="catalog-category-title">
                                        {category}
                                    </span>

                                    <span className="catalog-category-count">
                                        {categoryTests.length} teste
                                    </span>
                                </span>

                                <span
                                    className={`catalog-category-arrow ${
                                        isExpanded ? "is-expanded" : ""
                                    }`}
                                    aria-hidden="true"
                                >
                                    ▾
                                </span>
                            </button>

                            {isExpanded && (
                                <div className="catalog-grid">
                                    {categoryTests.map((test, index) => (
                                        <Link
                                            key={test.id}
                                            to={`/test/${test.id}`}
                                            className="catalog-card"
                                        >
                                            <span className="catalog-card-number">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <h2>{test.title}</h2>
                                            <p>{test.description}</p>

                                            <span className="catalog-card-action">
                                                Începe testul →
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </section>
                    );
                })}
            </div>
        </main>
    );
}
