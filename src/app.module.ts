import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ForumpostsModule } from './forumposts/forumposts.module';

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
    ForumpostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
