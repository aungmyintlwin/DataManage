export interface Allergie {
  id: number
  name: string
}

export const AllergieData = [
  {
    id: 1,
    name: "Milk",
  },
  {
    id: 2,
    name: "Meat",
  },
  {
    id: 3,
    name: "Weat",
  },
  {
    id: 4,
    name: "Nasacort",
  },
  {
    id: 5,
    name: "Nasalide",
  },
  {
    id: 6,
    name: "Nasaonex",
  },
] as const
