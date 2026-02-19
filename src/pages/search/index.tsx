import { useEffect, useState } from "react";
import { useProperties } from "../../hooks/useProperties";
import PropertyCard from "../../components/PropertyCard";
import { type TPropertyFilter } from "../../repository/property";
import { addressOptions } from "../../config/options";

export default function Search() {
  const [tempFilter, setTempFilter] = useState<TPropertyFilter>({
    province: "",
    city: "",
    minPrice: 0,
    maxPrice: 0,
    minLotArea: 0,
    maxLotArea: 0,
    minFloorArea: 0,
    maxFloorArea: 0,
    bedrooms: 0,
    bathrooms: 0,
    propertyType: "",
  });

  const [finalFilter, setFinalFilter] = useState<TPropertyFilter | undefined>(
    undefined,
  );

  const {
    properties,
    loading,
    error,
    loadMore,
    hasMore,
    loadingMore,
    errorLoadMore,
  } = useProperties({
    filter: finalFilter,
    pageSize: 20,
  });

  const applyFilters = () => {
    setFinalFilter(tempFilter);
  };

  const uniqueProvice = Array.from(
    new Map(addressOptions.map((item) => [item.province, item])).values(),
  );

  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const filteredCities = addressOptions.filter(
      (item) => item.province === finalFilter?.province,
    );
    setCities(filteredCities.map((item) => item.city));
  }, [finalFilter?.province]);

  return (
    <div className="container md:w-160 mx-auto">
      <div className="mb-8 bg-white">
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-xl font-bold">Cari Properti</h2>
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-4">
            <div className="flex flex-col gap-1 md:col-span-4">
              <label htmlFor="propertyType">Tipe Properti</label>
              <select
                id="propertyType"
                name="propertyType"
                value={tempFilter.propertyType}
                onChange={(e) =>
                  setTempFilter((prev) => ({
                    ...prev,
                    propertyType: e.target.value,
                  }))
                }
                className="border p-2 rounded"
              >
                <option value="">Pilih Tipe Properti</option>
                <option value="Rumah">Rumah</option>
                <option value="Apartemen">Apartemen</option>
                <option value="All">Semua Tipe</option>
              </select>
            </div>

            {/* Province */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="province">Provinsi</label>
              <select
                id="province"
                name="province"
                value={tempFilter.province}
                onChange={(e) =>
                  setTempFilter((prev) => ({
                    ...prev,
                    province: e.target.value,
                  }))
                }
                className="border p-2 rounded"
              >
                <option value="">Pilih Provinsi</option>
                {uniqueProvice.map((p) => (
                  <option key={p.province} value={p.province}>
                    {p.province}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="city">Kota / Kabupaten</label>
              <select
                id="city"
                name="city"
                value={tempFilter.city}
                onChange={(e) =>
                  setTempFilter((prev) => ({ ...prev, city: e.target.value }))
                }
                className="border p-2 rounded md:col-span-2"
              >
                <option value="">Pilih Kota / Kabupaten</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="minPrice">Harga Min (Rp)</label>
              <input
                id="minPrice"
                name="minPrice"
                type="number"
                placeholder="Harga Min (Rp)"
                value={tempFilter.minPrice || ""}
                onChange={(e) =>
                  setTempFilter((prev) => ({
                    ...prev,
                    minPrice: Number(e.target.value) || 0,
                  }))
                }
                className="border p-2 rounded md:col-span-2"
              />
            </div>

            {/* Max Price */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="maxPrice">Harga Max (Rp)</label>
              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                placeholder="Harga Max (Rp)"
                value={tempFilter.maxPrice || ""}
                onChange={(e) =>
                  setTempFilter((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value) || 0,
                  }))
                }
                className="border p-2 rounded md:col-span-2"
              />
            </div>

            {/* Bedrooms */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="bathrooms">Kamar Mandi</label>
              <select
                id="bathrooms"
                name="bathrooms"
                value={tempFilter.bathrooms}
                onChange={(e) =>
                  setTempFilter((prev) => ({
                    ...prev,
                    bathrooms: Number(e.target.value) || 0,
                  }))
                }
                className="border p-2 rounded"
              >
                <option value="">Pilih Jumlah Kamar Mandi</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="bedrooms">Kamar Tidur</label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={tempFilter.bedrooms}
                onChange={(e) =>
                  setTempFilter((prev) => ({
                    ...prev,
                    bedrooms: Number(e.target.value) || 0,
                  }))
                }
                className="border p-2 rounded"
              >
                <option value="">Pilih Jumlah Kamar Tidur</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          <button
            onClick={applyFilters}
            className=" bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 cursor-pointer"
          >
            Terapkan Filter
          </button>
        </div>

        <div className="results">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : properties.length > 0 ? (
            <div>
              {properties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}

              {hasMore && (
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => loadMore()}
                    className="p-2 disabled:bg-gray-300 bg-blue-600 hover:bg-blue-700 rounded text-white cursor-pointer"
                    disabled={loadingMore}
                  >
                    {loadingMore
                      ? "Loading..."
                      : errorLoadMore
                        ? "Error Loading More"
                        : "Load More"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>No properties found</p>
          )}
        </div>
      </div>
    </div>
  );
}
