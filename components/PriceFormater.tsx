import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormater = ({ amount = 0, className }: Props) => {
  const formattedPrice = amount.toLocaleString('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <span className={cn("text-sm font-semibold text-darkColor", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormater;