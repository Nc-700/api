import con from "./connection.js";

export async function inserirAtividade(Atividades) {
    const comando = `
        INSERT INTO tb_Atividades (nome, descricao, data, hora_inicio, hora_fim, id_local, id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ? )
    `;

    let resposta = await con.query(comando, [
        Atividades.nome,
        Atividades.descricao,
        Atividades.data,
        Atividades.hora_inicio,
        Atividades.hora_fim,
        Atividades.id_local,
        Atividades.id_usuario
    ]);
    let info = resposta[0];

    return info.insertId;
}

export async function consultarAtividade(idAtividades) {
    const comando = `
        SELECT id_Atividades AS id,
               nome,
               descricao,
               data,
               hora_inicio AS horaInicio,
               hora_fim AS horaFim,
               id_local AS local,
               id_usuario AS usuario 
        FROM tb_Atividades
        WHERE id_Atividades
    `;

    let resposta = await con.query(comando, [idAtividades]);
    let registro = resposta[0];

    return registro;
}

export async function consultarAtividadePorId(id) {
    const comando = `
        SELECT id_Atividades AS id,
               nome,
               descricao,
               data,
               hora_inicio AS horaInicio,
               hora_fim AS horaFim,
               id_local AS local,
               id_usuario AS usuario 
        FROM tb_Atividades
        WHERE id_atividadeS = ?
    `;

    let resposta = await con.query(comando, [id]);
    let registro = resposta[0];

    return registro;
}

export async function alterarAtividade(id, Atividades) {
    const comando = `
        UPDATE tb_Atividades
        SET nome = ?,
            descricao = ?,
            data = ?,
            hora_inicio = ?,
            hora_fim = ?,
            id_local = ?,
            id_usuario = ?
        WHERE id_Atividades = ?
    `;

    let resposta = await con.query(comando, [
        Atividades.nome,
        Atividades.descricao,
        Atividades.data,
        Atividades.hora_inicio,
        Atividades.hora_fim,
        Atividades.id_local,
        Atividades.id_local,
        id
    ]);
    let info = resposta[0];

    return info.affectedRows;
}

export async function removerAtividades(id) {
    const comando = `
        DELETE FROM tb_Atividades
        WHERE id_Atividades = ?    
    `;

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}
