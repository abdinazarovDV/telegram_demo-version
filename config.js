import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 8585

export const TOKEN_TIME = 60 * 60 * 48

export const TOKEN_KEY = "ASZXDCFBGVQTOHGOKMNHYR"