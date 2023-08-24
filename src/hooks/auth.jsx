import { createContext , useContext, useState, useEffect} from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [data , setData] = useState({});

    //Aqui eu estou criando a função de autenticação
    async function signIn({ email, password}){
        try{
            const response = await api.post("/session", {email , password});
            const { user, token} = response.data;

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
            localStorage.setItem("@rocketnotes:token", token);

            //Aqui eu estou adicionando no cabeçalho de todas as minhas requisições o token de autorização do usuário
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setData({ user , token});
        }catch(e){
            if(e.response){
                alert(e.response.data.message);
            }else{
                alert("Não foi possível entrar");
            }
        }
    }
    
    function signOut(){
        localStorage.removeItem("@rocketnotes:user");
        localStorage.removeItem("@rocketnotes:token");

        setData({});
    }

    async function updateProfile({ user , avatarFile }){
        try{

            if(avatarFile){
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);

                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;
            }

            await api.put("/users",user);
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
            setData({ user, token: data.token });
            alert("Perfil atualizado!")
        }catch(e){
            if(e.response){
                alert(e.response.data.message);
            }else{
                alert("Não foi atualizar o perfil");
            }
        }
    }

    

    useEffect(() => {
        const token = localStorage.getItem("@rocketnotes:token");
        const user = localStorage.getItem("@rocketnotes:user");

        if(token && user){
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setData({
                token,
                user: JSON.parse(user)
            })
        }
    }, []);

    return(
        <AuthContext.Provider value={{signIn, user:data.user, signOut, updateProfile}}>
            {children}
        </AuthContext.Provider>
    )
}

//Aqui eu estou criando o hook
function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider , useAuth};