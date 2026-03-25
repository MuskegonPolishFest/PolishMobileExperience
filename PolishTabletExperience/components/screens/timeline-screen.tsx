import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TimelineItem, TimelineScrubber } from '@/components/timeline-scrubber';
import { FontFamily, MainColors } from '@/constants/theme';
import { EraKey } from '@/constants/contentData';

const HOME_ICON = require('@/assets/General_Icons/ Home_icon.svg');

import MapHotspot from '@/components/MapHotspot';
import PoiButton from '../PoiButton';

type EraDefinition = {
  name: string;
  summary: string;
  timeframe: string;
  years: number[];
  color: string;
};

type TimelineScreenProps = {
  onPressContent?: (era: EraKey) => void;
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
    years: [1948, 1951, 1960, 1970, 1975, 1980, 1987],
    color: '#A06B6A',
  },
  {
    name: 'Modern Poland',
    summary: 'Where we are today: a democratic republic and member of the EU and NATO.',
    timeframe: '1990 to Present',
    years: [1991, 1993, 2003, 2009],
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
  ERA_ITEMS.findIndex((item) => item.year === 1635),
  0
);

const MAP_1635 = require('@/assets/maps_svg/1635-Realsize.svg');
const MAP_1699 = require('@/assets/maps_svg/1699,1701,1713.svg');
const MAP_1772 = require('@/assets/maps_svg/1772.svg');
const MAP_1793 = require('@/assets/maps_svg/1793.svg');
const MAP_1795 = require('@/assets/maps_svg/1795.svg');
const MAP_1807 = require('@/assets/maps_svg/1807.svg');
const MAP_1815 = require('@/assets/maps_svg/1815.svg');
const MAP_1831 = require('@/assets/maps_svg/1831.svg');
const MAP_1846 = require('@/assets/maps_svg/1846.svg');
const MAP_1848 = require('@/assets/maps_svg/1848.svg');
const MAP_1867 = require('@/assets/maps_svg/1867.svg');
const MAP_1878 = require('@/assets/maps_svg/1878, 1884,1894,1904.svg');
const MAP_1917 = require('@/assets/maps_svg/1917.svg');
const MAP_1918 = require('@/assets/maps_svg/1918 - 5.svg');
const MAP_1919 = require('@/assets/maps_svg/1919-1.svg');
const MAP_1920 = require('@/assets/maps_svg/1920, 1923.svg');
const MAP_1922 = require('@/assets/maps_svg/1922-2, 1924, 1935.svg');
const MAP_1938 = require('@/assets/maps_svg/1938 -1.svg');
const MAP_1939 = require('@/assets/maps_svg/1939-2.svg');
const MAP_1940 = require('@/assets/maps_svg/1940.1942.svg');
const MAP_1944 = require('@/assets/maps_svg/1944.svg');
const MAP_1945 = require('@/assets/maps_svg/1945 - 5.svg');
const MAP_1948 = require('@/assets/maps_svg/1948, 1951, 1960, 1970, 1975, 1980, 1987.svg');
const MAP_1991 = require('@/assets/maps_svg/1991.svg');
const MAP_1993 = require('@/assets/maps_svg/1993, 2002, 2011.svg');

const RIGHT_ALIGNED_MAP_POSITION = { right: 0, top: '32%' };
const LEFT_BACKGROUND_VECTOR = require('@/assets/maps_svg/background-vector.svg');

const CULTURE_ICON = require('@/assets/POI_Icon/POI_Culture.svg');
const HOTSPOT_IMAGE = require('@/assets/content_images/CommunistPoland/CommunistPoland_1.png');

const MAP_BY_FLOOR_YEAR: Array<{ startYear: number; source: number }> = [
  { startYear: 1635, source: MAP_1635 },
  { startYear: 1686, source: MAP_1699 },
  { startYear: 1772, source: MAP_1772 },
  { startYear: 1793, source: MAP_1793 },
  { startYear: 1795, source: MAP_1795 },
  { startYear: 1807, source: MAP_1807 },
  { startYear: 1815, source: MAP_1815 },
  { startYear: 1831, source: MAP_1831 },
  { startYear: 1846, source: MAP_1846 },
  { startYear: 1848, source: MAP_1848 },
  { startYear: 1867, source: MAP_1867 },
  { startYear: 1878, source: MAP_1878 },
  { startYear: 1917, source: MAP_1917 },
  { startYear: 1918, source: MAP_1918 },
  { startYear: 1919, source: MAP_1919 },
  { startYear: 1920, source: MAP_1920 },
  { startYear: 1922, source: MAP_1922 },
  { startYear: 1938, source: MAP_1938 },
  { startYear: 1939, source: MAP_1939 },
  { startYear: 1940, source: MAP_1940 },
  { startYear: 1944, source: MAP_1944 },
  { startYear: 1945, source: MAP_1945 },
  { startYear: 1948, source: MAP_1948 },
  { startYear: 1991, source: MAP_1991 },
  { startYear: 1993, source: MAP_1993 },
];

function getEraBackgroundMap(year: number) {
  for (let index = MAP_BY_FLOOR_YEAR.length - 1; index >= 0; index -= 1) {
    if (year >= MAP_BY_FLOOR_YEAR[index].startYear) {
      return MAP_BY_FLOOR_YEAR[index].source;
    }
  }

  return MAP_1635;
}

