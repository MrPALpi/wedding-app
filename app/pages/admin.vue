<script lang="ts" setup>
import { getAlcoholLabel } from "~/types";

interface AdditionalGuest {
  id: number;
  fullName: string;
  phone: string;
  presence: boolean;
  alcohol: string[];
  night: boolean;
  allergia: string | null;
}

interface GuestRow {
  id: number;
  fullName: string;
  phone: string;
  presence: boolean;
  alcohol: string[];
  night: boolean;
  allergia: string | null;
  additionalGuests: AdditionalGuest[];
}

const PLURAL_VALS: Record<Intl.LDMLPluralRule, string> = {
  zero: "гостей",
  one: "гость",
  two: "гостя",
  few: "гостей",
  many: "гостей",
  other: "гостей",
} as const;

useSeoMeta({
  robots: "noindex, nofollow",
  title: "Админ панель",
});

const { authenticated } = await $fetch("/api/login");

if (!authenticated) {
  navigateTo("/login");
}

const plural = new Intl.PluralRules("ru-RU");

const guestList = shallowRef((await $fetch("/api/guests").catch(() => [])) as GuestRow[]);

const guestCount = computed<number>(() => {
  return guestList.value.reduce((acc, guest)=>{
    acc += guest.additionalGuests.length;

    return acc;
  }, guestList.value.length);
});

const guestsLabel = computed<string>(()=>{
  const count = guestCount.value;
  const pluralVal = plural.select(count);

  return `${count} ${PLURAL_VALS[pluralVal]}`;
});

function formatYesNo(value: boolean): string {
  return value ? "Да" : "Нет";
}

function formatAllergia(value: string | null): string {
  return value?.trim() ? value : "—";
}

async function downloadExcel() {
  const response = await fetch("/api/guests/export");

  if (!response.ok) {
    throw new Error("Download failed");
  }

  const disposition = response.headers.get("content-disposition");
  const fileNameMatch = disposition?.match(/filename="(.+)"/);
  const fileName = fileNameMatch?.[1] ?? "file.xlsx";

  const blob = await response.blob();

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;

  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="admin-page">
    <header class="admin-page__head">
      <h1 class="admin-page__title">
        Гости
      </h1>
      <div class="admin-page__toolbar">
        <p class="admin-page__meta">
          {{ guestsLabel }}
        </p>
        <button
          class="admin-page__export"
          @click="downloadExcel"
        >
          Скачать Excel
        </button>
      </div>
    </header>

    <div v-if="!guestList.length" class="admin-page__empty">
      <p>Пока никто не откликнулся — список пуст.</p>
    </div>

    <div v-else class="admin-table-scroll">
      <table class="admin-table">
        <thead>
          <tr>
            <th class="admin-table__th admin-table__th--num" scope="col">
              #
            </th>
            <th class="admin-table__th" scope="col">
              ФИО
            </th>
            <th class="admin-table__th" scope="col">
              Телефон
            </th>
            <th class="admin-table__th admin-table__th--narrow" scope="col">
              Присутствие
            </th>
            <th class="admin-table__th" scope="col">
              Алкоголь
            </th>
            <th class="admin-table__th admin-table__th--narrow" scope="col">
              Ночёвка
            </th>
            <th class="admin-table__th" scope="col">
              Аллергия
            </th>
            <th class="admin-table__th admin-table__th--guests" scope="col">
              Доп. гости
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="guest in guestList" :key="guest.id" class="admin-table__row">
            <td class="admin-table__td admin-table__td--muted admin-table__td--num">
              {{ guest.id }}
            </td>
            <td class="admin-table__td admin-table__td--strong">
              {{ guest.fullName }}
            </td>
            <td class="admin-table__td admin-table__td--mono">
              <a :href="`tel:${guest.phone}`" target="_blank">
                {{ guest.phone }}
              </a>
            </td>
            <td class="admin-table__td admin-table__td--center">
              <span
                class="admin-pill"
                :class="guest.presence ? 'admin-pill--yes' : 'admin-pill--no'"
              >
                {{ formatYesNo(guest.presence) }}
              </span>
            </td>
            <td class="admin-table__td">
              <ul v-if="guest.alcohol?.length" class="admin-chips">
                <li v-for="(item, i) in guest.alcohol" :key="i" class="admin-chips__item">
                  {{ getAlcoholLabel(item) }}
                </li>
              </ul>
              <span v-else class="admin-table__dash">—</span>
            </td>
            <td class="admin-table__td admin-table__td--center">
              <span
                class="admin-pill"
                :class="guest.night ? 'admin-pill--yes' : 'admin-pill--no'"
              >
                {{ formatYesNo(guest.night) }}
              </span>
            </td>
            <td class="admin-table__td admin-table__td--allergy">
              {{ formatAllergia(guest.allergia) }}
            </td>
            <td class="admin-table__td">
              <div class="admin-extra">
                <span
                  v-if="guest.additionalGuests.length"
                  class="admin-extra__count"
                >
                  +{{ guest.additionalGuests.length }}
                </span>
                <span v-else class="admin-table__dash">—</span>
                <ul v-if="guest.additionalGuests.length" class="admin-extra__list">
                  <li
                    v-for="addGuest in guest.additionalGuests"
                    :key="addGuest.id"
                    class="admin-extra__name"
                  >
                    {{ addGuest.fullName }}
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
.admin-page {
  min-height: 100dvh;
  padding: clamp(1rem, 4vw, 2.5rem);
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--magenta) 18%, #fff) 0%,
    #faf8f6 45%,
    color-mix(in srgb, var(--purple) 6%, #fff) 100%
  );
  color: var(--dark);
}

