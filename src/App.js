import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomePage from './components/home/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { AllProducts } from './allProducts/allProducts';
import { Route,Routes } from 'react-router-dom';
import NotFound from './components/notFound/NotFound';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/allproducts' element={<AllProducts/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
