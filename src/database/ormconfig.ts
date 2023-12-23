import "reflect-metadata"
import { DataSource,getConnectionManager } from "typeorm"
import { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_TEST_HOST, POSTGRES_TEST_PORT, POSTGRES_TEST_USER, POSTGRES_TEST_PASSWORD, POSTGRES_TEST_DB } from "../secret/secret"
import { User } from "../entities/User"

export const datasource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ["./src/entities/**/*.ts"],
  synchronize: true,
  logging: false,
})

export const datasourceTest = new DataSource({
  type: "postgres",
  host: POSTGRES_TEST_HOST,
  port: POSTGRES_TEST_PORT,
  username: POSTGRES_TEST_USER,
  password: POSTGRES_TEST_PASSWORD,
  database: POSTGRES_TEST_DB,
  entities: ["./src/entities/**/*.ts"],
  synchronize: true,
  logging: false,
})

export function getDatasource() {
  if (datasource.isInitialized) {
    return datasource
  }
  // if (datasourceTest.isInitialized) {
  //   return datasourceTest
  // }
}

