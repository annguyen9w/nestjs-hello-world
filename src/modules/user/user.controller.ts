import {
  Controller, Post, Body, HttpCode, HttpStatus, Get, UseInterceptors, ClassSerializerInterceptor
} from '@nestjs/common'


import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const result = await this.userService.findAll()
    return result
  }


  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto)
    return result.identifiers[0]
  }
}
