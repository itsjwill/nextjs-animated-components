// Real before/after food photos from FoodShot Airtable
// Before = original restaurant phone photos
// After = FoodShot AI-enhanced versions

export interface FoodPhoto {
  restaurant: string;
  before: string;
  after: string;
}

export const foodPhotos: FoodPhoto[] = [
  {
    restaurant: "Culinary Dropout",
    before: "/foodshot/before-1.jpg",
    after: "/foodshot/after-1.jpg",
  },
  {
    restaurant: "Tokyo Hana",
    before: "/foodshot/before-2.jpg",
    after: "/foodshot/after-2.jpg",
  },
  {
    restaurant: "El Jefe Restaurant",
    before: "/foodshot/before-3.jpg",
    after: "/foodshot/after-3.jpg",
  },
  {
    restaurant: "CAPO PIZZA",
    before: "/foodshot/before-4.jpg",
    after: "/foodshot/after-4.jpg",
  },
  {
    restaurant: "Mega Burgers",
    before: "/foodshot/before-5.jpg",
    after: "/foodshot/after-5.jpg",
  },
  {
    restaurant: "Roost",
    before: "/foodshot/before-6.jpg",
    after: "/foodshot/after-6.jpg",
  },
];
