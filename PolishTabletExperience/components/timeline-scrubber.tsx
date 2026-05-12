import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type TimelineItem = {
  id: string;
  year: number;
  label: string;
  color?: string;
};

type TimelineScrubberProps = {
  items: TimelineItem[];
  initialIndex?: number;
  maxGapYears?: number;
  pixelsPerYear?: number;
  minGapPixels?: number;
  onSelect?: (item: TimelineItem, index: number) => void;
};

const TRACK_HORIZONTAL_PADDING = 96;
const DOT_SIZE = 20;
const YEAR_LABEL_WIDTH = 68;
const DEFAULT_ERA_COLOR = '#5f8e3b';
const PILL_WIDTH = 76;
const BAR_TOP = 68;
const BAR_HEIGHT = 20;
const GESTURE_ACTIVE_TOP = BAR_TOP + 2;
const GESTURE_ACTIVE_BOTTOM = BAR_TOP + DOT_SIZE + 4;

function buildPositions(
  items: TimelineItem[],
  pixelsPerYear: number,
  maxGapYears: number,
  minGapPixels: number
) {
  if (items.length === 0) {
    return [];
  }

  const positions: number[] = [0];
  for (let index = 1; index < items.length; index += 1) {
    const yearGap = items[index].year - items[index - 1].year;
    const effectiveGap = Math.min(Math.max(yearGap, 0), maxGapYears);
    const proportionalGap = effectiveGap * pixelsPerYear;
    const visualGap = yearGap > 0 ? minGapPixels + proportionalGap : 0;
    positions.push(positions[index - 1] + visualGap);
  }

  return positions;
}