.admin-page__head {
  @include flex-list-wrap(16px, baseline);

  & {
    margin-bottom: 1.5rem;
  }
}

.admin-page__title {
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--dark);
}

.admin-page__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem 1rem;
  margin-left: auto;
}

.admin-page__meta {
  margin: 0;
  font-size: 0.9rem;
  color: color-mix(in srgb, var(--dark) 55%, transparent);
}

.admin-page__export {
  border: none;
  outline: none;
  padding: 8px;
  border-radius: 0.2rem;
  cursor: pointer;
}

.admin-page__empty {
  padding: 2.5rem 1.5rem;
  text-align: center;
  border-radius: 16px;
  background: color-mix(in srgb, #fff 88%, var(--magenta));
  border: 1px solid color-mix(in srgb, var(--dark) 8%, transparent);
  box-shadow: 0 12px 40px color-mix(in srgb, var(--dark) 6%, transparent);

  p {
    margin: 0;
    color: color-mix(in srgb, var(--dark) 65%, transparent);
  }
}

.admin-table-scroll {
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--dark) 10%, transparent);
  background: #fff;
  box-shadow:
    0 4px 6px color-mix(in srgb, var(--dark) 4%, transparent),
    0 20px 50px color-mix(in srgb, var(--purple) 8%, transparent);
  -webkit-overflow-scrolling: touch;
}

.admin-table {
  width: 100%;
  min-width: 920px;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.875rem;
  line-height: 1.45;
}

.admin-table__th {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0.85rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: color-mix(in srgb, #fff 92%, var(--magenta));
  background: linear-gradient(
    135deg,
    var(--dark) 0%,
    color-mix(in srgb, var(--dark) 75%, var(--purple)) 100%
  );
  border-bottom: 2px solid color-mix(in srgb, var(--yellow) 55%, var(--dark));
  white-space: nowrap;
}

.admin-table__th--num {
  width: 3rem;
  text-align: center;
}

.admin-table__th--narrow {
  text-align: center;
}

.admin-table__th--guests {
  min-width: 9rem;
}

.admin-table__row {
  transition: background-color 0.15s ease;

  &:nth-child(even) .admin-table__td {
    background: color-mix(in srgb, var(--magenta) 5%, #fff);
  }

  &:hover .admin-table__td {
    background: color-mix(in srgb, var(--yellow) 12%, #fff);
  }
}

.admin-table__td {
  padding: 0.75rem 1rem;
  vertical-align: top;
  border-bottom: 1px solid color-mix(in srgb, var(--dark) 7%, transparent);
  background: #fff;
}

.admin-table__td--num {
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.admin-table__td--strong {
  font-weight: 600;
  color: var(--dark);
  max-width: 14rem;
}

.admin-table__td--mono {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: color-mix(in srgb, var(--dark) 78%, transparent);
}

.admin-table__td--allergy {
  max-width: 12rem;
  color: color-mix(in srgb, var(--dark) 85%, transparent);
}

.admin-table__td--muted {
  color: color-mix(in srgb, var(--dark) 45%, transparent);
}

.admin-table__td--center {
  text-align: center;
}

.admin-table__dash {
  color: color-mix(in srgb, var(--dark) 35%, transparent);
}

.admin-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.admin-pill--yes {
  background: color-mix(in srgb, var(--green-light) 35%, #fff);
  color: color-mix(in srgb, var(--green) 90%, #000);
  border: 1px solid color-mix(in srgb, var(--green) 25%, transparent);
}

.admin-pill--no {
  background: color-mix(in srgb, var(--red-light) 18%, #fff);
  color: color-mix(in srgb, var(--red) 85%, #000);
  border: 1px solid color-mix(in srgb, var(--red) 20%, transparent);
}

.admin-chips {
  @include flex-list-wrap(8px);

  & {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.admin-chips__item {
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  background: color-mix(in srgb, var(--purple) 12%, #fff);
  color: color-mix(in srgb, var(--purple) 92%, #000);
  border: 1px solid color-mix(in srgb, var(--purple) 22%, transparent);
}

.admin-extra {
  @include flex-list(8px)
}

.admin-extra__count {
  align-self: flex-start;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: color-mix(in srgb, var(--yellow) 55%, #fff);
  color: var(--dark);
  border: 1px solid color-mix(in srgb, var(--dark) 12%, transparent);
}

.admin-extra__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.admin-extra__name {
  position: relative;
  padding-left: 0.65rem;
  font-size: 0.8rem;
  color: color-mix(in srgb, var(--dark) 82%, transparent);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--pink);
  }
}
</style>
