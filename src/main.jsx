import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import Home from './Home.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import Footer from './components/footer/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <Home />
      <Footer/>
    </Provider>
  </StrictMode>,
)
