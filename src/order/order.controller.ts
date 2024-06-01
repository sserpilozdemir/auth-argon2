import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
import { JwtGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/create/:userId')
  createOrder(
    @Body() dto: CreateOrderDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.orderService.createOrder(userId, dto);
  }

  @Get('/get-all/:userId')
  getAllOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.getAllOrders(userId);
  }
}
