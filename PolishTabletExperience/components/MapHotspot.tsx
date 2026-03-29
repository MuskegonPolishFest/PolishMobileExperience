import { Image } from 'expo-image';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type Props = {

  top: number | string;
  left: number | string;
  iconSource: any;
  imageSource: any;
  isOpen: boolean;
  onHotspotPress: () => void;
  onPopupPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleTop: string;
  yearLabel: string;
  description: string;
  
};

export default function MapHotspot({
  top,
  left,
  iconSource,
  imageSource,
  isOpen,
  onHotspotPress,
  onPopupPress,
  style,
  titleTop,
  yearLabel,
  description,
}: Props) {
  return (
    <View style={[styles.container, { top, left }, style]}>
      {isOpen && (
        <Pressable style={styles.popupWrapper} onPress={onPopupPress}>
          <View style={styles.popup}>
            <Image source={imageSource} style={styles.popupImage} contentFit="cover" />

            <View style={styles.textSection}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>{titleTop}</Text>
                <Text style={styles.year}>{yearLabel}</Text>
              </View>

              <Text style={styles.description}>{description}</Text>
            </View>
          </View>

          <View style={styles.triangle} />
        </Pressable>
      )}

      <Pressable style={styles.hotspotButton} onPress={onHotspotPress}>
        <Image source={iconSource} style={styles.hotspotIcon} contentFit="contain" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  popupWrapper: {
    position: 'absolute',
    bottom: 44,
    alignItems: 'center',
    zIndex: 11,
    elevation: 11,
  },
  popup: {
    width: 296,
    padding: 13,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  popupImage: {
    width: '100%',
    height: 152,
    borderRadius: 8,
  },
  textSection: {
    paddingTop: 8,
    gap: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E2A2A',
  },
  year: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E2A2A',
  },
  description: {
    fontSize: 19,
    lineHeight: 27,
    color: '#2E2A2A',
  },
  triangle: {
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    marginTop: -6,
  },
  hotspotButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotspotIcon: {
    width: 34,
    height: 34,
  },
});