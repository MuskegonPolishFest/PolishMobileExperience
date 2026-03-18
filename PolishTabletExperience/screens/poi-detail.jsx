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
import { POI_DETAILS } from '../constants/contentData';

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

const DEFAULT_MAIN_ID = 'c1';

export default function POIDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const currentId = typeof params.id === 'string' ? params.id : DEFAULT_MAIN_ID;

  const mainPoi = POI_DETAILS[currentId] || POI_DETAILS[DEFAULT_MAIN_ID];

  const relatedPois =
    (mainPoi.relatedIds || [])
      .map((id) => {
        const poi = POI_DETAILS[id];
        if (!poi) return null;
        return {
          id: poi.id,
          title: poi.titleTop,
          value: poi.yearLabel,
          description: poi.summary || poi.description,
          image: poi.mainImage,
        };
      })
      .filter(Boolean) || [];

  const { width } = useWindowDimensions();
  const isWide = width >= 600;
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
            {mainPoi.mainImage ? (
              <Image source={mainPoi.mainImage} style={styles.mainImage} contentFit="cover" />
            ) : null}
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.poiTitle}>{mainPoi.titleTop}</Text>
            <Text style={styles.poiValue}>{mainPoi.yearLabel}</Text>
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
                {item.image ? (
                  <Image source={item.image} style={styles.relatedImage} contentFit="cover" />
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
    backgroundColor: MainColors.backgroundGrey,
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
