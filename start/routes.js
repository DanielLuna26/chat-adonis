'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.post('/api/signin', 'AuthController.signIn')
Route.post('/api/signup', 'AuthController.signUp')
Route.get('/api/currentuser', 'AuthController.currentUser')

Route.get('/api/users', 'UserController.index')
Route.get('/api/users/:id', 'UserController.show')
Route.get('/api/groups/:id/users', 'UserController.roomusers')

Route.post('/api/chat', 'ChatController.store')
Route.get('/api/chat/:id', 'ChatController.userprivate')
Route.post('/api/chat/:id', 'ChatController.addPrivateMessage')

Route.post('/api/rooms', 'RoomController.store')
Route.get('/api/rooms', 'RoomController.index')
Route.get('/api/rooms/:id', 'RoomController.show')
Route.get('/api/users/:id/rooms', 'RoomController.userroom')
Route.put('/api/rooms/:id', 'RoomController.addMessage')

Route.post('/api/participants', 'ParticipantController.store')

Route.post('/api/files', 'FileController.store')
