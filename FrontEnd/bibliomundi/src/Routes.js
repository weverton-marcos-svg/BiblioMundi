import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App';
import PageNotFound from "./pages/NotFound";
import PageHome from "./pages/Home";

export default function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} exact />
                <Route path="/home" element={<PageHome />} exact />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}