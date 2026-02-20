import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import type { TProperty } from "../../types/Property";
import { PropertyRespository } from "../../repository/property";
import EmblaCarousel from "../../components/EmblaCarousel";

export default function Property() {
  let { propertyId } = useParams();
  const location = useLocation();

  const passedProperty = location.state?.property as TProperty | undefined;

  const [property, setProperty] = useState<TProperty | null>(
    passedProperty || null,
  );
  const [loading, setLoading] = useState(!passedProperty);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (passedProperty) {
      setProperty(passedProperty);
      setLoading(false);
    } else if (propertyId) {
      fetchProperty(propertyId);
    }
  }, [propertyId, passedProperty]);

  const fetchProperty = async (propertyId: string) => {
    try {
      const property = await PropertyRespository.getPropertyById(propertyId);
      if (property) {
        setProperty(property);
      } else {
        setError("Property not found");
      }
    } catch (err) {
      setError("Failed to load property");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>No property found</p>;
  return (
    <>
      <div className="flex flex-col gap-4">
        <EmblaCarousel slides={property.propertyPictures} />
        <div className="flex gap-2 items-center">
          <div className="rounded-full flex items-center justify-center bg-gray-100 text-blue-500 px-2.5 py-1">
            {property.propertyType}
          </div>
          <div className="rounded-full flex items-center justify-center bg-blue-500 text-white px-2.5 py-1">
            {property.propertyPerabotan}
          </div>
        </div>
        <h1 className="text-2xl font-bold text-blue-500">
          Rp. {property.propertyPrice.toLocaleString("de-DE")}
        </h1>
        <h3 className="">{property.propertyTitle}</h3>
      </div>
    </>
  );
}
