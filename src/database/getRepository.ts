import { EntityTarget, ObjectLiteral } from "typeorm";
import { datasource, datasourceTest, getDatasource } from "./ormconfig";
import { NODE_ENV } from "../secret/secret";

export default function getRepository<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>) {
    const ds = NODE_ENV === 'test' ? datasourceTest : datasource

    return ds.getRepository(entity)

}