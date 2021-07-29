
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: '/agendamento', name: 'agendamento', component: () => import('src/pages/Agendamento.vue') },
      { path: '/cadastro', name: 'cadastro', component: () => import('src/pages/Cadastro.vue') },
      { path: '/confirmacao', name: 'confirmacao', component: () => import('src/pages/Confirmacao.vue') },
      { path: '/consulta', name: 'consulta', component: () => import('src/pages/Consulta.vue') },
      { path: '/disponibilidade', name: 'disponibilidade', component: () => import('src/pages/Disponibilidade.vue') }
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
