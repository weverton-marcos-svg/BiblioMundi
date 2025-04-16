import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App';
import PageNotFound from "./pages/NotFound";
import PageHome from "./pages/Home";
import PageFuncionariosHome  from "./pages/Funcionarios/Consulta";
import CadastroFuncionario from "./pages/Funcionarios/Cadastro";

export default function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} exact />
                <Route path="/home" element={<PageHome />} exact />
                <Route path="/funcionarios" element={<PageFuncionariosHome />} exact />
                <Route path="/funcionarios/cadastro" element={<CadastroFuncionario />} exact />
                <Route path="/funcionarios/cadastro/:id" element={<CadastroFuncionario />} exact />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}