import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import CV from "./pages/CV";
import TestPage from "./pages/TestPage";
import TestCatalog from "./pages/TestCatalog";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CV />} />
                    <Route path="/test" element={<TestCatalog />} />
                    <Route path="/test/:testId" element={<TestPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
