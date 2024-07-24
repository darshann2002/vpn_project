import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmployeeEntity } from './vpn/employee.entity';
import { VPNModule } from './vpn/vpn.module';
import { VpnEntity } from './vpn/vpn.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.20.50.169',
      port: 3306,
      username: 'internal_apps',
      password: 'Schemax@2023',
      database: 'internal_apps',
      entities: [EmployeeEntity,VpnEntity],
      synchronize: false,
      logging: true,
    }),
    VPNModule,
    
  ],
  providers: [AppService],
  controllers:[AppController]
})
export class AppModule {}
