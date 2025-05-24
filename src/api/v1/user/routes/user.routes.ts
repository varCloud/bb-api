import { RouterModule, Routes } from '@nestjs/core';
import { UserController } from '../controllers/user.controller';

const routes: Routes = [
  {
    path: 'users',
    module: UserController,
  },
];

export const UserRoutes = RouterModule.register(routes);
