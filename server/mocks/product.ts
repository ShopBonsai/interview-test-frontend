import { Product } from '../types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Hat',
    isDiscontinued: true,
    variants: [
      {
        id: '1',
        quantity: 10,
        images: [],
        isDiscontinued: false,
        priceCents: 1000,
        selectableOptions: [],
      },
    ],
    description: 'description',
    defaultImage: 'http://via.placeholder.com/640x360',
  },
  {
    id: '1',
    name: 'name',
    isDiscontinued: false,
    variants: [
      {
        id: '1',
        quantity: 10,
        images: [],
        isDiscontinued: false,
        priceCents: 1000,
        selectableOptions: [],
      },
    ],
    description: 'description',
    defaultImage: 'http://via.placeholder.com/640x360',
  },
];

export default mockProducts;
