// App.jsx
import { AuthProvider } from "./context/AuthContext";
import CV from "./pages/CV";

function App() {
    return (
        <AuthProvider>
            <CV />
        </AuthProvider>
    );
}

export default App;