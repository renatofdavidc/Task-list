import AuthController from '#controllers/auth_controller'
import TasksController from '#controllers/tasks_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('/create', [TasksController, 'create'])
  router.put('/complete/:id', [TasksController, 'complete'])
  router.get('/all', [TasksController, 'getTasksByUser'])
  router.put('/update/:id', [TasksController, 'updateTask'])
}).use(middleware.authMiddleware()).prefix('/tasks')

router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
})
