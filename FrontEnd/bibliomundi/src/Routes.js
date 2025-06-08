import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App';
import PageNotFound from "./pages/NotFound";
import PageHome from "./pages/Home";
import PageFuncionariosHome  from "./pages/Funcionarios/Consulta";
import CadastroFuncionario from "./pages/Funcionarios/Cadastro";
import PageClientesHome from "./pages/Clientes/Consulta";
import PageClientesCadastro from "./pages/Clientes/Cadastro";
import PageAutoresHome from "./pages/Acervo/Autores/Consulta";
import PageAutoresCadastro from "./pages/Acervo/Autores/Cadastro";
import PageGenerosHome from "./pages/Acervo/Genero/Consulta";
import PageGenerosCadastro from "./pages/Acervo/Genero/Cadastro";
import PageLivrosHome from "./pages/Acervo/Livros/Consulta";
import PageLivrosCadastro from "./pages/Acervo/Livros/Cadastro";

export default function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} exact />
                <Route path="/home" element={<PageHome />} exact />

                {/* Rotas de Funcionarios*/}
                <Route path="/funcionarios" element={<PageFuncionariosHome />} exact />
                <Route path="/funcionarios/cadastro" element={<CadastroFuncionario />} exact />
                <Route path="/funcionarios/cadastro/:id" element={<CadastroFuncionario />} exact />

                {/* Rotas de Clientes*/}
                <Route path="/clientes" element={<PageClientesHome />} exact />
                <Route path="/clientes/cadastro" element={<PageClientesCadastro />} exact />
                <Route path="/clientes/cadastro/:id" element={<PageClientesCadastro />} exact />

                {/* Rotas de Autores*/}
                <Route path="/acervo/autores" element={<PageAutoresHome />} exact />
                <Route path="/acervo/autores/cadastro" element={<PageAutoresCadastro />} exact /> 
                <Route path="/acervo/autores/cadastro/:id" element={<PageAutoresCadastro />} xact />

                {/* Rotas de Generos*/}
                <Route path="/acervo/generos" element={<PageGenerosHome />} exact />
                <Route path="/acervo/generos/cadastro" element={<PageGenerosCadastro />} exact /> 
                <Route path="/acervo/generos/cadastro/:id" element={<PageGenerosCadastro />} exact />

                {/* Rotas de Livros*/}
                <Route path="/acervo/livros" element={<PageLivrosHome />} exact />
                <Route path="/acervo/livros/cadastro" element={<PageLivrosCadastro />} exact /> 
                <Route path="/acervo/livros/cadastro/:id" element={<PageLivrosCadastro />} exact />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}