import dotenv from 'dotenv'
import path from 'path'

class Config {
  public static config() {
    dotenv.config({ path: path.join(__dirname, '../../.env') })

    const port: number = (process.env.PORT as never) || 3000
    const env: string = process.env.NODE_ENV || 'development'
    const url: string = process.env.APP_URL || `http://localhost:${port}`

    return {
      port,
      env,
      url,
    }
  }
}

export default Config
