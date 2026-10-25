import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import CV from "./pages/CV";
import TestPage from "./pages/TestPage";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CV />} />
                    <Route path="/test" element={<TestPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
