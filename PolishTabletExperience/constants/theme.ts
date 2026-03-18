/**
 * PolishTablet Experience – colors and typography definitions
 * Based on the main colors, era colors, quiz result colors and typography definitions in the design draft.
 * PolishTablet Experience – colors and typography definitions
 * Based on the main colors, era colors, quiz result colors and typography definitions in the design draft.
 */

import { Platform } from 'react-native';

//Main colors definitions
export const MainColors = {
  pointRed: '#B01F1F',
  disabledRed: '#DFB1AA',
  primaryBlack: '#2E2A2A',
  buttonBlack: '#444444',
  textGrey: '#A9A9A9',
  secondaryGrey: '#9D9D9D',
  backgroundBeige: '#F2F0E6',
  backgroundGrey: '#F0F0F0',
} as const;

// Era colors definitions
export const EraColors = {
  goldenAge: '#907618',
  warsAndPartitions: '#588240',
  independence: '#806FB8',
  rebirth: '#917459',
  wwii: '#537F9D',
  communistPoland: '#A06B6A',
  modern: '#4D8480', 
} as const;

// Quiz result colors definitions
export const QuizResultColors = {
  educatorGold: '#9B5802',
  writerBlue: '#4E6CD8',
  crafterGreen: '#2F702F',
  explorerRed: '#D83F19',
} as const;

// Light/Dark theme definitions 
const tintColorLight = MainColors.pointRed;
const tintColorDark = MainColors.pointRed;

export const Colors = {
  light: {
    text: MainColors.primaryBlack,
    background: MainColors.backgroundBeige,
    tint: tintColorLight,
    icon: MainColors.textGrey,
    tabIconDefault: MainColors.textGrey,
    tabIconSelected: tintColorLight,
    // Main colors shortcut reference
    ...MainColors,
    ...EraColors,
    ...QuizResultColors,
    // Main colors shortcut reference
    ...MainColors,
    ...EraColors,
    ...QuizResultColors,
  },
  dark: {
    text: MainColors.primaryBlack,
    background: MainColors.backgroundBeige,
    tint: tintColorDark,
    icon: MainColors.textGrey,
    tabIconDefault: MainColors.textGrey,
    tabIconSelected: tintColorDark,
    ...MainColors,
    ...EraColors,
    ...QuizResultColors,
    ...MainColors,
    ...EraColors,
    ...QuizResultColors,
  },
};

// Font family definitions
export const FontFamily = {
  // H1, H2 - Khula-ExtraBold
  khula: Platform.select({
    ios: 'Khula-ExtraBold',
    android: 'Khula-ExtraBold',
    default: 'Khula-ExtraBold',
    web: "'Khula', system-ui, sans-serif",
  }),
  // Body, Small, Button - Inter-Medium
  interMedium: Platform.select({
    ios: 'Inter-Medium',
    android: 'Inter-Medium',
    default: 'Inter-Medium',
    web: "'Inter', system-ui, sans-serif",
  }),
  // H3, H4, H6 - Inter-Bold
  interBold: Platform.select({
    ios: 'Inter-Bold',
    android: 'Inter-Bold',
    default: 'Inter-Bold',
    web: "'Inter', system-ui, sans-serif",
  }),
  // H5 - Inter-Black
  interBlack: Platform.select({
    ios: 'Inter-Black',
    android: 'Inter-Black',
    default: 'Inter-Black',
    web: "'Inter', system-ui, sans-serif",
  }),
} as const;

// Typography definitions 
export const Typography = {
  h1: {
    fontFamily: FontFamily.khula,
    fontSize: 56,
    lineHeight: Math.round(56 * 1.1), // 110%
  },
  h2: {
    fontFamily: FontFamily.khula,
    fontSize: 36,
    lineHeight: Math.round(36 * 1.1),
  },
  h3: {
    fontFamily: FontFamily.interBold,
    fontSize: 28,
    lineHeight: Math.round(28 * 1.4), // 140%
  },
  h4: {
    fontFamily: FontFamily.interBold,
    fontSize: 20,
    lineHeight: Math.round(20 * 1.4),
  },
  h5: {
    fontFamily: FontFamily.interBlack,
    fontSize: 18,
    lineHeight: Math.round(18 * 1.4),
  },
  h6: {
    fontFamily: FontFamily.interBold,
    fontSize: 18,
    lineHeight: Math.round(18 * 1.4),
  },
  body: {
    fontFamily: FontFamily.interMedium,
    fontSize: 18,
    lineHeight: Math.round(16 * 1.4),
  },
  small: {
    fontFamily: FontFamily.interMedium,
    fontSize: 15,
    lineHeight: Math.round(18 * 1.4),
  },
  button: {
    fontFamily: FontFamily.interMedium,
    fontSize: 16,
    lineHeight: Math.round(16 * 1.4),
  },
} as const;

export type TypographyVariant = keyof typeof Typography;
