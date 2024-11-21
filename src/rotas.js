
import AtividadeController from './controller/AtividadeController.js';
import LocalController from './controller/LocalController.js';
import LoginController from './controller/LoginController.js';
import ParticipanteController from './controller/ParticipanteController.js';
import ReservaController from './controller/ReservaController.js';

export default function AdiconarRotas(servidor) {

servidor.use(AtividadeController);
servidor.use(LocalController);
servidor.use(LoginController);
servidor.use(ParticipanteController);
servidor.use(ReservaController);

}
    
