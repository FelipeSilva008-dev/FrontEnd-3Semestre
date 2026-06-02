import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./components/home/Home";
import Perfil from "./components/perfil/perfil";
import Header from "./components/header/Header";
import Produto from './components/produto/Produto';
import CadastroProduto from './components/cadastroProdutos/CadastroProduto';
import ListarProduto from './components/listaProduto/ListarProduto';


function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/produto" element={<Produto />} />
        <Route path="/cadastrarProduto" element={<CadastroProduto />} />
        <Route path="/listarProduto" element={<ListarProduto />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
