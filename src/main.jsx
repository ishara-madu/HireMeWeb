import ReactDOM from "react-dom/client";
// import App from './App.jsx'
import Home from './screens/Home.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router";
import Search from "./screens/Search.jsx";
import Listing from "./screens/Listing.jsx";
import WorkerListing from "./screens/WorkerListing.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="listing" element={<Listing />} />
        <Route path="showlisting" element={<WorkerListing />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)
