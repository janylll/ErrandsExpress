import Header from './landing page/header.jsx'
import Footer from './landing page/Footer.jsx'
import LandingPage from './landing page/Landing Page.jsx';
import Card from './landing page/Card.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './log-in/Auth.jsx';

function App() {
  return(
    <>
        <Header/>
        <LandingPage/>
        <Card/>
        <Footer/>
        

    </>
  );
}

export default App
