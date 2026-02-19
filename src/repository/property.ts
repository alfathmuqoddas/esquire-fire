import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  QueryConstraint,
  // QueryDocumentSnapshot,
  limit,
  // startAfter,
  getDoc,
  doc,
  startAfter,
  // type DocumentData,
} from "firebase/firestore";
import type { TProperty } from "../types/Property";

export const SORTING_FIELDS = [
  "price",
  "lotArea",
  "floorArea",
  "createdAt",
] as const;

export type TSortingType = (typeof SORTING_FIELDS)[number];

export const SORT_DIRECTIONS = ["asc", "desc"] as const;
export type TSortingDirection = (typeof SORT_DIRECTIONS)[number];

export type TPropertyFilter = {
  minPrice: number;
  maxPrice: number;
  minLotArea: number;
  maxLotArea: number;
  minFloorArea: number;
  maxFloorArea: number;
  propertyType: string;
  province: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sortBy: TSortingType;
  sortDirections: TSortingDirection;
};

const SORT_FIELD_MAP = {
  price: "propertyPrice",
  lotArea: "propertyLuasTanah",
  floorArea: "propertyLuasBangunan",
  createdAt: "createdAt",
};

export const PropertyRespository = {
  async getProperties(
    filter: TPropertyFilter | undefined,
    pageSize: number = 20,
    lastVisibleDoc: any = null,
  ) {
    const colRef = collection(db, "properties");
    let constraints: QueryConstraint[] = [];
    let inequalityField: string | null = null;

    if (filter) {
      if (filter.province) {
        constraints.push(
          where("propertyAddressProvince", "==", filter.province),
        );
      }
      if (filter.city) {
        constraints.push(where("propertyAddressCity", "==", filter.city));
      }
      if (filter.propertyType && filter.propertyType !== "All") {
        constraints.push(where("propertyType", "==", filter.propertyType));
      }

      // ── Range / inequality filters ── now allowed on multiple fields
      if (filter.minPrice && filter.minPrice > 0) {
        constraints.push(where("propertyPrice", ">=", filter.minPrice));
        inequalityField = "propertyPrice";
      }
      if (filter.maxPrice && filter.maxPrice > 0) {
        constraints.push(where("propertyPrice", "<=", filter.maxPrice));
        inequalityField = "propertyPrice";
      }

      if (filter.minLotArea && filter.minLotArea > 0) {
        constraints.push(where("propertyLuasTanah", ">=", filter.minLotArea));
        inequalityField = "propertyLuasTanah";
      }
      if (filter.maxLotArea && filter.maxLotArea > 0) {
        constraints.push(where("propertyLuasTanah", "<=", filter.maxLotArea));
        inequalityField = "propertyLuasTanah";
      }

      if (filter.minFloorArea && filter.minFloorArea > 0) {
        constraints.push(
          where("propertyLuasBangunan", ">=", filter.minFloorArea),
        );
        inequalityField = "propertyLuasBangunan";
      }

      if (filter.maxFloorArea && filter.maxFloorArea > 0) {
        constraints.push(
          where("propertyLuasBangunan", "<=", filter.maxFloorArea),
        );
        inequalityField = "propertyLuasBangunan";
      }

      if (filter.bedrooms && filter.bedrooms > 0) {
        constraints.push(where("propertyKamarTidur", "==", filter.bedrooms));
      }
      if (filter.bathrooms && filter.bathrooms > 0) {
        constraints.push(where("propertyKamarMandi", "==", filter.bathrooms));
      }
    }

    const sortField = filter?.sortBy
      ? SORT_FIELD_MAP[filter.sortBy]
      : "createdAt";
    const sortDirection = filter?.sortDirections || "desc";

    if (inequalityField) {
      constraints.push(orderBy(inequalityField, sortDirection));

      // Secondary ordering for stable pagination
      if (sortField !== inequalityField) {
        constraints.push(orderBy(sortField, sortDirection));
      }
    } else {
      constraints.push(orderBy(sortField, sortDirection));
    }

    if (lastVisibleDoc) constraints.push(startAfter(lastVisibleDoc));

    constraints.push(limit(pageSize));

    try {
      const q = query(colRef, ...constraints);
      const snapshot = await getDocs(q);

      const properties = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TProperty[];

      const lastVisible = snapshot.docs[snapshot.docs.length - 1] ?? null;

      const hasMore = properties.length === pageSize;

      return { properties, lastVisible, hasMore };
    } catch (error) {
      console.error("Firestore Query Error:", error);
      throw error;
    }
  },
  async getPropertyById(id: string): Promise<TProperty | null> {
    try {
      const docRef = doc(db, "properties", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as TProperty;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      return null;
    }
  },
};
