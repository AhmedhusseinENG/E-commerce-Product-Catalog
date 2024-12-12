import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-4 h-4 text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
      <div className="relative pt-[100%]">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            {renderRatingStars(product.rating.rate)}
            <span className="text-sm text-gray-500 ml-1">({product.rating.count})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);