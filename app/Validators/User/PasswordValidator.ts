import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PasswordValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    password: schema.string([
      rules.required()
    ]),
  })
}
