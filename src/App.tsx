import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';
import BankLogos from './components/BankLogos';
import Steps from './components/Steps';
import FAQ from './components/FAQ';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        <About />
        <BankLogos></BankLogos>
        <Steps></Steps>
        <FAQ></FAQ>
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
