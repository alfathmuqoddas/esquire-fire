import type { TProperty } from "../types/Property";
import { Scan, Grid2x2, Bath, Bed } from "lucide-react";
import EmblaCarouselPropertyCard from "./EmblaCarousel";
import { Link } from "react-router";

export default function PropertyCard({ property }: { property: TProperty }) {
  const {
    propertyLuasTanah,
    propertyLuasBangunan,
    propertyPrice,
    propertyKamarMandi,
    propertyKamarTidur,
    propertyTitle,
    propertyAddressProvince,
    propertyAddressCity,
  } = property;
  return (
    <div className="mb-4 p-4 rounded-lg shadow hover:shadow-md transition-shadow ease-in">
      <div className="flex flex-col gap-2">
        <EmblaCarouselPropertyCard slides={property.propertyPictures} />
        <div className="flex gap-2 items-center">
          <div className="rounded-full flex items-center justify-center text-xs bg-gray-100 text-blue-500 px-2.5 py-1">
            {property.propertyType}
          </div>
          <div className="rounded-full flex items-center justify-center text-xs bg-blue-500 text-white px-2.5 py-1">
            {property.propertyPerabotan}
          </div>
        </div>
        <div className="flex gap-2 items-center text-sm text-black/60">
          {propertyAddressProvince}, {propertyAddressCity}
        </div>
        <h1 className="font-bold text-xl">
          Rp. {propertyPrice.toLocaleString("de-DE")}
        </h1>
        <Link
          to={`/property/${property.id}`}
          className="hover:text-blue-500 hover:cursor-pointer"
          state={{ property }}
        >
          <h3 className="text-lg">{propertyTitle}</h3>
        </Link>
        <div className="flex gap-4 text-sm">
          <div className="flex gap-1 h-8">
            <Scan size={16} />
            <p>
              {propertyLuasTanah.toLocaleString("de-DE")} m<sup>2</sup>
            </p>
          </div>
          <div className="flex gap-1 h-8">
            <Grid2x2 size={16} />
            <p>
              {propertyLuasBangunan.toLocaleString("de-DE")} m<sup>2</sup>
            </p>
          </div>
          <div className="flex gap-1 h-8">
            <Bed size={16} />
            <p>{propertyKamarTidur}</p>
          </div>
          <div className="flex gap-1 h-8">
            <Bath size={16} />
            <p>{propertyKamarMandi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
