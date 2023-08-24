//Aqui eu importaria as bibliotecas
import { Routes, Route } from "react-router-dom";

//Aqui eu importarei minhas páginas
import { New } from "../pages/New";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Details } from "../pages/Details";

//Aqui eu estou fazendo a exportação da função
export function AppRoutes(){
    return(
        //O componente Routes envolverá todas as minhas rotas
        //O componente Route receberá a página em questão e indicará qual endereço de URL referencia cada página
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/new" element={<New />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/details/:id" element={<Details />}/>
        </Routes>
    )
}