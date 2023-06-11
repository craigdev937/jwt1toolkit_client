import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { Main } from "../routes/Main";
import { Reducer } from "../global/RootReducer";

export const App = () => {
    return (
        <Provider store={Reducer}>
            <React.Fragment>
                <Main />
            </React.Fragment>
        </Provider>
    );
};



