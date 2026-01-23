import { PrismaClient, User } from "@prisma/client";

class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(email: string, password: string): Promise<string> {
    const user = await this.prisma.user.create({
      data: {
        email,
        password
      },
      select: {
        id: true
      }
    });

    return user.id;
  } 

  async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}

export default UserRepository;
