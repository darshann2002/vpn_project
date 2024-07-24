import { Column, Entity, PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity('vpn_employee')
export class EmployeeEntity {

    @PrimaryGeneratedColumn("increment", { name: 'id' })
    id: number;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "employee_id"
    })
    employeeId: string;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "name"
    })
    name: string;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "email_id"
    })
    emailId: string;

    @Column("varchar", {
        nullable: true,
        length: 12,
        name: "mob_no"
    })
    mobNo: string;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "designation"
    })
    designation: string;

    @Column("varchar", {
        nullable: true,
        name: "department"
    })
    department: string;

    @Column("varchar", {
        nullable: true,
        name: "reporting_head"
    })
    reportingHead: string;

    @Column("varchar", {
        nullable: true,
        name: "unit_name"
    })
    unitName: string | number;

    @Column("varchar", {
        nullable: true,
        name: "laptop"
    })
    laptop: string | number;
    @Column("varchar", {
        nullable: true,
        name: "barcode"
    })
    barcode: string | number;
    @Column("varchar", {
        nullable: true,
        name: "os"
    })
    os: string | number;
    @Column("varchar", {
        nullable: true,
        name: "antivirus"
    })
    antiVirus: string | number;
    
    @Column("varchar", {
        nullable: true,
        name: "connection_type"
    })
    connectionType: string | number;

    @Column({ nullable: true, name: 'access_status', type: 'tinyint'})
    accessStatus: string;
}

