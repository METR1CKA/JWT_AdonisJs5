import User from "App/Models/User"
import LoginValidator from "App/Validators/User/LoginValidator"
import RegisterValidator from "App/Validators/User/RegisterValidator"

export default class AuthController {
  public async register ({request, response}){
    try{
      const register = await request.validate(RegisterValidator)
      if(register){
        await User.create(register)
        response.ok({message:'Registro creado con exito'})
      }
    }catch(error){
      console.error(error)
      response.badRequest({error:{message:'Error en el envio de datos'}})
    }
  }

  public async login ({request, response, auth}){
    try{
      const data = await request.validate(LoginValidator)
      if(data){
        try{
          const auths = await auth.use('jwt').attempt(data.email, data.password)
          response.ok({message:'Sesion iniciada con exito', auths})
        }catch(error){
          console.error(error)
          response.badRequest({error:{message:'Contraseña o email incorrectos'}})
        }
      }
    }catch(error){
      console.error(error)
      response.badRequest({error:{message:'Error en el envio de datos'}})
    }
  }

  public async logout ({response, auth}){
    try{
      const authen = await auth.use('jwt').authenticate()
      if(authen){
        await auth.use('jwt').revoke()
        response.ok({message:'Sesion cerrada con exito'})
      }
    }catch(error){
      console.error(error)
      response.unauthorized({message:'No estas autenticado'})
    }
  }

  public async me ({response, auth}){
    try{
      const auths = await auth.use('jwt').authenticate()
      if(auths){
        const me = await User.findOrFail(auths.id)
        response.ok({message:'Sus datos', me})
      }
    }catch(error){
      console.error(error)
      response.unauthorized({message:'No estas autenticado'})
    }
  }
}
