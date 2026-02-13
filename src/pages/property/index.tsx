import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useLocation } from "react-router";
import { db } from "../../config/firebase";
import type { TProperty } from "../../types/Property";
import { parseAsNumberLiteral } from "nuqs/server";

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
      const docRef = doc(db, "properties", propertyId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProperty(docSnap.data() as TProperty);
      } else {
        setError("No such document!");
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
