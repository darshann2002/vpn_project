import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { EmployeeEntity } from "./employee.entity";


@Injectable()
export class EmployeeEntityRepository extends Repository<EmployeeEntity>{
    constructor(private dataSource: DataSource) {
        super(EmployeeEntity, dataSource.createEntityManager());
    }
}