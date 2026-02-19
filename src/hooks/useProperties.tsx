import { useState, useEffect } from "react";
import {
  PropertyRespository,
  type TPropertyFilter,
  type TSortingType,
  type TSortingOrder,
} from "../repository/property";
import { type TProperty } from "../types/Property";
// import { QueryDocumentSnapshot, type DocumentData } from "firebase/firestore";

type TUsePropertyOptions = {
  filter: TPropertyFilter;
  sortBy?: TSortingType;
  sortOrder?: TSortingOrder;
  pageSize: number;
};

export const useProperties = ({
  filter,
  pageSize = 20,
}: {
  filter: TPropertyFilter | undefined;
  pageSize: number;
}) => {
  const [properties, setProperties] = useState<TProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filterKey = JSON.stringify(filter);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const result = await PropertyRespository.getProperties(
          filter,
          pageSize,
        );
        setProperties(result.properties);
      } catch (err) {
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [filterKey, pageSize]);

  return { properties, loading, error };
};
