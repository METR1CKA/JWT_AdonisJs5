import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string([
      rules.required()
    ]),
    password: schema.string([
      rules.required()
    ]),
    username: schema.string([
      rules.required()
    ])
  })
}
