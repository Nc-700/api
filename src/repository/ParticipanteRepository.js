import con from "./connection.js"


export async function inserirParcipante(participante) {
    const comando = `
        insert into tb_Participante (nome,email,telefone,id_Atividades,id_Usuario)
            values (?,?,?,?,?)
    `;

    let resposta = await con.query(comando, [participante.nome, participante.email, participante.id_Atividades, participante.id_Usuario])
    let info = resposta[0];

    return info.insertId;
}

export async function consultarParticipante(participante) {
    const comando = `
    select id_Participante  id,
                nome        nome,
                email       email,
                telefone    telefone,
                id_Atividades AS id_atividade,
                id_Usuario AS id_usuario    

    from tb_participante
    where id_participante 
    `;

    let resposta = await con.query(comando, (participante));
    let registro = resposta[0];

    return registro;
}

export async function consultarParticipantePorId(Id) {
    const comando = `
    select id_participante  id,
                nome        nome,
                email       email,
                telefone    telefone,
                id_Atividades AS atividade,
                id_Usuario AS usuario                  
    from tb_Participante
    where id_participante = ?
    `;

    let resposta = await con.query(comando, (Id));
    let registro = resposta[0];

    return registro;
}

export async function alterarParticipante(id, participante) {
    const comando = `
        UPDATE tb_Participante
            SET nome = ?,
                email = ?,
                telefone = ?,
                id_Atividades = ?,
                id_Usuario = ?
            WHERE id_participante = ?   
    `;

    let resposta = await con.query(comando,[participante.nome, participante.email, participante.telefone,participante.id_Atividades,participante.id_Usuario ,id])
    let info = resposta[0];

    return info.affectedRows;
}

export async function removerParticipante(id) {
    const comando = `
        delete from tb_Participante
        where id_participante = ?    
    `
    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows

}
