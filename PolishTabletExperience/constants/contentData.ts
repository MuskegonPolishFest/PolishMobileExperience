import { POI_DETAILS as _POI_DETAILS, MOCK_CARDS as _MOCK_CARDS, GENERATED_ERAS } from './generatedContent';

export type EraKey = string;

export type EraTab = {
    key: EraKey;
    label: string;
};

const uniqueEraTabs: EraTab[] = [{ key: "all", label: "All" }];
const seenNames = new Set(["All"]);
for (const era of GENERATED_ERAS) {
  if (!seenNames.has(era.name)) {
    uniqueEraTabs.push({ key: era.key, label: era.name });
    seenNames.add(era.name);
  }
}

export const ERA_TABS: EraTab[] = uniqueEraTabs;

export const EARLIEST_TIMELINE_YEAR_BY_ERA: Record<EraKey, number> = {
    all: 1635,
    ...Object.fromEntries(GENERATED_ERAS.map((era) => [era.key, Math.min(...era.years)]))
};

export type EraKeyNoAll = Exclude<EraKey, "all">;

export type ContentCardItem = {
    id: string;
    eraKeys: EraKeyNoAll[];
    yearLabel: string;
    titleTop: string;
    titleBottom: string;
    imageUri: string | number;
};

export type PoiDetail = {
    id: string;
    eraKeys: EraKeyNoAll[];
    yearLabel: string;
    titleTop: string;
    description: string;
    summary?: string;
    mainImage?: any;
    relatedIds: string[];
};

export const POI_DETAILS = _POI_DETAILS as unknown as Record<string, PoiDetail>;
export const MOCK_CARDS = _MOCK_CARDS as unknown as ContentCardItem[];