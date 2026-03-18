// screens/ContentScreen.tsx

import { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import EraTabBar from "../components/EraTabBar";
import ContentCard from "../components/ContentCard";
import { ERA_TABS, MOCK_CARDS, EraKey } from "../constants/contentData";

import { ThemedText } from "@/components/themed-text";
import { MainColors, EraColors } from "@/constants/theme";

type ColumnItem = {
  top?: (typeof MOCK_CARDS)[number];
  bottom?: (typeof MOCK_CARDS)[number];
};

type ContentScreenProps = {
  onPressTimeline?: (year: number) => void;
  initialEra?: EraKey;
};

const earliestYearByEra: Record<EraKey, number> = {
  all: 1635,
  golden_age: 1635,
  wars_partitions: 1686,
  independence: 1804,
  rebirth: 1914,
  ww2: 1939,
  communist: 1948,
  modern: 1991,
};

export default function ContentScreen({ onPressTimeline,
  initialEra = "all", }: ContentScreenProps) {
  const router = useRouter();
  const [selectedEra, setSelectedEra] = useState<EraKey>(initialEra);
  useEffect(() => {
    setSelectedEra(initialEra);
  }, [initialEra]);

  const currentTitle =
    selectedEra === "all"
      ? "Title"
      : ERA_TABS.find((tab) => tab.key === selectedEra)?.label ?? "Title";

  // Era → Color
  const eraColorMap: Record<string, string> = {
    golden_age: EraColors.goldenAge,
    wars_partitions: EraColors.warsAndPartitions,
    independence: EraColors.independence,
    rebirth: EraColors.rebirth,
    ww2: EraColors.wwii,
    communist: EraColors.communistPoland,
    modern: EraColors.modern,
  };

  const activeEraColor =
    selectedEra === "all"
      ? MainColors.buttonBlack
      : eraColorMap[selectedEra] ?? MainColors.pointRed;

  const filteredCards = useMemo(() => {
    if (selectedEra === "all") return MOCK_CARDS;
    return MOCK_CARDS.filter((card) => card.eraKeys.includes(selectedEra));
  }, [selectedEra]);

  const columns: ColumnItem[] = useMemo(() => {
    const result: ColumnItem[] = [];
    for (let i = 0; i < filteredCards.length; i += 2) {
      result.push({ top: filteredCards[i], bottom: filteredCards[i + 1] });
    }
    return result;
  }, [filteredCards]);

  const targetYear = earliestYearByEra[selectedEra] ?? 1635;

  return (
    <View style={styles.container}>
      {/* Era Tabs */}
      <EraTabBar
        selectedKey={selectedEra}
        onSelect={setSelectedEra}
        activeColor={activeEraColor}
      />

      {/* Page Title */}
      <ThemedText
        type="h4"
        style={[styles.pageTitle, { color: MainColors.primaryBlack }]}
      >
        {currentTitle}
      </ThemedText>

      {/* Two-row horizontal list */}
      <FlatList
        data={columns}
        keyExtractor={(_, idx) => `col-${idx}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.columnsContainer}
        renderItem={({ item }) => (
          <View style={styles.column}>
            {item.top && (
              <ContentCard
                item={item.top}
                onPress={() =>
                  item.top?.id &&
                  router.push({
                    pathname: "/poi-detail",
                    params: { id: String(item.top.id) },
                  })
                }
              />
            )}
            {item.bottom && (
              <View style={styles.cardGap}>
                <ContentCard
                  item={item.bottom}
                  onPress={() =>
                    item.bottom?.id &&
                    router.push({
                      pathname: "/poi-detail",
                      params: { id: String(item.bottom.id) },
                    })
                  }
                />
              </View>
            )}
          </View>
        )}
      />

      {/* Bottom Toggle */}
      <View style={styles.bottomToggleContainer}>
        <View style={styles.toggleWrapper}>
          <TouchableOpacity
            style={styles.inactiveToggle}
             onPress={() =>
              onPressTimeline ? onPressTimeline(targetYear) : router.push("/")
            }
            activeOpacity={0.85}
          >
            <ThemedText type="button" style={{ color: MainColors.primaryBlack }}>
              Timeline
            </ThemedText>
          </TouchableOpacity>

          <View
            style={[
              styles.activeToggle,
              { backgroundColor: MainColors.primaryBlack },
            ]}
          >
            <ThemedText type="button" style={{ color: "#FFFFFF" }}>
              Content
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainColors.backgroundGrey,
    paddingTop: 20,
  },

  pageTitle: {
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 10,
  },

  columnsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 140,
  },

  column: {
    width: 350,
    marginRight: 20,
    alignItems: "stretch",
  },

  cardGap: {
    marginTop: 14,
  },

  bottomToggleContainer: {
    position: "absolute",
    bottom: 18,
    left: 20,
  },

  toggleWrapper: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    padding: 2,
  },

  inactiveToggle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
  },

  activeToggle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
  },
});