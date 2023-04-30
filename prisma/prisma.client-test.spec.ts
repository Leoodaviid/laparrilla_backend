import {prisma} from "./prisma"

describe('Snack model', () => {
    test('can create a new snack', async () => {
      const snack = await prisma.snack.create({
        data: {
          snack: 'Test snack',
          name: 'Test name',
          description: 'Test description',
          price: 10.0,
          image: 'test_image.jpg',
        },
      })
  
      expect(snack).toEqual(
        expect.objectContaining({
          snack: 'Test snack',
          name: 'Test name',
          description: 'Test description',
          price: 10.0,
          image: 'test_image.jpg',
        })
      )
    })
  })