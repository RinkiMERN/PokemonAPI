import React from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import PokemonApi from "./components/PokemonApi";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <Navbar />
          <PokemonApi />
        </ErrorBoundary>
      </Provider>
    </>
  );
};

export default App;
