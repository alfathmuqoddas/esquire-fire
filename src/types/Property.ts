export type TProperty = {
  id: string;
  propertyType: "Rumah" | "Apartemen";
  propertyTitle: string;
  propertyDeskripsi: string;
  propertyPrice: number; // in IDR (e.g. 2_500_000_000)
  propertyPictures: number[]; // array of 20 numeric IDs (likely image identifiers)
  propertyLuasTanah: number; // in m²
  propertyLuasBangunan: number; // in m²
  propertyKamarMandi: number;
  propertyKamarTidur: number;
  propertyCarport: number;
  propertyTipeSertifikat: "SHM" | "HGB" | "SHP" | "HGU" | "SHMSRS";
  propertyJumlahLantai: number;
  propertyGarasi: number;
  propertyDayaListrik: 450 | 900 | 1300 | 2200 | 3500 | 5500 | 6600;
  propertyTipeIklan: "Dijual" | "Disewa";
  propertyPerabotan: "Fully Furnished" | "Unfurnished" | "Semi-furnished";

  // Address
  propertyAddressProvince: string;
  propertyAddressCity: string;
  propertyAddressLat: number; // latitude with ~2 decimal precision
  propertyAddressLon: number; // longitude with ~2 decimal precision

  // Agent
  propertyAgent: {
    agentName: string;
    agentPhoneNumber: string; // e.g. +6281212345678
    agentNumberIsWhatsApp: boolean;
    agentProfilePicture: string; // MongoDB ObjectId string
    agentCompanyPicture: string; // MongoDB ObjectId string
    agentNIB: number; // 12-digit number
    agentType: "Korporat" | "Independen";
  };
  createdAt: Date;
  updatedAt: Date;
};

export type Properties = TProperty[];
