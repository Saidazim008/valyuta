import { Routes, Route } from 'react-router-dom';
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./pages/home/Home";
import './App.css';


function App() {
  return (
    <div className="app-wrapper app-container " style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>


      <Header />


      <div style={{ display: 'flex', flex: 1 }}>

        <main style={{ flex: 1, padding: '20px', backgroundColor: '#f4f4f4' }}>
          <Routes>
            <Route path="/" element={<Home />} />
           
          </Routes>
        </main>

      </div>


      <Footer />

    </div>
  );
}

export default App;