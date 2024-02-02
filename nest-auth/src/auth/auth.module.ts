import { Module, Res } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from '../repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../config/jwt-config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository ],
})
export class AuthModule {}