function getEraKeyFromLabel(label: string): EraKey {
  switch (label) {
    case 'The Golden Age':
      return 'golden_age';
    case 'The Era of Wars & Partitions':
      return 'wars_partitions';
    case 'Struggle for Independence':
      return 'independence';
    case 'Rebirth of Poland':
      return 'rebirth';
    case 'World War II & Occupation':
      return 'ww2';
    case 'Communist Poland':
      return 'communist';
    case 'Modern Poland':
      return 'modern';
    default:
      return 'all';
  }
}

function getIndexFromYear(year: number) {
  const foundIndex = ERA_ITEMS.findIndex((item) => item.year === year);
  return foundIndex >= 0 ? foundIndex : DEFAULT_INDEX;
}

export default function TimelineScreen({
  onPressContent,
  initialYear,
}: TimelineScreenProps) {
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

  const targetEraKey = getEraKeyFromLabel(selectedEra.label);

  const [poiOpen, setPoiOpen] = useState(false);


  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.container}>
        <View style={styles.mapArea}>
          <View style={styles.leftLandWaterLayer} pointerEvents="none">
            <View style={styles.leftLandFill} />
            <Image source={LEFT_BACKGROUND_VECTOR} style={styles.leftVectorImage} contentFit="fill" />
          </View>

          <Image
            source={selectedEraMap}
            style={[styles.backgroundImage, { zIndex: 1 }]}
            contentFit="cover"
            contentPosition="right center"
            pointerEvents="none"
          />
  
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.push('/GuideScreen')}
            activeOpacity={0.85}
          >
            <Image source={HOME_ICON} style={styles.homeIcon} contentFit="contain" />
          </TouchableOpacity>
  
          <View style={{ flexDirection: 'column', gap: 20 }}>
            <View style={styles.eraCard}>
              <Text style={[styles.eraYear, { color: selectedEra.color }]}>
                {selectedEra.year}
              </Text>
  
              <Text style={styles.eraName}>{selectedEraDefinition.name}</Text>
  
              {selectedEraDefinition.timeframe ? (
                <Text style={[styles.eraTimeframe, { color: selectedEra.color }]}>
                  {selectedEraDefinition.timeframe}
                </Text>
              ) : null}
  
              <Text style={styles.eraSummary}>{selectedEraDefinition.summary}</Text>
            </View>
            <PoiButton
              description='This is a sample description text for the point of interest. It can be multiple lines long and provides more details about the hotspot.'
              />
          </View>
            <MapHotspot
            top={500}
            left={600}
            iconSource={CULTURE_ICON}
            imageSource={HOTSPOT_IMAGE}
            isOpen={poiOpen}
            onHotspotPress={() => setPoiOpen(!poiOpen)}
            style={{ zIndex: 10, elevation: 10 }}
            />
  
        </View>
  
        <View style={styles.bottomControls}>
          <View style={styles.bottomToggleContainer}>
            <View style={styles.toggleWrapper}>
              <View style={styles.activeToggle}>
                <Text style={styles.activeToggleText}>Timeline</Text>
              </View>
  
              <TouchableOpacity
                style={styles.inactiveToggle}
                onPress={() => onPressContent?.(targetEraKey)}
                activeOpacity={0.85}
              >
                <Text style={styles.inactiveToggleText}>Content</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <View style={styles.timelinePanel}>
            <TimelineScrubber
              key={`timeline-${initialYear}`}
              items={ERA_ITEMS}
              initialIndex={initialYear != null ? getIndexFromYear(initialYear) : DEFAULT_INDEX}
              maxGapYears={40}
              pixelsPerYear={3.8}
              minGapPixels={20}
              onSelect={(_, index) => setSelectedIndex(index)}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
              }
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D3DCCD',
    paddingBottom: 0,
  },

  container: {
    flex: 1,
    backgroundColor: '#D3DCCD',
  },

  mapArea: {
  flex: 1,
  paddingHorizontal: 28,
  paddingTop: 18,
  overflow: 'hidden',
  zIndex: 1,
},

backgroundImage: {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: '41%',
  zIndex: 1,
},

leftLandWaterLayer: {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: '44%',
  zIndex: 0,
  overflow: 'hidden',
},

leftLandFill: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: '#D3DCCD',
},

leftVectorImage: {
  position: 'absolute',
  top: -170,
  left: 0,
  right: 0,
  height: '80%',
},

  homeButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    zIndex: 3,
  },

  homeIcon: {
    width: 32,
    height: 32,
  },

  eraCard: {
    width: 440,
    marginTop: 24,
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(241, 241, 241, 0.94)',
  },

  eraYear: {
    fontSize: 48,
    fontWeight: '900',
    fontFamily: FontFamily.khula,
  },

  eraName: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '900',
    color: '#2f2b2d',
    fontFamily: FontFamily.khula,
  },

  eraTimeframe: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },

  eraSummary: {
    marginTop: 8,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '400',
    color: '#2f2b2d',
  },

  bottomControls: {
    zIndex: 5,
    backgroundColor: '#D3DCCD',
  },

bottomToggleContainer: {
  position: 'absolute',
  left: 20,
  bottom: 92,
  zIndex: 20,
},

  toggleWrapper: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
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
    color: '#FFFFFF',
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

  timelinePanel: {
    height: 88,
    justifyContent: 'flex-end',
    zIndex: 10,
    backgroundColor: '#D3DCCD',
  },
});