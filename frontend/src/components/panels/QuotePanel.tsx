import {Panel} from "../Panel";
import {SectionLabel} from "../SectionLabel";
import { Quote } from "lucide-react";
import { useMemo } from "react";

const quotes = [
    {
        text: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
    },
    {
        text: "Programs must be written for people to read, and only incidentally for machines to execute.",
        author: "Harold Abelson"
    },
    {
        text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler"
    },
    {
        text: "Clean code always looks like it was written by someone who cares.",
        author: "Robert C. Martin"
    },
    {
        text: "The best way to predict the future is to invent it.",
        author: "Alan Kay"
    },
    {
        text: "Simplicity is the soul of efficiency.",
        author: "Austin Freeman"
    },
    {
        text: "Make it work, make it right, make it fast.",
        author: "Kent Beck"
    },
    {
        text: "Before software can be reusable it first has to be usable.",
        author: "Ralph Johnson"
    },
    {
        text: "The only way to learn a new programming language is by writing programs in it.",
        author: "Dennis Ritchie"
    },
    {
        text: "Great software is built by great engineers, not just great programmers.",
        author: "Unknown"
    },
    {
        text: "A good developer solves problems. A great developer prevents them.",
        author: "Unknown"
    },
    {
        text: "Simplicity is prerequisite for reliability.",
        author: "Edsger W. Dijkstra"
    },
    {
        text: "Software is a great combination between artistry and engineering.",
        author: "Bill Gates"
    },
    {
        text: "The function of good software is to make the complex appear simple.",
        author: "Grady Booch"
    },
    {
        text: "Talk is cheap. Show me the code.",
        author: "Linus Torvalds"
    },
    {
        text: "Any sufficiently advanced technology is indistinguishable from magic.",
        author: "Arthur C. Clarke"
    }
];

export default function QuotePanel() {

    const quote = useMemo(() => {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }, []);

    return (
        <Panel className="p-6">
            <SectionLabel icon={Quote}>
                Developer mindset
            </SectionLabel>

            <div className="mt-5">
                <p className="text-lg italic text-slate-200">
                    "{quote.text}"
                </p>

                <p className="mt-4 text-sm text-slate-200">
                    — {quote.author}
                </p>
            </div>
        </Panel>
    );
}