import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/Login/Login'
import RegistrationPage from '@/pages/Registration/Registratoin'
import CatalopPage from '@/pages/Catalog/Catalog'
import CategoryPage from '@/pages/Category/Category'
import GoodPage from './pages/Good/Good'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CategoryPage />} />
        <Route path='/category/:categoryId' element={<CatalopPage />} />
        <Route path='/category/:categoryId/good/:goodId' element={<GoodPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
