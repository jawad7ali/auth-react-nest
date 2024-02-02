export class RegisterDto {
  //We can use @nestjs/swagger to generate OpenAPI documentation for our API.
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
  