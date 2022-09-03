import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "redux/store";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "styles/GlobalStyle";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <GlobalStyle />
                        <Router />
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
