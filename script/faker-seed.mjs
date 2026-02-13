import { faker } from "@faker-js/faker";
import fs from "fs/promises";

// 1. Extract the massive address list for cleaner code
const addressOptions = [
  {
    province: "Aceh",
    city: "Kota Banda Aceh",
    latRange: [5.48, 5.62],
    lonRange: [95.28, 95.42],
  },
  {
    province: "Aceh",
    city: "Kota Langsa",
    latRange: [4.42, 4.52],
    lonRange: [97.92, 98.0],
  },
  {
    province: "Aceh",
    city: "Kota Lhokseumawe",
    latRange: [5.15, 5.22],
    lonRange: [96.98, 97.08],
  },
  {
    province: "Aceh",
    city: "Kota Sabang",
    latRange: [5.85, 5.92],
    lonRange: [95.28, 95.38],
  },
  {
    province: "Aceh",
    city: "Kota Subulussalam",
    latRange: [2.6, 2.7],
    lonRange: [98.0, 98.1],
  },
  {
    province: "Sumatera Utara",
    city: "Kota Binjai",
    latRange: [3.58, 3.68],
    lonRange: [98.45, 98.55],
  },
  {
    province: "Sumatera Utara",
    city: "Kota Gunungsitoli",
    latRange: [1.25, 1.35],
    lonRange: [97.55, 97.65],
  },
  {
    province: "Sumatera Utara",
    city: "Kota Medan",
    latRange: [3.45, 3.7],
    lonRange: [98.55, 98.8],
  },
  {
    province: "Sumatera Utara",
    city: "Kota Padangsidempuan",
    latRange: [1.35, 1.42],
    lonRange: [99.25, 99.32],
  },
  {
    province: "Sumatera Utara",
    city: "Kota Pematangsiantar",
    latRange: [2.92, 3.0],
    lonRange: [99.05, 99.12],
  },
  {
    province: "Sumatera Utara",
    city: "Kota Sibolga",
    latRange: [1.7, 1.78],
    lonRange: [98.75, 98.82],
  },
  {
    province: "Sumatera Utara",
    city: "Kota Tanjungbalai",
    latRange: [2.95, 3.05],
    lonRange: [99.75, 99.85],
  },
  {
    province: "Sumatera Utara",
    city: "Kota Tebing Tinggi",
    latRange: [3.3, 3.38],
    lonRange: [99.1, 99.18],
  },
  {
    province: "Sumatera Barat",
    city: "Kota Bukittinggi",
    latRange: [-0.32, -0.24],
    lonRange: [100.32, 100.4],
  },
  {
    province: "Sumatera Barat",
    city: "Kota Padang",
    latRange: [-0.95, -0.75],
    lonRange: [100.3, 100.45],
  },
  {
    province: "Sumatera Barat",
    city: "Kota Padang Panjang",
    latRange: [-0.48, -0.4],
    lonRange: [100.35, 100.43],
  },
  {
    province: "Sumatera Barat",
    city: "Kota Pariaman",
    latRange: [-0.6, -0.55],
    lonRange: [100.08, 100.15],
  },
  {
    province: "Sumatera Barat",
    city: "Kota Payakumbuh",
    latRange: [-0.22, -0.18],
    lonRange: [100.6, 100.68],
  },
  {
    province: "Sumatera Barat",
    city: "Kota Sawahlunto",
    latRange: [-0.68, -0.65],
    lonRange: [100.75, 100.8],
  },
  {
    province: "Sumatera Barat",
    city: "Kota Solok",
    latRange: [-0.82, -0.72],
    lonRange: [100.62, 100.72],
  },
  {
    province: "Riau",
    city: "Kota Dumai",
    latRange: [1.65, 1.75],
    lonRange: [101.4, 101.5],
  },
  {
    province: "Riau",
    city: "Kota Pekanbaru",
    latRange: [0.45, 0.6],
    lonRange: [101.35, 101.5],
  },
  {
    province: "Kepulauan Riau",
    city: "Kota Batam",
    latRange: [0.95, 1.15],
    lonRange: [103.9, 104.15],
  },
  {
    province: "Kepulauan Riau",
    city: "Kota Tanjung Pinang",
    latRange: [0.9, 0.98],
    lonRange: [104.4, 104.48],
  },
  {
    province: "Jambi",
    city: "Kota Jambi",
    latRange: [-1.65, -1.55],
    lonRange: [103.55, 103.65],
  },
  {
    province: "Jambi",
    city: "Kota Sungai Penuh",
    latRange: [-2.08, -2.02],
    lonRange: [101.35, 101.42],
  },
  {
    province: "Sumatera Selatan",
    city: "Kota Lubuklinggau",
    latRange: [-3.32, -3.25],
    lonRange: [102.85, 102.92],
  },
  {
    province: "Sumatera Selatan",
    city: "Kota Pagar Alam",
    latRange: [-4.05, -4.0],
    lonRange: [103.15, 103.22],
  },
  {
    province: "Sumatera Selatan",
    city: "Kota Palembang",
    latRange: [-3.0, -2.85],
    lonRange: [104.7, 104.85],
  },
  {
    province: "Sumatera Selatan",
    city: "Kota Prabumulih",
    latRange: [-3.45, -3.38],
    lonRange: [104.2, 104.28],
  },
  {
    province: "Bengkulu",
    city: "Kota Bengkulu",
    latRange: [-3.82, -3.75],
    lonRange: [102.25, 102.35],
  },
  {
    province: "Bangka Belitung",
    city: "Kota Pangkal Pinang",
    latRange: [-2.15, -2.08],
    lonRange: [106.08, 106.15],
  },
  {
    province: "Lampung",
    city: "Kota Bandar Lampung",
    latRange: [-5.45, -5.3],
    lonRange: [105.2, 105.35],
  },
  {
    province: "Lampung",
    city: "Kota Metro",
    latRange: [-5.12, -5.05],
    lonRange: [105.28, 105.35],
  },
  {
    province: "Jakarta Pusat",
    city: "Kecamatan Gambir",
    latRange: [-6.185, -6.155],
    lonRange: [106.795, 106.835],
  },
  {
    province: "Jakarta Pusat",
    city: "Kecamatan Tanah Abang",
    latRange: [-6.21, -6.18],
    lonRange: [106.8, 106.82],
  },
  {
    province: "Jakarta Pusat",
    city: "Kecamatan Menteng",
    latRange: [-6.2, -6.18],
    lonRange: [106.83, 106.85],
  },
  {
    province: "Jakarta Pusat",
    city: "Kecamatan Senen",
    latRange: [-6.18, -6.16],
    lonRange: [106.84, 106.86],
  },
  {
    province: "Jakarta Pusat",
    city: "Kecamatan Cempaka Putih",
    latRange: [-6.18, -6.16],
    lonRange: [106.86, 106.88],
  },
  {
    province: "Jakarta Pusat",
    city: "Kecamatan Johar Baru",
    latRange: [-6.17, -6.15],
    lonRange: [106.85, 106.87],
  },
  {
    province: "Jakarta Pusat",
    city: "Kecamatan Kemayoran",
    latRange: [-6.16, -6.14],
    lonRange: [106.84, 106.87],
  },
  {
    province: "Jakarta Pusat",
    city: "Kecamatan Sawah Besar",
    latRange: [-6.17, -6.15],
    lonRange: [106.81, 106.83],
  },
  {
    province: "Jakarta Utara",
    city: "Kecamatan Penjaringan",
    latRange: [-6.13, -6.1],
    lonRange: [106.78, 106.82],
  },
  {
    province: "Jakarta Utara",
    city: "Kecamatan Pademangan",
    latRange: [-6.13, -6.1],
    lonRange: [106.82, 106.86],
  },
  {
    province: "Jakarta Utara",
    city: "Kecamatan Tanjung Priok",
    latRange: [-6.12, -6.08],
    lonRange: [106.85, 106.92],
  },
  {
    province: "Jakarta Utara",
    city: "Kecamatan Koja",
    latRange: [-6.12, -6.09],
    lonRange: [106.88, 106.92],
  },
  {
    province: "Jakarta Utara",
    city: "Kecamatan Kelapa Gading",
    latRange: [-6.15, -6.12],
    lonRange: [106.88, 106.92],
  },
  {
    province: "Jakarta Utara",
    city: "Kecamatan Cilincing",
    latRange: [-6.1, -6.05],
    lonRange: [106.9, 106.98],
  },
  {
    province: "Jakarta Barat",
    city: "Kecamatan Cengkareng",
    latRange: [-6.15, -6.12],
    lonRange: [106.7, 106.75],
  },
  {
    province: "Jakarta Barat",
    city: "Kecamatan Grogol Petamburan",
    latRange: [-6.16, -6.14],
    lonRange: [106.78, 106.8],
  },
  {
    province: "Jakarta Barat",
    city: "Kecamatan Taman Sari",
    latRange: [-6.15, -6.13],
    lonRange: [106.8, 106.82],
  },
  {
    province: "Jakarta Barat",
    city: "Kecamatan Tambora",
    latRange: [-6.15, -6.13],
    lonRange: [106.78, 106.8],
  },
  {
    province: "Jakarta Barat",
    city: "Kecamatan Kebon Jeruk",
    latRange: [-6.18, -6.15],
    lonRange: [106.75, 106.78],
  },
  {
    province: "Jakarta Barat",
    city: "Kecamatan Kalideres",
    latRange: [-6.15, -6.12],
    lonRange: [106.68, 106.72],
  },
  {
    province: "Jakarta Barat",
    city: "Kecamatan Palmerah",
    latRange: [-6.2, -6.18],
    lonRange: [106.78, 106.81],
  },
  {
    province: "Jakarta Barat",
    city: "Kecamatan Kembangan",
    latRange: [-6.18, -6.15],
    lonRange: [106.72, 106.75],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Tebet",
    latRange: [-6.24, -6.22],
    lonRange: [106.85, 106.88],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Setiabudi",
    latRange: [-6.22, -6.2],
    lonRange: [106.82, 106.85],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Mampang Prapatan",
    latRange: [-6.25, -6.23],
    lonRange: [106.82, 106.84],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Pasar Minggu",
    latRange: [-6.28, -6.25],
    lonRange: [106.83, 106.87],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Kebayoran Lama",
    latRange: [-6.25, -6.22],
    lonRange: [106.78, 106.82],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Kebayoran Baru",
    latRange: [-6.24, -6.22],
    lonRange: [106.8, 106.83],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Pesanggrahan",
    latRange: [-6.25, -6.22],
    lonRange: [106.75, 106.78],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Pancoran",
    latRange: [-6.25, -6.23],
    lonRange: [106.84, 106.86],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Cilandak",
    latRange: [-6.3, -6.27],
    lonRange: [106.8, 106.83],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Jagakarsa",
    latRange: [-6.33, -6.28],
    lonRange: [106.8, 106.85],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Matraman",
    latRange: [-6.2, -6.18],
    lonRange: [106.85, 106.88],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Pulogadung",
    latRange: [-6.18, -6.15],
    lonRange: [106.88, 106.92],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Jatinegara",
    latRange: [-6.2, -6.18],
    lonRange: [106.87, 106.9],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Duren Sawit",
    latRange: [-6.23, -6.2],
    lonRange: [106.9, 106.93],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Kramat Jati",
    latRange: [-6.27, -6.24],
    lonRange: [106.85, 106.9],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Makasar",
    latRange: [-6.27, -6.25],
    lonRange: [106.9, 106.93],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Ciracas",
    latRange: [-6.32, -6.28],
    lonRange: [106.88, 106.92],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Cipayung",
    latRange: [-6.33, -6.28],
    lonRange: [106.9, 106.95],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Cakung",
    latRange: [-6.18, -6.13],
    lonRange: [106.92, 106.98],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Pulo Gadung",
    latRange: [-6.18, -6.15],
    lonRange: [106.9, 106.93],
  },
  {
    province: "Kepulauan Seribu",
    city: "Kecamatan Kepulauan Seribu Utara",
    latRange: [-5.68, -5.42],
    lonRange: [106.32, 106.62],
  },
  {
    province: "Kepulauan Seribu",
    city: "Kecamatan Kepulauan Seribu Selatan",
    latRange: [-5.92, -5.58],
    lonRange: [106.38, 106.72],
  },
  {
    province: "Banten",
    city: "Kota Cilegon",
    latRange: [-6.05, -5.95],
    lonRange: [106.0, 106.1],
  },
  {
    province: "Banten",
    city: "Kota Serang",
    latRange: [-6.15, -6.05],
    lonRange: [106.1, 106.2],
  },
  {
    province: "Banten",
    city: "Kota Tangerang",
    latRange: [-6.22, -6.1],
    lonRange: [106.6, 106.7],
  },
  {
    province: "Banten",
    city: "Kota Tangerang Selatan",
    latRange: [-6.35, -6.25],
    lonRange: [106.65, 106.75],
  },
  {
    province: "Jawa Barat",
    city: "Kota Bandung",
    latRange: [-6.95, -6.85],
    lonRange: [107.55, 107.7],
  },
  {
    province: "Jawa Barat",
    city: "Kota Banjar",
    latRange: [-7.38, -7.35],
    lonRange: [108.5, 108.55],
  },
  {
    province: "Jawa Barat",
    city: "Kota Bekasi",
    latRange: [-6.25, -6.15],
    lonRange: [106.95, 107.05],
  },
  {
    province: "Jawa Barat",
    city: "Kota Bogor",
    latRange: [-6.62, -6.55],
    lonRange: [106.75, 106.85],
  },
  {
    province: "Jawa Barat",
    city: "Kota Cimahi",
    latRange: [-6.9, -6.85],
    lonRange: [107.5, 107.58],
  },
  {
    province: "Jawa Barat",
    city: "Kota Cirebon",
    latRange: [-6.75, -6.68],
    lonRange: [108.55, 108.62],
  },
  {
    province: "Jawa Barat",
    city: "Kota Depok",
    latRange: [-6.45, -6.35],
    lonRange: [106.75, 106.85],
  },
  {
    province: "Jawa Barat",
    city: "Kota Sukabumi",
    latRange: [-6.95, -6.88],
    lonRange: [106.9, 107.0],
  },
  {
    province: "Jawa Barat",
    city: "Kota Tasikmalaya",
    latRange: [-7.35, -7.28],
    lonRange: [108.2, 108.28],
  },
  {
    province: "Jawa Tengah",
    city: "Kota Magelang",
    latRange: [-7.48, -7.45],
    lonRange: [110.2, 110.25],
  },
  {
    province: "Jawa Tengah",
    city: "Kota Pekalongan",
    latRange: [-6.92, -6.85],
    lonRange: [109.65, 109.72],
  },
  {
    province: "Jawa Tengah",
    city: "Kota Salatiga",
    latRange: [-7.35, -7.3],
    lonRange: [110.48, 110.52],
  },
  {
    province: "Jawa Tengah",
    city: "Kota Semarang",
    latRange: [-7.05, -6.92],
    lonRange: [110.35, 110.5],
  },
  {
    province: "Jawa Tengah",
    city: "Kota Surakarta",
    latRange: [-7.58, -7.52],
    lonRange: [110.78, 110.85],
  },
  {
    province: "Jawa Tengah",
    city: "Kota Tegal",
    latRange: [-6.88, -6.82],
    lonRange: [109.12, 109.18],
  },
  {
    province: "Daerah Istimewa Yogyakarta",
    city: "Kota Yogyakarta",
    latRange: [-7.85, -7.78],
    lonRange: [110.35, 110.42],
  },
  {
    province: "Jawa Timur",
    city: "Kota Batu",
    latRange: [-7.88, -7.82],
    lonRange: [112.5, 112.58],
  },
  {
    province: "Jawa Timur",
    city: "Kota Blitar",
    latRange: [-8.12, -8.05],
    lonRange: [112.15, 112.2],
  },
  {
    province: "Jawa Timur",
    city: "Kota Kediri",
    latRange: [-7.85, -7.8],
    lonRange: [112.0, 112.05],
  },
  {
    province: "Jawa Timur",
    city: "Kota Madiun",
    latRange: [-7.65, -7.58],
    lonRange: [111.5, 111.58],
  },
  {
    province: "Jawa Timur",
    city: "Kota Malang",
    latRange: [-8.0, -7.92],
    lonRange: [112.6, 112.7],
  },
  {
    province: "Jawa Timur",
    city: "Kota Mojokerto",
    latRange: [-7.48, -7.42],
    lonRange: [112.42, 112.48],
  },
  {
    province: "Jawa Timur",
    city: "Kota Pasuruan",
    latRange: [-7.65, -7.58],
    lonRange: [112.88, 112.95],
  },
  {
    province: "Jawa Timur",
    city: "Kota Probolinggo",
    latRange: [-7.78, -7.72],
    lonRange: [113.2, 113.25],
  },
  {
    province: "Jawa Timur",
    city: "Kota Surabaya",
    latRange: [-7.35, -7.15],
    lonRange: [112.6, 112.85],
  },
  {
    province: "Bali",
    city: "Kota Denpasar",
    latRange: [-8.7, -8.6],
    lonRange: [115.18, 115.28],
  },
];

