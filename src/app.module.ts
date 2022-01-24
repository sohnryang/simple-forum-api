import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({ type: 'postgres', url: process.env.DATABASE_URL }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