export function TimelineScrubber({
  items,
  initialIndex = 0,
  maxGapYears = 40,
  pixelsPerYear = 4.4,
  minGapPixels = 18,
  onSelect,
}: TimelineScrubberProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(Math.min(initialIndex, Math.max(items.length - 1, 0)));
  const [scrollX, setScrollX] = useState(0);
  const canHandleScrubRef = useRef(false);
  const panStartScrollXRef = useRef(0);

  const positions = useMemo(
    () => buildPositions(items, pixelsPerYear, maxGapYears, minGapPixels),
    [items, maxGapYears, minGapPixels, pixelsPerYear]
  );

  const totalLength = positions.length > 0 ? positions[positions.length - 1] : 0;
  const usableWidth = Math.max(containerWidth - 2 * TRACK_HORIZONTAL_PADDING, 0);
  const maxScrollX = Math.max(totalLength - usableWidth, 0);

  const markerXByIndex = useMemo(() => {
    const markerMap: Record<number, number> = {};
    if (containerWidth === 0) return markerMap;

    const leftEdge = TRACK_HORIZONTAL_PADDING;
    items.forEach((_, index) => {
      const pos = positions[index] ?? 0;
      markerMap[index] = leftEdge + (pos - scrollX);
    });
    return markerMap;
  }, [containerWidth, items, positions, scrollX]);

  const visibleIndices = useMemo(() => {
    if (items.length === 0 || containerWidth === 0) return [];
    
    const indices: number[] = [];
    const buffer = 200; // Extra pixels to render off-screen
    
    items.forEach((_, index) => {
      const x = markerXByIndex[index];
      if (x >= -buffer && x <= containerWidth + buffer) {
        indices.push(index);
      }
    });

    if (!indices.includes(activeIndex) && activeIndex >= 0) {
      indices.push(activeIndex);
      indices.sort((a, b) => a - b);
    }
    
    return indices;
  }, [items, containerWidth, markerXByIndex, activeIndex]);

  const activeMarkerX = markerXByIndex[activeIndex] ?? containerWidth / 2;
  const scrubberCenterX = useSharedValue(activeMarkerX);

  const selectIndex = useCallback(
    (nextIndex: number) => {
      if (items.length === 0) {
        return;
      }

      const boundedIndex = Math.min(Math.max(nextIndex, 0), items.length - 1);
      setActiveIndex(boundedIndex);
      onSelect?.(items[boundedIndex], boundedIndex);
    },
    [items, onSelect]
  );

  const getNearestVisibleIndex = useCallback(
    (touchX: number) => {
      if (items.length === 0) return 0;

      let nearest = 0;
      let minDistance = Infinity;

      items.forEach((_, index) => {
        const markerX = markerXByIndex[index] ?? 0;
        const distance = Math.abs(markerX - touchX);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = index;
        }
      });

      return nearest;
    },
    [items, markerXByIndex]
  );

  // 1. Handle prop changes from parent (initialIndex)
  useEffect(() => {
    if (items.length === 0) return;
    const boundedInitial = Math.min(Math.max(initialIndex, 0), items.length - 1);
    if (activeIndex !== boundedInitial) {
      setActiveIndex(boundedInitial);
    }
  }, [initialIndex, items.length]);

  // 2. Auto-scroll to keep activeIndex visible
  useEffect(() => {
    if (containerWidth === 0 || items.length === 0) return;

    const activePos = positions[activeIndex] ?? 0;
    const currentViewStart = scrollX;
    const currentViewEnd = scrollX + usableWidth;

    if (activePos < currentViewStart) {
      setScrollX(Math.max(activePos, 0));
    } else if (activePos > currentViewEnd) {
      setScrollX(Math.min(activePos - usableWidth, maxScrollX));
    }
  }, [activeIndex, containerWidth, items, positions, scrollX, usableWidth, maxScrollX]);

  // 3. Smoothly animate the scrubber pill
  useEffect(() => {
    if (containerWidth === 0) return;
    scrubberCenterX.value = withTiming(activeMarkerX, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });
  }, [activeMarkerX, containerWidth, scrubberCenterX]);

  const activePillStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: scrubberCenterX.value - PILL_WIDTH / 2 }],
    };
  });

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin((event) => {
      const withinActiveBand =
        event.y >= GESTURE_ACTIVE_TOP && event.y <= GESTURE_ACTIVE_BOTTOM;

      if (withinActiveBand) {
        canHandleScrubRef.current = true;
        const nextIndex = getNearestVisibleIndex(event.x);
        selectIndex(nextIndex);
      } else {
        canHandleScrubRef.current = false;
        panStartScrollXRef.current = scrollX;
      }
    })
    .onUpdate((event) => {
      if (canHandleScrubRef.current) {
        const nextIndex = getNearestVisibleIndex(event.x);
        if (nextIndex !== activeIndex) {
          selectIndex(nextIndex);
        }
      } else {
        const deltaX = event.translationX;
        const nextScrollX = Math.min(
          Math.max(panStartScrollXRef.current - deltaX, 0),
          maxScrollX
        );
        if (Math.abs(nextScrollX - scrollX) > 0.1) {
          setScrollX(nextScrollX);
        }
      }
    })
    .onEnd(() => {
      canHandleScrubRef.current = false;
    });

  const onContainerLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const goToPrevious = () => {
    if (activeIndex > 0) {
      selectIndex(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex < items.length - 1) {
      selectIndex(activeIndex + 1);
    }
  };

  const isPreviousDisabled = activeIndex === 0;
  const isNextDisabled = activeIndex === items.length - 1;

  return (
    <View style={styles.root} onLayout={onContainerLayout}>
      <Pressable
        onPress={goToPrevious}
        disabled={isPreviousDisabled}
        hitSlop={10}
        style={[styles.arrowButton, styles.leftArrow, isPreviousDisabled && styles.disabledArrow]}>
        <Text style={styles.arrowText}>◀</Text>
      </Pressable>

      <Pressable
        onPress={goToNext}
        disabled={isNextDisabled}
        hitSlop={10}
        style={[styles.arrowButton, styles.rightArrow, isNextDisabled && styles.disabledArrow]}>
        <Text style={styles.arrowText}>▶</Text>
      </Pressable>

      <GestureDetector gesture={panGesture}>
        <View style={styles.gestureArea}>
          <View style={styles.track}>
            {visibleIndices.slice(1).map((currentIndex, visibleOffset) => {
              const previousIndex = visibleIndices[visibleOffset] ?? currentIndex;
              const segmentLeft = markerXByIndex[previousIndex] ?? TRACK_HORIZONTAL_PADDING;
              const segmentRight = markerXByIndex[currentIndex] ?? segmentLeft;
              const segmentWidth = Math.max(segmentRight - segmentLeft, 2);
              const segmentColor =
                items[currentIndex]?.color ?? items[previousIndex]?.color ?? DEFAULT_ERA_COLOR;

              return (
                <View
                  key={`${items[currentIndex]?.id ?? currentIndex}-segment`}
                  style={[
                    styles.trackSegment,
                    {
                      left: segmentLeft,
                      width: segmentWidth,
                      backgroundColor: segmentColor,
                    },
                  ]}
                />
              );
            })}

            {visibleIndices.length === 1 ? (
              <View
                style={[
                  styles.trackSegment,
                  {
                    left: markerXByIndex[visibleIndices[0]] ?? TRACK_HORIZONTAL_PADDING,
                    width: 36,
                    backgroundColor: items[visibleIndices[0]]?.color ?? DEFAULT_ERA_COLOR,
                  },
                ]}
              />
            ) : null}

            {visibleIndices.map((index) => {
              const item = items[index];
              const markerLeft = markerXByIndex[index] ?? TRACK_HORIZONTAL_PADDING;
              const isActive = index === activeIndex;
              const showYearLabel = !isActive;

              return (
                <View key={item.id} style={[styles.marker, { left: markerLeft }]}> 
                  <View style={[styles.dot, isActive ? styles.activeDot : styles.inactiveDot]} />
                  {showYearLabel ? (
                    <Text style={[styles.yearLabel, isActive && styles.activeYearLabel]}>{item.year}</Text>
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>
      </GestureDetector>

      <Animated.View style={[styles.activePill, activePillStyle]} pointerEvents="none">
        <View
          style={[
            styles.activePillBackground,
            { backgroundColor: items[activeIndex]?.color ?? DEFAULT_ERA_COLOR },
          ]}>
          <Text style={styles.activePillText}>{items[activeIndex]?.year}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 112,
    justifyContent: 'flex-end',
  },
  gestureArea: {
    height: 122,
    overflow: 'hidden',
  },
  track: {
    height: 122,
  },
  trackSegment: {
    position: 'absolute',
    top: BAR_TOP,
    height: BAR_HEIGHT,
    borderRadius: 7,
  },
  marker: {
    position: 'absolute',
    top: BAR_TOP,
    width: 1,
    alignItems: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  activeDot: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  inactiveDot: {
    opacity: 0.95,
  },
  yearLabel: {
    marginTop: 12,
    width: YEAR_LABEL_WIDTH,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#515558',
  },
  activeYearLabel: {
    fontWeight: '700',
  },
  activePill: {
    position: 'absolute',
    top: 50,
    left: 0,
  },
  activePillBackground: {
    width: PILL_WIDTH,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  activePillText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 20,
  },
  arrowButton: {
    position: 'absolute',
    top: 39,
    width: 52,
    height: 52,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 15,
  },
  leftArrow: {
    left: 8,
  },
  rightArrow: {
    right: 8,
  },
  arrowText: {
    color: '#42484a',
    fontSize: 32,
    fontWeight: '700',
  },
  disabledArrow: {
    opacity: 0.25,
  },
});
