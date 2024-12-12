import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchProducts } from './store/productsSlice';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import SortingControls from './components/SortingControls';
import Pagination from './components/Pagination';
import { Loader2 } from 'lucide-react';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    filteredItems, 
    status, 
    error, 
    currentPage, 
    itemsPerPage 
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
            <SearchBar />
            <SortingControls />
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getCurrentPageItems().map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
}

export default App;