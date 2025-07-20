import React from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const priceArray = [
  { title: "Under 5000FCFA", value: "0-5000" },
  { title: "5000FCFA - 10,000FCFA", value: "5000-10000" },
  { title: "10,000FCFA - 40,000FCFA", value: "20000-40000" },
  { title: "50,000FCFA - 100,000FCFA", value: "50000-100000" },
  { title: "Over 100,000FCFA", value: "100000-1000000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}
const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Price</Title>
      <RadioGroup className="mt-2 space-y-1" value={selectedPrice || ""}>
        {priceArray?.map((price, index) => (
          <div
            key={index}
            onClick={() => setSelectedPrice(price?.value)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={priceArray[0]?.value}
              className={`${selectedPrice === price?.value ? "font-semibold text-shop_light_orange" : "font-normal"}`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-tech_orange hoverEffect"
        >
          Reset selection
        </button>
      )}
    </div>
  );
};

export default PriceList;