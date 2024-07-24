import { ProcessEnum } from "@vpn-project/shared-models";
import { Column, Entity, PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity('vpn')
export class VpnEntity {

    @PrimaryGeneratedColumn("increment", { name: 'id' })
    id: number;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "employee_id"
    })
    employeeId: string;

    @Column("enum", {
        name: "status",
        enum: ProcessEnum
    })
    status: ProcessEnum;

    @Column({ name: 'access_status', type: 'tinyint'})
    accessStatus: string;
}