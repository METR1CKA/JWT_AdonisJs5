/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

//AUTH
Route.group(() =>{
  Route.post('register','AuthController.register')
  Route.post('login','AuthController.login')
  Route.post('logout','AuthController.logout')
  Route.get('me','AuthController.me')
}).prefix('api/auth')

//v1
Route.group(() =>{
  //USERS
  Route.group(() =>{
    Route.get('read','UsersController.index')
    Route.get('read/:id','UsersController.show')
    Route.put('update/:id','UsersController.update')
    Route.delete('delete/:id','UsersController.delete')
    Route.put('password/update','UsersController.passwordUpdate')
  }).prefix('users')
}).prefix('api/v1')
