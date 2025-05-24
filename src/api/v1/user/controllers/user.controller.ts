import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FindAllUsersUseCase } from 'src/modules/user/use-cases/find-all-users.use-case';
import UseCaseKeysModel from 'src/shared/usecase/use-case-keys';
import UseCaseProxy from 'src/shared/usecase/use-case-proxy';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from 'src/modules/user/use-cases/create-user-use-case';
import { User } from 'src/modules/user/entities/user';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(UseCaseKeysModel.GET_USERS)
    private readonly getUsersUseCase: UseCaseProxy<FindAllUsersUseCase>,
    @Inject(UseCaseKeysModel.CREATE_USER)
    private readonly createUserUseCase: UseCaseProxy<CreateUserUseCase>,
  ) {}
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  findAll() {
    return this.getUsersUseCase.getInstance().execute();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Returns the created user.' })
  @ApiBody({
    description: 'User data to create a new user',
    type: CreateUserDto,
  })
  async create(@Body() user: CreateUserDto) {
    try {
      const createdUser = await this.createUserUseCase
        .getInstance()
        .execute(user as User);
      return createdUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
