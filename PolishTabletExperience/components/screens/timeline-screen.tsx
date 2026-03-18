import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TimelineItem, TimelineScrubber } from '@/components/timeline-scrubber';
import { FontFamily } from '@/constants/theme';
import PoiButton from '../PoiButton';

type EraDefinition = {
  name: string;
  summary: string;
  timeframe: string;
  years: number[];
  color: string;
};

type TimelineScreenProps = {
  onPressContent?: () => void;
  initialYear?: number;
};

const ERA_DEFINITIONS: EraDefinition[] = [
  {
    name: 'The Golden Age',
    summary: 'A time of political strength, cultural flourishing, and territorial expansion.',
    timeframe: 'Late 15th Century to Mid-17th Century',
    years: [1635, 1653],
    color: '#907618',
  },
  {
    name: 'The Era of Wars & Partitions',
    summary: 'Marked by wars, weakening government, and foreign interference.',
    timeframe: 'Late 17th Century to 19th Century',
    years: [1686, 1699, 1721, 1742, 1772, 1792, 1793, 1795],
    color: '#588240',
  },
  {
    name: 'Struggle for Independence',
    summary: 'A century of failed uprisings and growing nationalism.',
    timeframe: '19th Century to WW1',
    years: [1804, 1807, 1815, 1831, 1846, 1848, 1862, 1867, 1871, 1878],
    color: '#806FB8',
  },
  {
    name: 'Rebirth of Poland',
    summary: 'Poland regained its independence and rebuilt itself as a sovereign state.',
    timeframe: '',
    years: [1914, 1917, 1918, 1919, 1920, 1922, 1938],
    color: '#917459',
  },
  {
    name: 'World War II & Occupation',
    summary: 'Poland was invaded and divided between Nazi Germany and the Soviet Union.',
    timeframe: '1939 to 1945',
    years: [1939, 1940, 1944, 1945],
    color: '#537F9D',
  },
  {
    name: 'Communist Poland',
    summary: 'Communist Poland under Soviet influence.',
    timeframe: '1945 to 1989',
    years: [1948],
    color: '#A06B6A',
  },
  {
    name: 'Modern Poland',
    summary: 'Where we are today: a democratic republic and member of the EU and NATO.',
    timeframe: '1990 to Present',
    years: [1991, 1993],
    color: '#0F766E',
  },
];

const ERA_ITEMS: TimelineItem[] = ERA_DEFINITIONS.flatMap((era) =>
  era.years.map((year) => ({
    id: `${era.name}-${year}`,
    year,
    label: era.name,
    color: era.color,
  }))
);

const ERA_BY_NAME = Object.fromEntries(
  ERA_DEFINITIONS.map((era) => [era.name, era])
) as Record<string, EraDefinition>;

const DEFAULT_INDEX = Math.max(
  ERA_ITEMS.findIndex((item) => item.year === 1918),
  0
);

const EARLY_COMMONWEALTH_MAP = require('@/assets/maps_svg/1635-Realsize.svg');
const LATE_COMMONWEALTH_MAP = require('@/assets/maps_svg/1699,1701,1713.svg');

const EARLY_MAP_POSITION = { left: '56%', top: '52%' };
const LATE_MAP_POSITION = { left: '54%', top: '52%' };

function getEraBackgroundMap(year: number) {
  if (year <= 1653) {
    return EARLY_COMMONWEALTH_MAP;
  }

  return LATE_COMMONWEALTH_MAP;
}

function getEraBackgroundPosition(year: number) {
  if (year <= 1653) {
    return EARLY_MAP_POSITION;
  }

  return LATE_MAP_POSITION;
}

