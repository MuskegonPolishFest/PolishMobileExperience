export type EraKey =
    | "all"
    | "golden_age"
    | "wars_partitions"
    | "independence"
    | "rebirth"
    | "ww2"
    | "communist"
    | "modern";

export type EraTab = {
    key: EraKey;
    label: string;
};

export const EARLIEST_TIMELINE_YEAR_BY_ERA: Record<EraKey, number> = {
    all: 1635,
    golden_age: 1635,
    wars_partitions: 1686,
    independence: 1804,
    rebirth: 1914,
    ww2: 1939,
    communist: 1948,
    modern: 1991,
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

export const ERA_TABS: EraTab[] = [
    { key: "all", label: "All" },
    { key: "golden_age", label: "The Golden Age" },
    { key: "wars_partitions", label: "The Era of Wars & Partitions" },
    { key: "independence", label: "Struggle for Independence" },
    { key: "rebirth", label: "Rebirth of Poland" },
    { key: "ww2", label: "World War II & Occupation" },
    { key: "communist", label: "Communist Poland" },
    { key: "modern", label: "Modern Poland" },
];

import { POI_DETAILS as _POI_DETAILS, MOCK_CARDS as _MOCK_CARDS } from './generatedContent';

export const POI_DETAILS = _POI_DETAILS as unknown as Record<string, PoiDetail>;
export const MOCK_CARDS = _MOCK_CARDS as unknown as ContentCardItem[];