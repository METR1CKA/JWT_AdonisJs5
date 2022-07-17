// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"
import PasswordValidator from "App/Validators/User/PasswordValidator"
import UserValidator from "App/Validators/User/UserValidator"

export default class UsersController {

  public async index ({response, auth}){
    try{
      await auth.use('jwt').authenticate()
      const users = await User.all()
      response.ok({message:'Usuarios obtenidos', users})
    }catch(error){
      console.error(error)
      response.unauthorized({error:{message:'No autenticado'}})
    }
  }

  public async show ({response, auth, params}) {
    try{
      await auth.use('jwt').authenticate()
      try{
        const user = await User.findOrFail(params.id)
        response.ok({messsage:'Usuario obtenido',user})
      }catch(error){
        console.error(error)
        response.notFound({error:{message:'No encontrado'}})
      }
    }catch(error){
      console.error(error)
      response.unauthorized({error:{message:'No autenticado'}})
    }
  }

  public async update ({request, response, auth, params}){
    try{
      await auth.use('jwt').authenticate()
      try{
        const upgrade = await request.validate(UserValidator)
        if(upgrade){
          try{
            const user = await User.findOrFail(params.id)
            if(user){
              user.merge(upgrade).save()
              response.ok({message:'Registro actualizado'})
            }
          }catch(error){
            console.error(error)
            response.notFound({error:{message:'No encontrado'}})
          }
        }
      }catch(error){
        console.error(error)
        response.badRequest({error:{message:'Error en el envio de datos'}})
      }
    }catch(error){
      console.error(error)
      response.unauthorized({error:{message:'No autenticado'}})
    }
  }

  public async delete ({response, auth, params}){
    try{
      await auth.use('jwt').authenticate()
      try{
        const user = await User.findOrFail(params.id)
        if(user){
          await user.delete()
          response.ok({message:'Borrado con exito'})
        }
      }catch(error){
        console.error(error)
        response.notFound({error:{message:'No encontrado'}})
      }
    }catch(error){
      console.error(error)
      response.unauthorized({error:{message:'No autenticado'}})
    }
  }

  public async passwordUpdate ({response, request, auth}){
    try{
      await auth.use('jwt').authenticate()
      try{
        const data = await request.validate(PasswordValidator)
        if(data){
          try{
            const user = await User.findOrFail(auth.use('jwt').user.id)
            user.merge(data).save()
            response.ok({message:'Contraseña actualizada'})
          }catch(error){
            console.error(error)
            response.notFound({error:{message:'No encontrado'}})
          }
        }
      }catch(error){
        console.error(error)
        response.badRequest({error:{message:'Error en el envio de datos'}})
      }
    }catch(error){
      console.error(error)
      response.unauthorized({error:{message:'No autenticado'}})
    }
  }
}
