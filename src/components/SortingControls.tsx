import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../store/productsSlice';
import { RootState } from '../store/store';

const SortingControls: React.FC = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.products.sortBy);

  return (
    <select
      value={sortBy}
      onChange={(e) => dispatch(setSortBy(e.target.value as any))}
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="none">Sort by</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-desc">Highest Rated</option>
    </select>
  );
};

export default SortingControls;