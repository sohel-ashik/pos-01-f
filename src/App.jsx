import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import ProductAdding from './pages/ProductAddingPage';
import SellAdding from './pages/SellAdding';
import InhouseDetails from './pages/InhouseDetails';
import DueDetails from './pages/DueDetails';
import Report from './pages/Report';
import Navigation from './pages/Navigation';
import ReportDetails from './pages/NestedPages/ReportDetails';

function App() {

  return (
    <BrowserRouter>
        <Navigation/>
        <Routes>
            <Route path='/' element={<Navigate to='/buy'/>} />
            <Route path='/buy' element={<ProductAdding/>}/>
            <Route path='/sell' element={<SellAdding/>}/>
            <Route path='/inhouse' element ={<InhouseDetails/>}/>
            <Route path='/stakeholders' element={<DueDetails/>}/>
            <Route path='/reports' element={<Report/>}/>
            <Route path='/reportdetails' element={<ReportDetails/>}/>
        </Routes>
    </BrowserRouter>
    
  )
}

export default App;
