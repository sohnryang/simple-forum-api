import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      ssl:
        process.env.NODE_ENV == 'production'
          ? { rejectUnauthorized: false }
          : false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
