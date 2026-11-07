import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider  } from "./context/ToastContext";
import Toast from "./components/common/Toast";


const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toast />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;