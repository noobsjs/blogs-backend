import * as crypto from 'crypto'

export default async (passwordToHash: string): Promise<{salt: string, password: string}> => {
  // create salt
  const salt = await new Promise<string>((res, rej) => {
    crypto.randomBytes(48, (err, buff) => {
      if (err) rej(err)
      else res(buff.toString('hex'))
    })
  })

  const password = salt + passwordToHash

  // hash password
  const hash = crypto.createHash('sha512')
  hash.update(password)

  return {
    salt,
    password: hash.digest('hex')
  }
}