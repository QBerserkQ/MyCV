
import { Link } from "react-router-dom";
import { tests } from "../dataJson/tests";
import "./TestCatalog.css";

export default function TestCatalog() {
    return (
        <main className="test-catalog">
            <header className="catalog-header">
                <p className="catalog-eyebrow">TESTE INTERACTIVE</p>
                <h1>Alege un test</h1>
                <p>Învață în ritmul tău și verifică-ți cunoștințele.</p>
            </header>

            <section className="catalog-grid">
                {tests.map((test, index) => (
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
            </section>
        </main>
    );
}
