const ESQUEMAVACINACAO = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/busca_esquema_vacinacao' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/busca_esquema_vacinacao')
const AGENDAMENTOSFEITOS = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/busca_agendamentos_feitos' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/busca_agendamentos_feitos')
const GRUPOATENDIMENTO = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/busca_grupo_atendimento' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/busca_grupo_atendimento')
const DOSEVACINACAO = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/busca_dose_vacinacao' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/busca_dose_vacinacao')
const PONTOVACINACAO = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/busca_ponto_vacinacao' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/busca_ponto_vacinacao')
const CRIAPACIENTE = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/localiza_cria_paciente_externo' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/localiza_cria_paciente_externo')
const CRIAAGENDAMENTO = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/cria_agendamento_paciente' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/cria_agendamento_paciente')
const AGENDASDISPONIVEIS = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/localiza_agendas_disponiveis' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/localiza_agendas_disponiveis')
const LOCALIZAAGENDAMENTO = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/localiza_agendamento_vacinacao' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/localiza_agendamento_vacinacao')
const ALTERAAGENDAMENTO = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/altera_agendamento_vacinacao' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/altera_agendamento_vacinacao')
const LOCALIZACRIAPACIENTEAGENDAMENTO = (process.env.NODE_ENV === 'production' ? 'http://www.novaserrana-mg.crescer.net/imu/agenda_vacinacao/api_agendamento/localiza_cria_paciente_externo_agendamento' : 'http://10.0.1.106:8050/imu/agenda_vacinacao/api_agendamento/localiza_cria_paciente_externo_agendamento')

const urlAPI = {
  ESQUEMAVACINACAO: ESQUEMAVACINACAO,
  AGENDAMENTOSFEITOS: AGENDAMENTOSFEITOS,
  GRUPOATENDIMENTO: GRUPOATENDIMENTO,
  DOSEVACINACAO: DOSEVACINACAO,
  PONTOVACINACAO: PONTOVACINACAO,
  CRIAPACIENTE: CRIAPACIENTE,
  CRIAAGENDAMENTO: CRIAAGENDAMENTO,
  AGENDASDISPONIVEIS: AGENDASDISPONIVEIS,
  LOCALIZAAGENDAMENTO: LOCALIZAAGENDAMENTO,
  ALTERAAGENDAMENTO: ALTERAAGENDAMENTO,
  LOCALIZACRIAPACIENTEAGENDAMENTO: LOCALIZACRIAPACIENTEAGENDAMENTO
}

export default urlAPI
