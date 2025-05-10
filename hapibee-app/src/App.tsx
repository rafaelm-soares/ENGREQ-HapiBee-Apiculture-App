import './css/main.css';
import "./css/styleVariables.css";

import { Component, Suspense } from 'react';
import { Provider } from 'react-redux';
import store from 'src/redux/storage/store';
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "src/redux/contexts/authContext";
import Routes from "src/redux/routes/routes";
import Head from "src/components/head";
import Loader from "src/components/loader/loader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Head />
          <ToastContainer
            draggable
            autoClose={1000}
          />
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </Suspense>
          </AuthProvider>
        </div>
      </Provider>
    );
  }
}

export default App;
