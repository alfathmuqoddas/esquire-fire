import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import type { TProperty } from "../../types/Property";
import { PropertyRespository } from "../../repository/property";

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
      <h1 className="text-2xl font-bold">{property.propertyTitle}</h1>
      <pre>{JSON.stringify(property, null, 2)}</pre>
    </>
  );
}
