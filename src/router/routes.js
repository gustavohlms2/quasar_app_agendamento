
const routes = [
  {
    path: '/',
    component: () => import('layouts/IndexLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/agendamento',
    component: () => import('layouts/AgendamentoLayout.vue'),
    children: [
      { path: '', name: 'agendamento', component: () => import('src/pages/Agendamento.vue') }
    ]
  },

  {
    path: '/cadastro',
    component: () => import('layouts/CadastroLayout.vue'),
    children: [
      { path: '', name: 'cadastro', component: () => import('src/pages/Cadastro.vue') }
    ]
  },

  {
    path: '/confirmacao',
    component: () => import('layouts/ConfirmacaoLayout.vue'),
    children: [
      { path: '', name: 'confirmacao', component: () => import('src/pages/Confirmacao.vue') }
    ]
  },

  {
    path: '/consulta',
    component: () => import('layouts/ConsultaLayout.vue'),
    children: [
      { path: '', name: 'consulta', component: () => import('src/pages/Consulta.vue') }
    ]
  },

  {
    path: '/disponibilidade',
    component: () => import('layouts/DisponibilidadeLayout.vue'),
    children: [
      { path: '', name: 'disponibilidade', component: () => import('src/pages/Disponibilidade.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
