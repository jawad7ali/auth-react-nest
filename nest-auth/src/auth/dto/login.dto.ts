export class LoginDto {
  //We can use @nestjs/swagger to generate OpenAPI documentation for our API.
  readonly email: string;
  readonly password: string;
}
  