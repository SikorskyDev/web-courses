import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./pages/App";
import store, { persister } from "./redux/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <HashRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
                <App />
            </PersistGate>
        </Provider>
    </HashRouter>
);
