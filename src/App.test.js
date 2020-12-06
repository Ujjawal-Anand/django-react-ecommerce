import React from "react";
import ReactDOM from "react-dom";
import { Item } from "semantic-ui-react";
import App from "./App";

Item("rendres without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
