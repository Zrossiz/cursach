import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login'
import RegistrationPage from './pages/registratoin'
import CategoryPage from './pages/category'
import ProductPage from './pages/product'
import CatalopPage from './pages/catalog'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CategoryPage />} />
        <Route path='/category/:categoryId' element={<CatalopPage />} />
        <Route path='/category/:categoryId/product/:productId' element={<ProductPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
