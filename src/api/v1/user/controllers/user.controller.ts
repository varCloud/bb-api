import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindAllUsersUseCase } from 'src/modules/user/use-cases/find-all-users.use-case';
import UseCaseKeysModel from 'src/shared/usecase/use-case-keys';
import UseCaseProxy from 'src/shared/usecase/use-case-proxy';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(UseCaseKeysModel.GET_USERS)
    private readonly getUsersUseCase: UseCaseProxy<FindAllUsersUseCase>,
  ) {}
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  findAll() {
    return this.getUsersUseCase.getInstance().execute();
  }
}
