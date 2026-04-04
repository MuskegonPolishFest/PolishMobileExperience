// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });


import TimelineScreen from '@/components/screens/timeline-screen';
import ContentScreen from '@/screens/ContentScreen';
import { EraKey } from '@/constants/contentData';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type HomeView = 'timeline' | 'content';

const FADE_DURATION = 200;

const ERA_KEYS: EraKey[] = [
  'all', 'golden_age', 'wars_partitions', 'independence',
  'rebirth', 'ww2', 'communist', 'modern',
];

function paramFirst(value: string | string[] | undefined): string | undefined {
  if (value == null) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export default function IndexScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    openTimelineAtYear?: string | string[];
    openContentEra?: string | string[];
  }>();

  const [view, setView] = useState<HomeView>('timeline');
  const [contentEra, setContentEra] = useState<EraKey>('all');
  const [timelineYear, setTimelineYear] = useState<number | undefined>(1918);

  const timelineOpacity = useRef(new Animated.Value(1)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  const isEraKey = (value: string): value is EraKey => ERA_KEYS.includes(value as EraKey);

  const switchView = useCallback(
    (newView: HomeView, era?: EraKey) => {
      if (era !== undefined) setContentEra(era);

      const [fadeIn, fadeOut] =
        newView === 'content'
          ? [contentOpacity, timelineOpacity]
          : [timelineOpacity, contentOpacity];

      Animated.parallel([
        Animated.timing(fadeOut, { toValue: 0, duration: FADE_DURATION, useNativeDriver: true }),
        Animated.timing(fadeIn, { toValue: 1, duration: FADE_DURATION, useNativeDriver: true }),
      ]).start(() => setView(newView));
    },
    [timelineOpacity, contentOpacity],
  );

  useEffect(() => {
    const y = paramFirst(params.openTimelineAtYear);
    if (!y) return;
    const num = Number(y);
    if (Number.isNaN(num)) return;
    setTimelineYear(num);
    switchView('timeline');
    queueMicrotask(() => router.setParams({ openTimelineAtYear: undefined }));
  }, [params.openTimelineAtYear]);

  useEffect(() => {
    const era = paramFirst(params.openContentEra);
    if (!era || !isEraKey(era)) return;
    switchView('content', era);
    queueMicrotask(() => router.setParams({ openContentEra: undefined }));
  }, [params.openContentEra]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: timelineOpacity }]}
        pointerEvents={view === 'timeline' ? 'auto' : 'none'}
      >
        <TimelineScreen
          initialYear={timelineYear}
          onTimelineYearChange={setTimelineYear}
          onPressContent={(era) => switchView('content', era)}
        />
      </Animated.View>
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: contentOpacity }]}
        pointerEvents={view === 'content' ? 'auto' : 'none'}
      >
        <ContentScreen
          initialEra={contentEra}
          onPressTimeline={(year) => {
            if (year !== undefined) setTimelineYear(year);
            switchView('timeline');
          }}
        />
      </Animated.View>
    </View>
  );
}