const generateData = (count) => {
  return Array.from({ length: count }, () => {
    const baseAddress = faker.helpers.arrayElement(addressOptions);

    return {
      id: faker.database.mongodbObjectId(), // Equivalent to JG.objectId()
      propertyType: faker.helpers.arrayElement(["Rumah", "Apartemen"]),
      propertyTitle: faker.lorem.sentence(),
      propertyDeskripsi: faker.lorem.paragraph({ min: 5, max: 10 }),
      propertyPrice: faker.number.int({ min: 500, max: 16000 }) * 1000000,
      // JG.repeat(20, JG.integer(...))
      propertyPictures: Array.from({ length: 20 }, () =>
        faker.number.int({ min: 10000000, max: 99999999 }),
      ),
      propertyLuasTanah: faker.number.int({ min: 36, max: 10000 }),
      propertyLuasBangunan: faker.number.int({ min: 36, max: 10000 }),
      propertyKamarMandi: faker.number.int({ min: 1, max: 4 }),
      propertyKamarTidur: faker.number.int({ min: 1, max: 4 }),
      propertyCarport: faker.number.int({ min: 0, max: 4 }),
      propertyTipeSertifikat: faker.helpers.arrayElement([
        "SHM",
        "HGB",
        "SHP",
        "HGU",
        "SHMSRS",
      ]),
      propertyJumlahLantai: faker.number.int({ min: 1, max: 5 }),
      propertyGarasi: faker.number.int({ min: 0, max: 5 }),
      propertyDayaListrik: faker.helpers.arrayElement([
        450, 900, 1300, 2200, 3500, 5500, 6600,
      ]),
      propertyTipeIklan: faker.helpers.arrayElement(["Dijual", "Disewa"]),
      propertyPerabotan: faker.helpers.arrayElement([
        "Fully Furnished",
        "Unfurnished",
        "Semi-furnished",
      ]),

      // Dynamic Address generation based on the selected city
      propertyAddressProvince: baseAddress.province,
      propertyAddressCity: baseAddress.city,
      propertyAddressLat: faker.location.latitude({
        max: baseAddress.latRange[1],
        min: baseAddress.latRange[0],
        precision: 2,
      }),
      propertyAddressLon: faker.location.longitude({
        max: baseAddress.lonRange[1],
        min: baseAddress.lonRange[0],
        precision: 2,
      }),
      propertyAgent: {
        agentName: `${faker.person.firstName()} ${faker.person.lastName()}`,
        agentPhoneNumber: `+62${faker.helpers.arrayElement(["811", "812", "813", "852", "878"])}${faker.number.int({ min: 1000, max: 9999 })}${faker.number.int({ min: 1000, max: 9999 })}`,
        agentNumberIsWhatsApp: faker.datatype.boolean(),
        agentProfilePicture: faker.database.mongodbObjectId(),
        agentCompanyPicture: faker.database.mongodbObjectId(),
        agentNIB: faker.number.int({ min: 100000000000, max: 999999999999 }),
        agentType: faker.helpers.arrayElement(["Korporat", "Independen"]),
      },
    };
  });
};
async function saveToJson() {
  try {
    const data = generateData(10);

    const jsonString = JSON.stringify(data, null, 2);

    await fs.writeFile("properties.json", jsonString, "utf8");

    console.log("✅ Success! properties.json has been created.");
  } catch (err) {
    console.error("❌ Error writing file:", err);
  }
}

saveToJson();
