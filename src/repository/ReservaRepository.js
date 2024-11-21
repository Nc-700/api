import con from "./connection.js"


export async function inserirReserva(reserva) {
    const comando = `
        insert into tb_Reserva (data_reserva,id_Atividades,id_Participantes,stats)
            values (?,?,?,?)
    `;

    let resposta = await con.query(comando, [reserva.data_reserva, reserva.id_Atividades, reserva.id_participante, reserva.stats,])
    let info = resposta[0];

    return info.insertId;
}

export async function consultarReserva(reserva) {
    const comando = `
    select id_reserva    id,
                data_reserva    data_reserva,
                id_atividades    atividade,
                id_participantes participante,     
                stats           stats
    from tb_Reserva
    where id_reserva 
    `;

    let resposta = await con.query(comando, (reserva));
    let registro = resposta[0];

    return registro;
}

export async function consultarReservaPorId(Id) {
    const comando = `
     select id_reserva    id,
                id_atividades    atividade,
                id_participantes participante,
                data_reserva    data_reserva,
                stats           stats
    from tb_Reserva
    where id_reserva = ?
    `;

    let resposta = await con.query(comando, (Id));
    let registro = resposta[0];

    return registro;
}

export async function alterarReserva(id, reserva) {
    const comando = `
        UPDATE tb_Reserva
            SET id_Atividades = ?,
                id_Participantes = ?,
                data_reserva = ?,
                stats = ?
            WHERE id_reserva = ?   
    `;

    let resposta = await con.query(comando, [reserva.id_atividade, reserva.id_participante, reserva.data_reserva, reserva.stats, id])
    let info = resposta[0];

    return info.affectedRows;
}

export async function removerReserva(id) {
    const comando = `
        delete from tb_Reserva
        where id_reserva = ?    
    `
    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows

}