export default function TimelineScreen({ onPressContent, initialYear, }: TimelineScreenProps) {
  const router = useRouter();
  const initialIndex = useMemo(() => {
    if (initialYear != null && !Number.isNaN(initialYear)) {
      const foundIndex = ERA_ITEMS.findIndex((item) => item.year === initialYear);
      if (foundIndex >= 0) return foundIndex;
    }

    return DEFAULT_INDEX;
  }, [initialYear]);

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);


  const selectedEra = useMemo(() => ERA_ITEMS[selectedIndex] ?? ERA_ITEMS[0], [selectedIndex]);
  const selectedEraDefinition = ERA_BY_NAME[selectedEra.label] ?? {
    name: selectedEra.label,
    summary: selectedEra.label,
    timeframe: '',
    years: [selectedEra.year],
    color: selectedEra.color ?? '#2f2b2d',
  };
  const selectedEraMap = useMemo(() => getEraBackgroundMap(selectedEra.year), [selectedEra.year]);
  const selectedEraMapPosition = useMemo(
    () => getEraBackgroundPosition(selectedEra.year),
    [selectedEra.year]
  );

  return (
    <View style={styles.screen}>
      <Image
        source={selectedEraMap}
        style={styles.backgroundImage}
        contentFit="contain"
        contentPosition={selectedEraMapPosition}
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.mapArea}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.push('/GuideScreen')}
            activeOpacity={0.85}
          >
            <Text style={styles.homeGlyph}>⌂</Text>
          </TouchableOpacity>

          <View style={{flexDirection: "column", gap: 20}}>
          <View style={styles.eraCard}>
            <Text style={[styles.eraYear, { color: selectedEra.color }]}>{selectedEra.year}</Text>
            <Text style={styles.eraName}>{selectedEraDefinition.name}</Text>
            {selectedEraDefinition.timeframe ? (
              <Text style={[styles.eraTimeframe, { color: selectedEra.color }]}>
                {selectedEraDefinition.timeframe}
              </Text>
            ) : null}
            <Text style={styles.eraSummary}>
              {selectedEraDefinition.summary}
            </Text>
          </View>
          <PoiButton
          description='Sample description for a point of interest related to the selected era. This could be a significant event, location, or figure that is relevant to the historical context.'
          />
          </View>
        </View>

        <View style={styles.timelinePanel}>
          <TimelineScrubber
            items={ERA_ITEMS}
            initialIndex={initialIndex}
            maxGapYears={40}
            pixelsPerYear={3.8}
            minGapPixels={20}
            onSelect={(_, index) => setSelectedIndex(index)}
          />
        </View>

        <View style={styles.bottomToggleContainer}>
          <View style={styles.toggleWrapper}>
            <View style={styles.activeToggle}>
              <Text style={styles.activeToggleText}>Timeline</Text>
            </View>

            <TouchableOpacity
              style={styles.inactiveToggle}
              onPress={() => onPressContent?.()}
              activeOpacity={0.85}
            >
              <Text style={styles.inactiveToggleText}>Content</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#6cb6cb',
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  mapArea: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 18,
  },
  homeButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  homeGlyph: {
    fontSize: 24,
    color: '#333333',
  },
  eraCard: {
    width: 440,
    marginTop: 24,
    padding: 16,
    borderRadius: 10,
    // backgroundColor: 'rgba(241, 241, 241, 0.94)',
    backgroundColor: '#ffffff',
  },
  eraYear: {
    fontSize: 52,
    fontWeight: '900',
    color: '#8e7012',
    fontFamily: FontFamily.khula,
  },
  eraSummary: {
    marginTop: 8,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '400',
    color: '#2f2b2d',
  },
  eraName: {
    marginTop: 6,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    color: '#2f2b2d',
    fontFamily: FontFamily.khula,
  },
  eraTimeframe: {
    marginTop: 4,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  mapLabelText: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: '700',
    lineHeight: 46,
    fontFamily: FontFamily.khula,
  },
  timelinePanel: {
    height: 150,
    backgroundColor: 'transparent',
    paddingHorizontal: -42416,
    paddingTop: 4,
    paddingBottom: 8,
    borderTopWidth: 0,
  },
  bottomToggleContainer: {
    position: 'absolute',
    bottom: 116,
    left: 20,
  },
  toggleWrapper: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
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
    backgroundColor: '#2E2A2A',
  },
  activeToggleText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontFamily.interMedium,
  },
  inactiveToggleText: {
    color: '#2E2A2A',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontFamily.interMedium,
  },
});
