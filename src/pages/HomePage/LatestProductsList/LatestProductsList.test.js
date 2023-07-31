// Test Pattern: AAA

// Arrange
import { render, screen } from '@testing-library/react';
import LatestProductsList from './LatestProductsList';
// TEST SUITE = group of related tests
describe('LatestProductsList', () => {
  const PRODUCT = {
    id: 1,
    name: 'The Indian Garage Co - Casual Shirt',
    thumbnailUrl:
      'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/10673544/2019/9/24/6b9c7688-7ca2-4d11-9e5b-a3745ecd8f761569310358973-The-Indian-Garage-Co-Men-Shirts-8481569310357131-1.jpg',
    maxRetailPrice: 900
  };
  // let's write the tests / test cases / test specs
  it('Should render product name correctly', () => {
    render(
      <LatestProductsList
        id={PRODUCT.id}
        name={PRODUCT.name}
        thumbnailUrl={PRODUCT.thumbnailUrl}
        maxRetailPrice={PRODUCT.maxRetailPrice}
      />
    );
    // using regExp pattern here
    const element = screen.getByText(PRODUCT.name); // i stands for case-insensitive
    expect(element).toBeInTheDocument();
  });

  it('Should render product maxRetailPrice correctly', () => {
    render(
      <LatestProductsList
        id={PRODUCT.id}
        name={PRODUCT.name}
        thumbnailUrl={PRODUCT.thumbnailUrl}
        maxRetailPrice={PRODUCT.maxRetailPrice}
      />
    );
    // using regExp pattern here
    const element = screen.getByText(`INR: ${PRODUCT.maxRetailPrice}`); // i stands for case-insensitive
    expect(element).toBeInTheDocument();
  });
  it('Should render product iamge correctly', () => {
    render(
      <LatestProductsList
        id={PRODUCT.id}
        name={PRODUCT.name}
        thumbnailUrl={PRODUCT.thumbnailUrl}
        maxRetailPrice={PRODUCT.maxRetailPrice}
      />
    );
    // using regExp pattern here
    const element = screen.getByAltText('Thumbnail Image'); // i stands for case-insensitive
    expect(element).toBeInTheDocument();
    expect(element.src).toBe(PRODUCT.thumbnailUrl);
  });
});
