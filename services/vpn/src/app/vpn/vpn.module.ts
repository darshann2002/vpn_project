import { Module } from "@nestjs/common";
import { VpnService } from "./vpn.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from "./employee.entity";
import { VpnEntity } from "./vpn.entity";
import { MailerService } from "./mail";
import { VPNController } from "./vpn.controller";

@Module({
    imports:[TypeOrmModule.forFeature([EmployeeEntity,VpnEntity])],
    controllers:[VPNController],
    providers:[VpnService,MailerService],
    exports:[VpnService]
})
export class VPNModule{}