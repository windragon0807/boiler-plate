import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "antd/dist/antd.min.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ThemeProvider } from "styled-components";
import theme from "./../styles/theme";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Router />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
