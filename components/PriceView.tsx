import React from 'react';
import PriceFormater from './PriceFormater';
interface Props {
    price: number | undefined;
    discount?: number | undefined;
    className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  if (price === undefined) return null;

  // Calculate discounted price if discount exists
  const discountedPrice = discount
    ? price - (price * discount) / 100
    : price;

  return (
    <div className={className}>
      {discount ? (
        <div className='flex space-x-3 flex-col items-start'>
          <PriceFormater
            amount={discountedPrice}
            className="text-shop_dark_orange font-semibold mr-2"
          />
          <div className='flex'>
            <div>
                <PriceFormater
            amount={price}
            className="line-through text-gray-500 text-sm"
          />
            </div>
          <div>
            <span className="text-sm text-red-600 ml-2">(-{discount}%)</span>
          </div>
          </div>
        </div>
      ) : (
        <PriceFormater amount={price} />
      )}
    </div>
  );
};

export default PriceView;
