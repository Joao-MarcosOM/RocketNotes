//Aqui eu importaria as bibliotecas
import { Routes, Route } from "react-router-dom";

//Aqui eu importarei minhas páginas
import { Signin } from "../pages/Signin";
import { SignUp } from "../pages/SignUp";

//Aqui eu estou fazendo a exportação da função
export function AuthRouts(){
    return(
        //O componente Routes envolverá todas as minhas rotas
        //O componente Route receberá a página em questão e indicará qual endereço de URL referencia cada página
        <Routes>
            <Route path="/" element={<Signin />}/>
            <Route path="/register" element={<SignUp />}/>
        </Routes>
    )
}