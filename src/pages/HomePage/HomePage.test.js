import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import axios from 'axios';

// setting up mock for axios
// mock a module with automocked version
jest.mock('axios');

describe('HomePage', () => {
  it('[MOCKING]: fetches carousel items via rest api call', async () => {
    // 1.prepare mock response
    const mockResponse = {
      data: [
        {
          id: 1,
          name: 'The Indian Garage Co Casual Shirt',
          description:
            'White and teal blue striped casual shirt, has a spread collar, long sleeves, button placket, curved hem, and 1 patch pocket',
          imageUrl:
            'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/10673544/2019/9/24/6b9c7688-7ca2-4d11-9e5b-a3745ecd8f761569310358973-The-Indian-Garage-Co-Men-Shirts-8481569310357131-1.jpg',
          thumbnailUrl:
            'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/10673544/2019/9/24/6b9c7688-7ca2-4d11-9e5b-a3745ecd8f761569310358973-The-Indian-Garage-Co-Men-Shirts-8481569310357131-1.jpg',
          imgAltText: 'The Indian Garage Co - Casual Shirt',
          maxRetailPrice: 900,
          category: 'Men',
          discountApplicable: 14,
          added: '4/9/2021',
          quantity: 30,
          bestSellerRanking: 2,
          featured: true,
          reviews: [
            {
              id: 1002,
              name: 'Kevin',
              email: 'k@l.com',
              phone: '97654663',
              comment: 'amazing!',
              rating: 4
            }
          ]
        },
        {
          id: 2,
          name: 'U S Polo Assn Men White Pure Cotton Casual Shirt',
          description:
            'White solid opaque pure cotton casual shirt ,has a button-down collar, button placket, long regular sleeves, curved hem',
          imageUrl:
            'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/19446260/2022/9/20/1ce0d1b4-76f4-471d-8cc3-5cf2e153b7d91663652968978-U-S-Polo-Assn-Men-White-Solid-Tailored-Fit-Pure-Cotton-Casua-6.jpg',
          thumbnailUrl:
            'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/19446260/2022/9/20/1ce0d1b4-76f4-471d-8cc3-5cf2e153b7d91663652968978-U-S-Polo-Assn-Men-White-Solid-Tailored-Fit-Pure-Cotton-Casua-6.jpg',
          imgAltText:
            'U S Polo Assn Men White Solid Tailored Fit Pure Cotton Casual Shirt',
          maxRetailPrice: 2100,
          category: 'Men',
          discountApplicable: 14,
          added: '4/9/2021',
          quantity: 30,
          bestSellerRanking: 3,
          featured: true,
          reviews: []
        },
        {
          id: 3,
          name: 'Men Black Pure Cotton Sustainable Casual Shirt',
          description:
            'Black solid casual shirt, has a spread collar, button placket, 1 pocket, long sleeves, curved hem',
          imageUrl:
            'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2127876/2017/11/23/11511431472633-Roadster-Men-Black-Regular-Fit-Solid-Casual-Shirt-8801511431472500-1.jpg',
          thumbnailUrl:
            'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2127876/2017/11/23/11511431472633-Roadster-Men-Black-Regular-Fit-Solid-Casual-Shirt-8801511431472500-1.jpg',
          imgAltText: 'Men Black Pure Cotton Sustainable Casual Shirt',
          maxRetailPrice: 1299,
          category: 'Men',
          discountApplicable: 14,
          added: '4/9/2021',
          quantity: 30,
          bestSellerRanking: 3,
          featured: true,
          reviews: []
        }
      ]
    };
    // 2. Resolve the http request with the above mock response
    // 2.1 setup mocks for axios (see before describe block)
    // 2.2 resolve the req
    axios.get.mockResolvedValue(mockResponse);
    render(<HomePage />)
    const productOneName = await screen.findAllByText('The Indian Garage Co Casual Shirt')
    productOneName.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
    const productTwoName = await screen.findAllByText('U S Polo Assn Men White Pure Cotton Casual Shirt')
    productTwoName.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
    const productThreeName = await screen.findAllByText('Men Black Pure Cotton Sustainable Casual Shirt')
    productThreeName.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
  });
});
