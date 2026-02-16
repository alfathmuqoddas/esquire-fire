import { useState, useEffect } from "react";
import useProperties from "../../hooks/useProperties";
import {
  type TPropertyFilter,
  type TSortingOrder,
  type TSortingType,
} from "../../repository/property";

export default function Search() {
  const [tempFilter, setTempFilter] = useState<
    TPropertyFilter & {
      sortingOrder: TSortingOrder;
      sortingType: TSortingType;
    }
  >({
    province: "Jawa Barat",
    city: "Kota Depok",
    minPrice: 0,
    maxPrice: 0,
    minLotArea: 0,
    maxLotArea: 0,
    minFloorArea: 0,
    maxFloorArea: 0,
    bedrooms: 0,
    bathrooms: 0,
    propertyType: "Rumah",
    sortingOrder: "desc" as TSortingOrder,
    sortingType: "createdAt" as TSortingType,
  });

  const [finalFilter, setFinalFilter] = useState<
    | (TPropertyFilter & {
        sortingOrder: TSortingOrder;
        sortingType: TSortingType;
      })
    | undefined
  >(undefined);

  const { properties, loading, error, hasMore, loadMore } = useProperties({
    filter: finalFilter,
    sortBy: finalFilter?.sortingType,
    sortOrder: finalFilter?.sortingOrder,
    pageSize: 20,
  });

  const applyFilters = () => {
    setFinalFilter(tempFilter);
  };

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading...</p>;
  if (!properties) return <p>No properties found</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Cari Properti</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Province */}
          <input
            type="text"
            placeholder="Provinsi"
            value={tempFilter.province}
            onChange={(e) =>
              setTempFilter((prev) => ({ ...prev, province: e.target.value }))
            }
            className="border p-2 rounded"
          />

          {/* City */}
          <input
            type="text"
            placeholder="Kota / Kabupaten"
            value={tempFilter.city}
            onChange={(e) =>
              setTempFilter((prev) => ({ ...prev, city: e.target.value }))
            }
            className="border p-2 rounded"
          />

          {/* Min Price */}
          <input
            type="number"
            placeholder="Harga Min (Rp)"
            value={tempFilter.minPrice || ""}
            onChange={(e) =>
              setTempFilter((prev) => ({
                ...prev,
                minPrice: Number(e.target.value) || 0,
              }))
            }
            className="border p-2 rounded"
          />

          {/* Max Price */}
          <input
            type="number"
            placeholder="Harga Max (Rp)"
            value={tempFilter.maxPrice || ""}
            onChange={(e) =>
              setTempFilter((prev) => ({
                ...prev,
                maxPrice: Number(e.target.value) || 0,
              }))
            }
            className="border p-2 rounded"
          />

          {/* Bedrooms */}
          <input
            type="number"
            placeholder="Min Kamar Tidur"
            value={tempFilter.bedrooms || ""}
            onChange={(e) =>
              setTempFilter((prev) => ({
                ...prev,
                bedrooms: Number(e.target.value) || 0,
              }))
            }
            className="border p-2 rounded"
          />

          {/* Property Type */}
          <select
            value={tempFilter.propertyType}
            onChange={(e) =>
              setTempFilter((prev) => ({
                ...prev,
                propertyType: e.target.value,
              }))
            }
            className="border p-2 rounded"
          >
            <option value="Rumah">Rumah</option>
            <option value="Apartemen">Apartemen</option>
            <option value="All">Semua Tipe</option>
          </select>

          {/* Sorting */}
          <select
            value={tempFilter.sortingType}
            onChange={(e) =>
              setTempFilter((prev) => ({
                ...prev,
                sortingType: e.target.value as TSortingType,
              }))
            }
            className="border p-2 rounded"
          >
            <option value="createdAt">Terbaru</option>
            <option value="price">Harga</option>
            <option value="lotArea">Luas Tanah</option>
          </select>

          <select
            value={tempFilter.sortingOrder}
            onChange={(e) =>
              setTempFilter((prev) => ({
                ...prev,
                sortingOrder: e.target.value as TSortingOrder,
              }))
            }
            className="border p-2 rounded"
          >
            <option value="desc">Menurun</option>
            <option value="asc">Menaik</option>
          </select>
        </div>

        <button
          onClick={applyFilters}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Terapkan Filter
        </button>

        <div className="results">
          {error && <p className="text-red-500">{error}</p>}

          {loading && properties.length === 0 ? (
            <p>Loading initial properties...</p>
          ) : (
            <div className="grid gap-4">
              {properties.map((p) => (
                <div key={p.id} className="p-4 border rounded">
                  Rp {p.propertyPrice}
                </div>
              ))}

              {hasMore && (
                <button
                  onClick={() => loadMore()}
                  className="p-2 bg-gray-200 rounded"
                >
                  Load More
                </button>
              )}
            </div>
          )}

          {!loading && properties.length === 0 && <p>No properties found.</p>}
        </div>
      </div>
    </div>
  );
}
