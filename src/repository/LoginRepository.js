import con from "./connection.js"

export async function inserirUsuario(usuario){
    const comando = `INSERT INTO Usuario (email, senha)
                            VALUES (?, ?)`;

    let resposta = await con.query(comando, [usuario.email, usuario.senha]);

    console.log(resposta[0]);

    let info = resposta[0];

    return info.insertId;
}

export async function verificarUsuarioPorEmail(email) {
    const comando = `SELECT id_Usuario, email
                        FROM Usuario WHERE email = ?`

    const resposta = await con.query(comando, [email]);
    return resposta[0][0];
}

export async function consultarUsuario(usuario){
    const comando = `SELECT id_Usuario  id,
                            email       email,
                            senha
                    FROM Usuario WHERE email = ? and senha = ?`;
            
    const resposta = await con.query(comando, [usuario.email, usuario.senha]);
    return resposta[0][0];
}

export async function consultarUsuarioporId (Id){
    const comando = `
    select id_usuario       id,
                email       email,
                senha       senha
    from usuario
    where id_usuario = ?
    `;

    let resposta = await con.query(comando(Id));
    let registro = resposta[0];

    return registro;
}

export async function alterarUsuario(id,usuario){
    const comnando = `
        uptade usuario
            set email = ?,
                senha = ?
            where id_usuario  
    `;

    let resposta = await con.query(comnando,[usuario.nome,usuario.email,usuario.senha,id])
    let info = resposta[0]

    return info.affectedRows;
}

export async function removerUsuario(id){
    const comando = `
        delete from usuario
        where id_usuario = ?    
    `
    let resposta = await con.query(comando,[id]);
    let info = resposta[0];

    return info.affectedRows

}
