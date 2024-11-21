import con from "./connection.js"


export async function inserirLocal(local) {
    const comando = `
        insert into tb_local (nome, endereço , capacidade)
            values (?,?,?)
    `;

    let resposta = await con.query(comando, [local.nome,local.endereço, local.capacidade])
    let info = resposta[0];

    return info.insertId;
}

export async function consultarLocal(local) {
    const comando = `
    select id_local     id,
                nome nome,
                endereço endereço,
                capacidade capacidade
    from tb_local
    where id_local
    `;

    let resposta = await con.query(comando,(local));
    let registro = resposta[0];

    return registro;
}

export async function consultarLocalPorId(Id) {
    const comando = `
    select id_local     id,
                nome nome,
                endereço endereço,
                capacidade capacidade
    from tb_local
    where id_local = ?
    `;

    let resposta = await con.query(comando,(Id));
    let registro = resposta[0];

    return registro;
}

export async function alterarLocal(id, local) {
    const comando = `
        update tb_local
            set nome = ?,
                endereço = ?,
                capacidade = ?             
            where id_local = ?    
    `;

    let resposta = await con.query(comando, [local.nome,local.endereço,local.capacidade, id])
    let info = resposta[0];

    return info.affectedRows;
}

export async function removerLocal(id) {
    const comando = `
        delete from tb_local
        where id_local = ?    
    `
    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows

}
