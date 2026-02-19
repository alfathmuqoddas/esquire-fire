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
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorLoadMore, setErrorLoadMore] = useState<string | null>(null);

  const filterKey = JSON.stringify(filter);

  useEffect(() => {
    fetchInitialProperties();
  }, [filterKey]);

  const fetchInitialProperties = async () => {
    try {
      setLoading(true);
      const result = await PropertyRespository.getProperties(
        filter,
        pageSize,
        null,
      );
      setProperties(result.properties);
      setLastDoc(result.lastVisible);
      setHasMore(result.hasMore);
    } catch (err) {
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const result = await PropertyRespository.getProperties(
        filter,
        pageSize,
        lastDoc,
      );
      setProperties((prev) => [...prev, ...result.properties]);
      setLastDoc(result.lastVisible);
      setHasMore(result.hasMore);
    } catch (err) {
      setErrorLoadMore("Failed to load more properties");
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    properties,
    loading,
    loadingMore,
    hasMore,
    loadMore,
    error,
    errorLoadMore,
  };
};
