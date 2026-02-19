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

// export const usePropertiesEdit = ({
//   filter = {},
//   pageSize = 20,
// }: TUsePropertyOptions = {}) => {
//   const [properties, setProperties] = useState<TProperty[]>([]);
//   const [lastVisible, setLastVisible] =
//     useState<QueryDocumentSnapshot<DocumentData> | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [hasMore, setHasMore] = useState(true);

//   const filterKey = JSON.stringify(filter);

//   const fetchData = useCallback(
//     async (isInitial: boolean) => {
//       setLoading(true);

//       try {
//         const currentCursor = isInitial ? null : lastVisible;

//         const result = await PropertyRespository.getProperties();

//         setProperties(result.properties);
//         setLastVisible(result.lastVisible);
//         setHasMore(result.properties.length === pageSize);
//       } catch (err: any) {
//         setError(err.message || "Failed to load properties");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [filterKey, pageSize, lastVisible],
//   );

//   useEffect(() => {
//     const triggerInitialLoad = async () => {
//       setLoading(true);
//       const result = await PropertyRespository.getProperties();
//       setProperties(result.properties);
//       setLastVisible(result.lastVisible);
//       setHasMore(result.properties.length === pageSize);
//       setLoading(false);
//     };

//     triggerInitialLoad();
//   }, [filterKey, pageSize]);

//   const loadMore = () => {
//     if (!loading && hasMore) {
//       fetchData(false);
//     }
//   };

//   return { properties, loading, hasMore, loadMore, error };
// };
