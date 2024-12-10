import ReactDOM from "react-dom/client";
// import App from './App.jsx'
import Home from './screens/Home.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router";
import Search from "./screens/Search.jsx";
import Listing from "./screens/Listing.jsx";
import WorkerListing from "./screens/WorkerListing.jsx";
import Notifications from "./screens/Notifications.jsx";
import Favorites from "./screens/Favorites.jsx";
import EditProfile from "./screens/EditProfile.jsx";
import AccountSettings from "./screens/AccountSettings.jsx";
import Documentations from "./screens/Documentations.jsx";
import EditListings from "./screens/EditListings.jsx";
import ComingSoon from "./screens/ComingSoon.jsx";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="listing" element={<Listing />} />
        <Route path="show-listings" element={<WorkerListing />} />
        <Route path="show-listings/manage" element={<EditListings />} />
        <Route path="notifications" element={<ComingSoon />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="account-settings" element={<ComingSoon />} />
        <Route path="documentations" element={<ComingSoon />} />
        <Route path="comingsoon" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)

