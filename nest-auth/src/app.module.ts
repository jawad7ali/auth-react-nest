import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://outgive:v2.h_8SkPAbvqVw@cluster0.qdci0ge.mongodb.net/out_crm_auth')],
})
export class AppModule {}
