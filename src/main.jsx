import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SocketProvider from "./SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </BrowserRouter>
);
