import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TimelineItem, TimelineScrubber } from '@/components/timeline-scrubber';
import { FontFamily, MainColors } from '@/constants/theme';
import { EraKey, POI_DETAILS, GENERATED_ERAS, GLOBAL_MAPS, EraDefinition } from '@/constants/contentData';
import { HOTSPOT_POSITIONS } from '@/constants/hotspotPositions';

const HOME_ICON = require('@/assets/General_Icons/ Home_icon.svg');

import MapHotspot from '@/components/MapHotspot';
import PoiButton from '../PoiButton';


type TimelineScreenProps = {
  onPressContent?: (era: EraKey) => void;
  onTimelineYearChange?: (year: number) => void;
  initialYear?: number;
};

const ERA_ITEMS: TimelineItem[] = Object.values(GENERATED_ERAS)
  .flatMap((era) =>
    era.years.map((year) => ({
      id: `${era.id}-${year}`,
      year,
      label: era.name,
      color: era.color,
    }))
  )
  .sort((a, b) => a.year - b.year);

const ERA_BY_NAME = Object.fromEntries(
  Object.values(GENERATED_ERAS).map((era) => [era.name, era])
) as Record<string, EraDefinition>;

const DEFAULT_INDEX = Math.max(
  ERA_ITEMS.findIndex((item) => item.year === 1635),
  0
);

const LEFT_BACKGROUND_VECTOR = require('@/assets/maps_svg/background-vector.svg');

const HOTSPOT_ICONS = {
  culture: require('@/assets/POI_Icon/POI_Culture.svg'),
  biography: require('@/assets/POI_Icon/POI_Biography.svg'),
  history: require('@/assets/POI_Icon/POI_Culture.svg'), // Mapped to star per user request
  science: require('@/assets/POI_Icon/POI_Science.svg'),
};

const BORDER_CHANGE_BY_YEAR: Record<number, string> = Object.values(GENERATED_ERAS).reduce((acc, era) => {
  era.years.forEach(year => {
    if (era.borderExplanation) {
      acc[year] = era.borderExplanation;
    }
  });
  return acc;
}, {} as Record<number, string>);

function getEraBackgroundMap(year: number) {
  // First check if an era has a specific map for this year
  const eraForYear = Object.values(GENERATED_ERAS).find(era => era.years.includes(year));
  if (eraForYear && eraForYear.mapAsset) {
    return eraForYear.mapAsset;
  }

  // Fallback to global maps
  for (let index = GLOBAL_MAPS.length - 1; index >= 0; index -= 1) {
    if (year >= GLOBAL_MAPS[index].startYear) {
      return GLOBAL_MAPS[index].source;
    }
  }

  return GLOBAL_MAPS[0]?.source;
}

function getEraKeyFromLabel(label: string): EraKey {
  const era = Object.values(GENERATED_ERAS).find(e => e.name === label);
  return (era?.id as EraKey) || 'all';
}

export default function TimelineScreen({
  onPressContent,
  onTimelineYearChange,
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
    const currentItem = ERA_ITEMS[selectedIndex] ?? ERA_ITEMS[0];
    const borderDescription =
      BORDER_CHANGE_BY_YEAR[currentItem.year];
  
    const lastInitialIndex = useRef(initialIndex);

    useEffect(() => {
      // Only sync if the initialIndex prop changed from the outside
      if (initialIndex !== lastInitialIndex.current) {
        lastInitialIndex.current = initialIndex;
        setSelectedIndex(initialIndex);
      }
    }, [initialIndex]);

    const handleSelect = useCallback((_: any, index: number) => {
      setSelectedIndex(index);
    }, []);
  

  const selectedEra = useMemo(() => ERA_ITEMS[selectedIndex] ?? ERA_ITEMS[0], [selectedIndex]);

  const lastReportedYear = useRef<number | null>(null);

  useEffect(() => {
    if (selectedEra.year !== lastReportedYear.current) {
      lastReportedYear.current = selectedEra.year;
      onTimelineYearChange?.(selectedEra.year);
    }
  }, [selectedEra.year]);

  const selectedEraDefinition = ERA_BY_NAME[selectedEra.label] ?? {
    name: selectedEra.label,
    summary: selectedEra.label,
    timeframe: '',
    years: [selectedEra.year],
    color: selectedEra.color ?? '#2f2b2d',
  };
  const selectedEraMap = useMemo(() => getEraBackgroundMap(selectedEra.year), [selectedEra.year]);

  const targetEraKey = getEraKeyFromLabel(selectedEra.label);
  
  const visibleHotspots = useMemo(() => {
    if (targetEraKey === 'all') return [];

    return Object.values(POI_DETAILS).filter((poi) =>
      poi.eraKeys.includes(targetEraKey)
    );
  }, [targetEraKey]);

  const [openPoiId, setOpenPoiId] = useState<string | null>(null);
  
  useEffect(() => {
    setOpenPoiId(null);
  }, [selectedEra.year]);

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
            {borderDescription && (
            <PoiButton description={borderDescription} />
              )}
          </View>
            {visibleHotspots.map((poi) => {
              const position = HOTSPOT_POSITIONS[poi.id];

              if (!position || !poi.mainImage) return null;

              return (
                <MapHotspot
                  key={poi.id}
                  top={position.top}
                  left={position.left}
                  iconSource={HOTSPOT_ICONS[poi.iconType as keyof typeof HOTSPOT_ICONS] || HOTSPOT_ICONS.history}
                  imageSource={poi.mainImage}
                  isOpen={openPoiId === poi.id}
                  onHotspotPress={() =>
                    setOpenPoiId((current) => (current === poi.id ? null : poi.id))
                  }
                  onPopupPress={() => {
                    router.push({
                      pathname: '/poi-detail',
                      params: {
                        id: poi.id,
                        returnRoot: 'timeline',
                        returnYear: String(selectedEra.year),
                      },
                    });
                  }}
                  titleTop={poi.titleTop}
                  yearLabel={poi.yearLabel}
                  description={poi.summary ?? poi.description}
                  style={{ zIndex: 10, elevation: 10 }}
                />
              );
            })}

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
              items={ERA_ITEMS}
              initialIndex={initialIndex}
              maxGapYears={40}
              pixelsPerYear={8.0}
              minGapPixels={60}
              onSelect={handleSelect}
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