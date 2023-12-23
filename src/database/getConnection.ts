import { DataSource } from "typeorm";
import { datasource, datasourceTest } from "./ormconfig";
import { NODE_ENV } from "../secret/secret";

export default async function getConnection(): Promise<DataSource> {
    const ds = NODE_ENV === 'test' ? datasourceTest : datasource

    return await ds.initialize()


}