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

export type ContentCardItem = {
    id: string;
    eraKey: Exclude<EraKey, "all">;
    yearLabel: string; //  "1400s" / "1791"
    titleTop: string;  //  "Did You Know?"
    titleBottom: string; // "Poland protected religious freedom early"
    imageUri: string;  // "https://picsum.photos/seed/poland1/600/400"
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

// In a real app, this data would come from an API or database
export const MOCK_CARDS: ContentCardItem[] = [
    {
        id: "c1",
        eraKey: "golden_age",
        yearLabel: "1400s",
        titleTop: "Did You Know?",
        titleBottom: "Poland protected religious freedom early",
        imageUri: "https://picsum.photos/seed/poland1/600/400",
    },
    {
        id: "c2",
        eraKey: "golden_age",
        yearLabel: "1500s",
        titleTop: "Did You Know?",
        titleBottom: "When voting rights were rare, Poland had them",
        imageUri: "https://picsum.photos/seed/poland2/600/400",
    },
    {
        id: "c3",
        eraKey: "wars_partitions",
        yearLabel: "1791",
        titleTop: "Did You Know?",
        titleBottom: "Poland wrote the world’s second constitution",
        imageUri: "https://picsum.photos/seed/poland3/600/400",
    },
    {
        id: "c4",
        eraKey: "wars_partitions",
        yearLabel: "1795",
        titleTop: "Did You Know?",
        titleBottom: "How Poland vanished for 123 years",
        imageUri: "https://picsum.photos/seed/poland4/600/400",
    },
    {
        id: "c5",
        eraKey: "rebirth",
        yearLabel: "1918",
        titleTop: "Did You Know?",
        titleBottom: "After WWI, Russia, Austria, and Germany collapsed...",
        imageUri: "https://picsum.photos/seed/poland5/600/400",
    },
    {
        id: "c6",
        eraKey: "ww2",
        yearLabel: "1920",
        titleTop: "Did You Know?",
        titleBottom: "Poles from America joined the Polish Army and...",
        imageUri: "https://picsum.photos/seed/poland6/600/400",
    },
    {
        id: "c7",
        eraKey: "communist",
        yearLabel: "1945–1989",
        titleTop: "Did You Know?",
        titleBottom: "Poland was under communist rule for decades",
        imageUri: "https://picsum.photos/seed/poland7/600/400",
    },
    {
        id: "c8",
        eraKey: "modern",
        yearLabel: "2004",
        titleTop: "Did You Know?",
        titleBottom: "Poland joined the European Union",
        imageUri: "https://picsum.photos/seed/poland8/600/400",
    },
    {
        id: "c9",
        eraKey: "modern",
        yearLabel: "2010",
        titleTop: "Did You Know?",
        titleBottom: "Poland elected its first  female president",
        imageUri: "https://picsum.photos/seed/poland9/600/400", 
    },
    {
        id: "c10",
        eraKey: "modern",
        yearLabel: "2012",
        titleTop: "Did You Know?",
        titleBottom: "Poland co-hosted the UEFA European Football Championship",
        imageUri: "https://picsum.photos/seed/poland10/600/400", 
    }

];
