import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ThemeProvider } from "styled-components";
import theme from "./../styles/theme";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "../styles/GlobalStyle";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <Router />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
