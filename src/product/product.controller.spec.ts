import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: jest.Mocked<ProductService>;

  const productServiceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    search: jest.fn(),
    findExpensiveProducts: jest.fn(),
    searchByTitle: jest.fn(),
    filterByCategory: jest.fn(),
    filterByPriceRange: jest.fn(),
  } as unknown as jest.Mocked<ProductService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get(ProductService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return single product when id path param is provided', () => {
    const singleProduct = { id: 1, title: 'test' };
    service.findOne.mockReturnValue(singleProduct as never);

    const result = controller.getOne('1');

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(singleProduct);
  });

  it('should return all products when no filters are provided', () => {
    const allProducts = [{ id: 1 }, { id: 2 }];
    service.findAll.mockReturnValue(allProducts as never);

    const result = controller.getAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(allProducts);
  });
});
