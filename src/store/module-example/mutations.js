export const updateNompaciente = (state, opened) => {
  state.nompaciente = opened
}

export const updateNumcpf = (state, opened) => {
  state.numcpf = opened
}

export const updateDatanascimento = (state, opened) => {
  state.datnascimento = opened
}

export const updateNommae = (state, opened) => {
  state.nommae = opened
}

export const updateTelcontato = (state, opened) => {
  state.telcontato = opened
}

export const updateCoDose = (state, opened) => {
  state.co_dose = opened
}

export const updateEsuGrupoAtendimento = (state, opened) => {
  state.esu_grupo_atendimento_id = opened
}

export const updateNumPaciente = (state, opened) => {
  state.numpacienteexterno = opened
}

export const updateAgendamentos = (state, opened) => {
  state.imu_agendamento_vacinacao_ids = opened
}

export const updateNewAgendamentos = (state, opened) => {
  state.imu_agendamento_vacinacao_id = opened
}

export const updateImuEsquemaVacinacao = (state, opened) => {
  state.imu_esquema_vacinacao_id = opened
}

export const clearDadosPaciente = (state, opened) => {
  state.nompaciente = null
  state.numcpf = null
  state.datnascimento = null
  state.nommae = null
  state.telcontato = null
  state.imu_esquema_vacinacao_id = null
  state.co_dose = []
  state.esu_grupo_atendimento_id = []
}

export default function () {
  return {
    nompaciente: null,
    numcpf: null,
    datnascimento: null,
    nommae: null,
    telcontato: null,
    imu_esquema_vacinacao_id: null,
    co_dose: null,
    esu_grupo_atendimento_id: null,
    numpacienteexterno: null,
    imu_agendamento_vacinacao_id: null,
    imu_agendamento_vacinacao_ids: []
  }
}
