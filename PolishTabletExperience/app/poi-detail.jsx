import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MainColors, Typography } from '@/constants/theme';

// Back icon from assets/General_Icons/Back.svg
function BackIcon({ size = 28, color = '#1C1B1F' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path
        d="M27.0837 36.6666L10.417 19.9999L27.0837 3.33325L29.6253 5.90283L15.5282 19.9999L29.6253 34.097L27.0837 36.6666Z"
        fill={color}
      />
    </Svg>
  );
}

const POIS = {
  '1': {
    id: '1',
    title: 'Title of POI',
    value: 1792,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    imageUri: null,
  },
  '2': {
    id: '2',
    title: 'Title of POI 2',
    value: 1600,
    description: 'Any content description about the POI 2 here',
    imageUri: null,
  },
  '3': {
    id: '3',
    title: 'Title of POI 3',
    value: 1600,
    description: 'Any content description about the POI 3 here',
    imageUri: null,
  },
  '4': {
    id: '4',
    title: 'Title of POI 4',
    value: 1600,
    description: 'Any content description about the POI 4 here',
    imageUri: null,
  },
};

const DEFAULT_MAIN_ID = '1';

export default function POIDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const currentId = typeof params.id === 'string' ? params.id : DEFAULT_MAIN_ID;
  const mainPoi = POIS[currentId] || POIS[DEFAULT_MAIN_ID];
  const relatedPois = Object.values(POIS).filter((poi) => poi.id !== mainPoi.id);

  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const contentFlex = isWide ? { flex: 0.65 } : null;
  const relatedFlex = isWide ? { flex: 0.35 } : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <BackIcon />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, isWide && styles.row]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mainContent, contentFlex]}>
          <View style={styles.imagePlaceholder}>
            {mainPoi.imageUri ? (
              <Image source={mainPoi.imageUri} style={styles.mainImage} contentFit="cover" />
            ) : null}
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.poiTitle}>{mainPoi.title}</Text>
            <Text style={styles.poiValue}>{mainPoi.value}</Text>
          </View>
          <Text style={styles.description}>{mainPoi.description}</Text>
        </View>

        <View style={[styles.relatedSection, relatedFlex]}>
          <Text style={styles.relatedTitle}>Related Content</Text>
          {relatedPois.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.relatedCard}
              activeOpacity={0.7}
              onPress={() =>
                router.push({
                  pathname: '/poi-detail',
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.relatedImagePlaceholder}>
                {item.imageUri ? (
                  <Image source={item.imageUri} style={styles.relatedImage} contentFit="cover" />
                ) : null}
              </View>
              <View style={styles.relatedCardContent}>
                <View style={styles.relatedTitleRow}>
                  <Text style={styles.relatedCardTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.relatedCardValue}>{item.value}</Text>
                </View>
                <Text style={styles.relatedCardDesc} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainColors.backgroundBeige,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 56,
    paddingBottom: 12,
  },
  backButton: {
    padding: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
  },
  mainContent: {
    marginBottom: 24,
    // marginRight: 20,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 16 / 10,
    backgroundColor: MainColors.secondaryGrey,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  poiTitle: {
    ...Typography.h4,
    color: MainColors.primaryBlack,
    flex: 1,
  },
  poiValue: {
    ...Typography.h4,
    color: MainColors.primaryBlack,
  },
  description: {
    ...Typography.body,
    color: MainColors.primaryBlack,
  },
  relatedSection: {
    minWidth: 280,
    marginLeft: 20,
  },
  relatedTitle: {
    ...Typography.h4,
    color: MainColors.primaryBlack,
    marginBottom: 16,
  },
  relatedCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
    minHeight: 150,
  },
  relatedImagePlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: MainColors.secondaryGrey,
  },
  relatedImage: {
    width: '100%',
    height: '100%',
  },
  relatedCardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  relatedTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8,
  },
  relatedCardTitle: {
    ...Typography.h6,
    color: MainColors.primaryBlack,
    flex: 1,
  },
  relatedCardValue: {
    ...Typography.small,
    color: MainColors.primaryBlack,
  },
  relatedCardDesc: {
    ...Typography.small,
    color: MainColors.textGrey,
  },
});
