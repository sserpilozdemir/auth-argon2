import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: number, dto: CreateOrderDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new ForbiddenException('User not found');
      }

      if (user.balance < dto.price) {
        return 'Not enough money';
      }

      const order = await this.prisma.order.create({
        data: {
          ...dto,
          userId: userId,
        },
      });

      return order;
    } catch (error) {
      return error.message;
    }
  }

  async getAllOrders(userId: number) {
    try {
      if (!userId) throw new Error('User not found');
      const orders = this.prisma.order.findMany({
        where: {
          userId: userId,
        },
      });
      if (!orders) {
        throw new ForbiddenException('Orders not found');
      }
      return orders;
    } catch (error) {
      return error.message;
    }
  }
}
