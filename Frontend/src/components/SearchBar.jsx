import "../css/common.css";

function SearchBar({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}) {

  return (
    <div className="search-section">

      
      <input
        type="text"
        placeholder="Search hotel by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

     
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

     
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

    </div>
  );
}

export default SearchBar;