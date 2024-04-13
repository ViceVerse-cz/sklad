import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'John Pork',
  //     email: 'michal.hrbacek@albert.einstein.epstein',
  //     emailVerified: new Date(),
  //     image: 'http://example.com/image.jpg',
  //   },
  // })

  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Furniture' } }),
    prisma.category.create({ data: { name: 'Electronics' } }),
    prisma.category.create({ data: { name: 'Clothing' } }),
    prisma.category.create({ data: { name: 'Books' } }),
    prisma.category.create({ data: { name: 'Toys' } }),
  ])

  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'iPhone',
        description: 'Apple iPhone 12',
        price: 999.99,
        quantity: 100,
        productCategories: {
          create: {
            category: {
              connect: {
                id: categories.find(category => category.name === 'Electronics')?.id,
              },
            },
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Sofa',
        description: 'Leather Sofa',
        price: 1499.99,
        quantity: 50,
        productCategories: {
          create: {
            category: {
              connect: {
                id: categories.find(category => category.name === 'Furniture')?.id,
              },
            },
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'T-Shirt',
        description: 'Cotton T-Shirt',
        price: 19.99,
        quantity: 200,
        productCategories: {
          create: {
            category: {
              connect: {
                id: categories.find(category => category.name === 'Clothing')?.id,
              },
            },
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Novel',
        description: 'Fiction Novel',
        price: 12.99,
        quantity: 100,
        productCategories: {
          create: {
            category: {
              connect: {
                id: categories.find(category => category.name === 'Books')?.id,
              },
            },
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Puzzle',
        description: '1000 Piece Puzzle',
        price: 24.99,
        quantity: 75,
        productCategories: {
          create: {
            category: {
              connect: {
                id: categories.find(category => category.name === 'Toys')?.id,
              },
            },
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Laptop',
        description: 'Dell Laptop',
        price: 1299.99,
        quantity: 80,
        productCategories: {
          create: {
            category: {
              connect: {
                id: categories.find(category => category.name === 'Electronics')?.id,
              },
            },
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Chair',
        description: 'Office Chair',
        price: 99.99,
        quantity: 120,
        productCategories: {
          create: {
            category: {
              connect: {
                id: categories.find(category => category.name === 'Furniture')?.id,
              },
            },
          },
        },
      },
    }),
  ])

  const actionHistories = await Promise.all([
    prisma.actionHistory.create({
      data: {
        type: 'RESTOCK',
        quantity: 100,
        product: {
          connect: {
            id: products[0].id,
          },
        },
        date: "2024-02-14T22:17:28.861Z"
      },
    }),
    prisma.actionHistory.create({
      data: {
        type: 'SOLD',
        quantity: 20,
        price: 1499.99,
        product: {
          connect: {
            id: products[1].id,
          },
        },
      },
    }),
    prisma.actionHistory.create({
      data: {
        type: 'RESTOCK',
        quantity: 50,
        price: 1000,
        product: {
          connect: {
            id: products[2].id,
          },
        },
      },
    }),
    prisma.actionHistory.create({
      data: {
        type: 'SOLD',
        quantity: 30,
        price: 1200,
        product: {
          connect: {
            id: products[3].id,
          },
        },
      },
    }),
    prisma.actionHistory.create({
      data: {
        type: 'RESTOCK',
        quantity: 25,
        product: {
          connect: {
            id: products[4].id,
          },
        },
      },
    }),
    prisma.actionHistory.create({
      data: {
        type: 'SOLD',
        quantity: 15,
        price: 500,
        product: {
          connect: {
            id: products[5].id,
          },
        },
      },
    }),
    prisma.actionHistory.create({
      data: {
        type: 'RESTOCK',
        quantity: 40,
        product: {
          connect: {
            id: products[6].id,
          },
        },
      },
    }),
    prisma.actionHistory.create({
      data: {
        type: 'SOLD',
        quantity: 10,
        price: 250,
        product: {
          connect: {
            id: products[0].id,
          },
        },
      },
    }),
    prisma.actionHistory.create({
      data: {
        type: 'RESTOCK',
        quantity: 75,
        product: {
          connect: {
            id: products[1].id,
          },
        },
      },
    }),
  ])

  console.log({ categories, products, actionHistories })
}


main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })