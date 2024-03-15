import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      emailVerified: new Date(),
      image: 'http://example.com/image.jpg',
    },
  })

  const category = await prisma.category.create({
    data: {
      name: 'Electronics',
    },
  })

  const product = await prisma.product.create({
    data: {
       name: 'iPhone',
       description: 'Apple iPhone 12',
       price: 999.99,
       quantity: 100,
       productCategories: {
        create: {
          category: {
            connect: {
              id: category.id,
            },
          },
        },
      },
    },
   });
   
  
  

  const actionHistory = await prisma.actionHistory.create({
    data: {
      type: 'RESTOCK',
      quantity: 100,
      product: {
        connect: {
          id: product.id,
        },
      },
    },
  })

  console.log({ user, category, product, actionHistory })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
