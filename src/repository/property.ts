import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  QueryConstraint,
} from "firebase/firestore";

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
  bathrooms: number;
  bedrooms: number;
};

export type TSortingType = "createdAt" | "price" | "lotArea" | "floorArea";

export type TSortingOrder = "asc" | "desc";

export const PropertyRespository = {
  async getProperties(
    filter: TPropertyFilter,
    sortingType: TSortingType = "createdAt",
    sortingOrder: TSortingOrder = "desc",
  ) {
    const colRef = collection(db, "properties");
    let constraints: QueryConstraint[] = [];

    if (filter.minPrice)
      constraints.push(where("price", ">=", filter.minPrice));
    if (filter.maxPrice)
      constraints.push(where("price", "<=", filter.maxPrice));

    if (filter.propertyType && filter.propertyType !== "All") {
      constraints.push(where("propertyType", "==", filter.propertyType));
    }
    if (filter.province)
      constraints.push(where("province", "==", filter.province));
    if (filter.city) constraints.push(where("city", "==", filter.city));

    constraints.push(orderBy(sortingType, sortingOrder));

    const q = query(colRef, ...constraints);

    const snapshot = await getDocs(q);
    let properties = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (filter.minLotArea) {
      properties = properties.filter(
        (p) => (p as any).lotArea >= filter.minLotArea,
      );
    }
    return properties;
  },
};
