import { useMemo, useState } from "react";
import { useProperties } from "../../hooks/useProperties";
import PropertyCard from "../../components/PropertyCard";
import {
  type TPropertyFilter,
  type TSortingDirection,
  type TSortingType,
  SORTING_FIELDS,
  SORT_DIRECTIONS,
} from "../../repository/property";
import { addressOptions } from "../../config/options";
import {
  parseAsInteger,
  parseAsString,
  useQueryStates,
  parseAsStringEnum,
} from "nuqs";
import { SlidersHorizontal } from "lucide-react";

const propertyFilterParser = {
  province: parseAsString.withDefault(""),
  city: parseAsString.withDefault(""),
  minPrice: parseAsInteger.withDefault(0),
  maxPrice: parseAsInteger.withDefault(0),
  minLotArea: parseAsInteger.withDefault(0),
  maxLotArea: parseAsInteger.withDefault(0),
  minFloorArea: parseAsInteger.withDefault(0),
  maxFloorArea: parseAsInteger.withDefault(0),
  bedrooms: parseAsInteger.withDefault(0),
  bathrooms: parseAsInteger.withDefault(0),
  propertyType: parseAsString.withDefault(""),
  sortBy: parseAsStringEnum([...SORTING_FIELDS]).withDefault("createdAt"),
  sortDirections: parseAsStringEnum([...SORT_DIRECTIONS]).withDefault("desc"),
};

const uniqueProvinces = Array.from(
  new Map(addressOptions.map((item) => [item.province, item])).values(),
);

