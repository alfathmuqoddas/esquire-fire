import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  QueryConstraint,
  QueryDocumentSnapshot,
  limit,
  startAfter,
  getDoc,
  doc,
  type DocumentData,
} from "firebase/firestore";
import type { TProperty } from "../types/Property";

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
  minLat?: number;
  maxLat?: number;
  minLon?: number;
  maxLon?: number;
};

export type TSortingType = "createdAt" | "price" | "lotArea" | "floorArea";

export type TSortingOrder = "asc" | "desc";

export const PropertyRespository = {
  async getProperties(
    filter: TPropertyFilter | undefined,
    pageSize: number = 20,
  ) {
    const colRef = collection(db, "properties");
    let constraints: QueryConstraint[] = [];

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
      if (filter.minPrice > 0) {
        constraints.push(where("propertyPrice", ">=", filter.minPrice));
      }
      if (filter.maxPrice > 0) {
        constraints.push(where("propertyPrice", "<=", filter.maxPrice));
      }

      if (filter.minLotArea > 0) {
        constraints.push(where("propertyLuasTanah", ">=", filter.minLotArea));
      }
      if (filter.maxLotArea && filter.maxLotArea > 0) {
        constraints.push(where("propertyLuasTanah", "<=", filter.maxLotArea));
      }

      if (filter.bedrooms > 0) {
        constraints.push(where("propertyKamarTidur", "==", filter.bedrooms));
      }
      if (filter.bathrooms > 0) {
        constraints.push(where("propertyKamarMandi", "==", filter.bathrooms));
      }
    }

    constraints.push(orderBy("createdAt", "desc"));
    constraints.push(limit(pageSize));

    try {
      const q = query(colRef, ...constraints);
      const snapshot = await getDocs(q);

      const properties = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TProperty[];

      const lastVisible = snapshot.docs[snapshot.docs.length - 1] ?? null;
      return { properties, lastVisible };
    } catch (error) {
      console.error("Firestore Query Error:", error);
      throw error;
    }
  },
  async getPropertiesEdit(
    filter: TPropertyFilter,
    pageSize: number = 20,
    lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  ): Promise<{
    properties: TProperty[];
    lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  }> {
    const colRef = collection(db, "properties");
    let constraints: QueryConstraint[] = [];

    // ── Equality filters (most selective first ── good for indexes)
    if (filter.province) {
      constraints.push(where("propertyAddressProvince", "==", filter.province));
    }
    if (filter.city) {
      constraints.push(where("propertyAddressCity", "==", filter.city));
    }
    if (filter.propertyType && filter.propertyType !== "All") {
      constraints.push(where("propertyType", "==", filter.propertyType));
    }

    // ── Range / inequality filters ── now allowed on multiple fields
    if (filter.minPrice !== undefined) {
      constraints.push(where("propertyPrice", ">=", filter.minPrice));
    }
    if (filter.maxPrice !== undefined) {
      constraints.push(where("propertyPrice", "<=", filter.maxPrice));
    }

    if (filter.minLotArea !== undefined) {
      constraints.push(where("propertyLuasTanah", ">=", filter.minLotArea));
    }
    if (filter.maxLotArea !== undefined) {
      constraints.push(where("propertyLuasTanah", "<=", filter.maxLotArea));
    }

    if (filter.minFloorArea !== undefined) {
      constraints.push(
        where("propertyLuasBangunan", ">=", filter.minFloorArea),
      );
    }
    if (filter.maxFloorArea !== undefined) {
      constraints.push(
        where("propertyLuasBangunan", "<=", filter.maxFloorArea),
      );
    }

    if (filter.bedrooms !== undefined) {
      constraints.push(where("propertyKamarTidur", ">=", filter.bedrooms));
    }
    if (filter.bathrooms !== undefined) {
      constraints.push(where("propertyKamarMandi", ">=", filter.bathrooms));
    }

    constraints.push(orderBy("createdAt", "desc"));

    constraints.push(limit(pageSize));

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    const q = query(colRef, ...constraints);

    const snapshot = await getDocs(q);

    const properties = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TProperty[];

    const lastVisible = snapshot.docs[snapshot.docs.length - 1] ?? null;

    return {
      properties,
      lastVisible,
    };
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
