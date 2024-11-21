import con from "./connection.js"


export async function inserirReserva(reserva){
    const comando = `
        insert into ativadades (id_participante, id_atividade,data_reserva,stats)
            values (?,?,?,?)
    `;

    let resposta = await con.query(comando, [reserva.id_participante,reserva.id_atividade,reserva.data_reserva,reserva.stats, ])
    let info = resposta[0];

    return info.insertId;
}

export async function consultarReserva (reserva){
    const comando = `
    select id_atividade     id,
                id_participante participante,
                id_atividade    atividade,
                data_reserva    data_reserva,
                stats           stats,
    from reserva
    where id_reserva = ?
    `;

    let resposta = await con.query(comando(reserva));
    let registro = resposta[0];

    return registro;
}

export async function consultarReservaPorId (Id){
    const comando = `
    select id_atividade     id,
                id_participante participante,
                id_atividade    atividade,
                data_reserva    data_reserva,
                stats           stats,
    from reserva
    where id_reserva = ?
    `;

    let resposta = await con.query(comando(Id));
    let registro = resposta[0];

    return registro;
}

export async function alterarReserva(id,reserva){
    const comnando = `
        uptade reserva
            set id_participante = ?,
                id_atividade = ?,
                data_reserva = ?,
                stats = ?,
            where id_reserva    
    `;

    let resposta = await con.query(comnando[reserva.id_participante,reserva.id_atividade,reserva.data_reserva,reserva.stats, id])
    let info = resposta[0];

    return info.affectedRows;
}

export async function removerReserva(id){
    const comando = `
        delete from reserva
        where id_reserva = ?    
    `
    let resposta = await con.query(comando,[id]);
    let info = resposta[0];

    return info.affectedRows

}