export default function Search() {
  const [showFilter, setShowFilter] = useState(false);
  const [appliedFilters, setAppliedFilters] = useQueryStates(
    propertyFilterParser,
    {
      shallow: true,
    },
  );
  const [tempFilter, setTempFilter] = useState<TPropertyFilter>(appliedFilters);

  const {
    properties,
    loading,
    error,
    loadMore,
    hasMore,
    loadingMore,
    errorLoadMore,
  } = useProperties({
    filter: appliedFilters,
    pageSize: 20,
  });

  const applyFilters = () => {
    setAppliedFilters(tempFilter);
  };

  const cities = useMemo(() => {
    if (!tempFilter.province) return [];
    return addressOptions
      .filter((item) => item.province === tempFilter.province)
      .map((item) => item.city);
  }, [tempFilter.province]);

  return (
    <div className="container md:w-160 mx-auto">
      <div className="mb-8 bg-white">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`
    relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
    ${
      showFilter
        ? "bg-blue-600 text-white shadow-inner"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }
  `}
        >
          <SlidersHorizontal
            size={18}
            className={showFilter ? "rotate-180 transition-transform" : ""}
          />
          <span>Filter</span>
        </button>

        <div
          className={`
    flex flex-col gap-4 my-4 overflow-hidden transition-all duration-300 ease-in-out
    ${
      showFilter
        ? "opacity-100 max-h-250 translate-y-0"
        : "opacity-0 max-h-0 -translate-y-4 pointer-events-none"
    }
  `}
        >
          <h2 className="text-xl font-bold">Filter Properti</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                className="border px-3 py-2.5 rounded-lg"
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
                className="border px-3 py-2.5 rounded-lg"
              >
                <option value="">Pilih Provinsi</option>
                {uniqueProvinces.map((p) => (
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
                className="border px-3 py-2.5 rounded-lg md:col-span-2"
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
                value={tempFilter.minPrice === 0 ? "" : tempFilter.minPrice}
                onChange={(e) => {
                  const val = e.target.value;
                  setTempFilter((prev) => ({
                    ...prev,
                    minPrice: val === "" ? 0 : Number(val),
                  }));
                }}
                className="border px-3 py-2.5 rounded-lg md:col-span-2"
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
                value={tempFilter.maxPrice === 0 ? "" : tempFilter.maxPrice}
                onChange={(e) => {
                  const val = e.target.value;
                  setTempFilter((prev) => ({
                    ...prev,
                    maxPrice: val === "" ? 0 : Number(val),
                  }));
                }}
                className="border px-3 py-2.5 rounded-lg md:col-span-2"
              />
            </div>

            {/*min luas bangunan */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="minFloorArea">Minimal Luas Bangunan</label>
              <input
                id="minFloorArea"
                name="minFloorArea"
                type="number"
                placeholder="Min luas bangunan"
                value={
                  tempFilter.minFloorArea === 0 ? "" : tempFilter.minFloorArea
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setTempFilter((prev) => ({
                    ...prev,
                    minFloorArea: val === "" ? 0 : Number(val),
                  }));
                }}
                className="border px-3 py-2.5 rounded-lg md:col-span-2"
              />
            </div>

            {/* max luas bangunan */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="maxFloorArea">Max Luas Bangunan</label>
              <input
                id="maxFloorArea"
                name="maxFloorArea"
                type="number"
                placeholder="Max luas bangunan"
                value={
                  tempFilter.maxFloorArea === 0 ? "" : tempFilter.maxFloorArea
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setTempFilter((prev) => ({
                    ...prev,
                    maxFloorArea: val === "" ? 0 : Number(val),
                  }));
                }}
                className="border px-3 py-2.5 rounded-lg md:col-span-2"
              />
            </div>

            {/* min luas tanah */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="minLotArea">Minimal Luas Tanah</label>
              <input
                id="minLotArea"
                name="minLotArea"
                type="number"
                placeholder="Min luas tanah"
                value={tempFilter.minLotArea === 0 ? "" : tempFilter.minLotArea}
                onChange={(e) => {
                  const val = e.target.value;
                  setTempFilter((prev) => ({
                    ...prev,
                    minLotArea: val === "" ? 0 : Number(val),
                  }));
                }}
                className="border px-3 py-2.5 rounded-lg md:col-span-2"
              />
            </div>

            {/* max luas tanah */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="maxLotArea">Max Luas Tanah</label>
              <input
                id="maxLotArea"
                name="maxLotArea"
                type="number"
                placeholder="Max Luas bangunan"
                value={tempFilter.maxLotArea === 0 ? "" : tempFilter.maxLotArea}
                onChange={(e) => {
                  const val = e.target.value;
                  setTempFilter((prev) => ({
                    ...prev,
                    maxLotArea: val === "" ? 0 : Number(val),
                  }));
                }}
                className="border px-3 py-2.5 rounded-lg md:col-span-2"
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
                    bathrooms: Number(e.target.value),
                  }))
                }
                className="border px-3 py-2.5 rounded-lg"
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
                    bedrooms: Number(e.target.value),
                  }))
                }
                className="border px-3 py-2.5 rounded-lg"
              >
                <option value="">Pilih Jumlah Kamar Tidur</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* sort by */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="sortBy">Urutkan Berdasarkan</label>
              <select
                id="sortBy"
                name="sortBy"
                value={tempFilter.sortBy}
                onChange={(e) =>
                  setTempFilter((prev) => ({
                    ...prev,
                    sortBy: e.target.value as TSortingType,
                  }))
                }
                className="border px-3 py-2.5 rounded-lg"
              >
                {SORTING_FIELDS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* sort directions */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="sortDirection">Jenis Urutan</label>
              <select
                id="sortDirection"
                name="sortDirection"
                value={tempFilter.sortDirections}
                onChange={(e) =>
                  setTempFilter((prev) => ({
                    ...prev,
                    sortDirections: e.target.value as TSortingDirection,
                  }))
                }
                className="border px-3 py-2.5 rounded-lg"
              >
                {SORT_DIRECTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={applyFilters}
            className=" bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 cursor-pointer"
          >
            Terapkan Filter
          </button>
        </div>

        <div className="results mt-4">
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
