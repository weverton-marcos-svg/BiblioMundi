import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App';
import PageNotFound from "./pages/NotFound";
import PageHome from "./pages/Home";
import PageFuncionariosHome  from "./pages/Funcionarios/Consulta";
import CadastroFuncionario from "./pages/Funcionarios/Cadastro";
import PageClientesHome from "./pages/Clientes/Consulta";
import PageClientesCadastro from "./pages/Clientes/Cadastro";

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
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}