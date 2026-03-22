import { db, guests, type Guest } from "../db";

export interface GuestResponse {
  id: number;
  fullName: string;
  phone: string;
  presence: boolean;
  alcohol: string[];
  night: boolean;
  allergia: string | null;
  additionalGuests: Omit<GuestResponse, "additionalGuests">[];
}

export async function fetchGuestsAggregated(): Promise<GuestResponse[]> {
  const allGuests = await db.select().from(guests);
  const mainGuests = allGuests.filter((g) => g.parentId === null);
  const byParentId = new Map<number, Guest[]>();

  for (const g of allGuests) {
    if (g.parentId != null) {
      const list = byParentId.get(g.parentId) ?? [];

      list.push(g);
      byParentId.set(g.parentId, list);
    }
  }

  return mainGuests.map((main) => {
    const children = byParentId.get(main.id) ?? [];

    const base = {
      id: main.id,
      fullName: main.fullName,
      phone: main.phone,
      presence: main.presence,
      alcohol: main.alcohol,
      night: main.night,
      allergia: main.allergia ?? null,
    };

    const additionalGuests = children.map((child) => ({
      id: child.id,
      fullName: child.fullName,
      phone: child.phone,
      presence: child.presence,
      alcohol: child.alcohol,
      night: child.night,
      allergia: child.allergia ?? null,
    }));

    return {
      ...base,
      additionalGuests,
    };
  });
}
