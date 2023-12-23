import * as dotenv from "dotenv"

dotenv.config()

const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost"
const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '5432')
const POSTGRES_DB = process.env.POSTGRES_DB || "postgres"
const POSTGRES_USER = process.env.POSTGRES_USER || "postgres"
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || ""

const POSTGRES_TEST_HOST = process.env.POSTGRES_TEST_HOST || "localhost"
const POSTGRES_TEST_PORT = parseInt(process.env.POSTGRES_TEST_PORT || '5433')
const POSTGRES_TEST_DB = process.env.POSTGRES_TEST_DB || "postgres"
const POSTGRES_TEST_USER = process.env.POSTGRES_TEST_USER || "postgres"
const POSTGRES_TEST_PASSWORD = process.env.POSTGRES_TEST_PASSWORD || ""


const SERVER_PORT = parseInt(process.env.SERVER_PORT || '3000')
const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
const SERVER_DOC = process.env.SERVER_DOC || './'

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret"
const NODE_ENV = process.env.NODE_ENV || 'dev'

export {
  JWT_SECRET,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_HOST,
  POSTGRES_TEST_PORT,
  POSTGRES_TEST_DB,
  POSTGRES_TEST_USER,
  POSTGRES_TEST_PASSWORD,
  SERVER_PORT,
  SERVER_HOST,
  SERVER_DOC,
  NODE_ENV
}
