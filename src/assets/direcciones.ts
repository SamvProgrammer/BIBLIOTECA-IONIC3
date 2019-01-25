//const ip:string = "https://pigfish.herokuapp.com";
const ip:string = "http://10.172.23.241:8080";
export const direcciones:any = {
    login:ip+"/login",
    roles:ip+"/catalogos/roles",
    usuarios:ip+"/catalogos/usuarios",
    editorial:ip+"/catalogos/editorial",
    generos:ip+"/catalogos/generos",
    libros:ip+"/catalogos/libros",
    apartados:ip+"/operaciones/apartados",
    pedidos:ip+"/operaciones/pedidos",
    historico:ip+"/operaciones/historico"
};