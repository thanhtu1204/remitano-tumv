import { Dimensions, PixelRatio } from 'react-native';
import {
  moderateScale, scale, verticalScale,
} from 'react-native-size-matters';

export const normalizeModerately = (size: number, factor = 0.5): number => PixelRatio.roundToNearestPixel(moderateScale(size, factor));

export const normalizeWidth = (size: number): number => PixelRatio.roundToNearestPixel(scale(size));

export const normalizeHeight = (size: number): number => PixelRatio.roundToNearestPixel(verticalScale(size));

export const screenWidth: number = Dimensions.get('window').width;
export const screenHeight: number = Dimensions.get('window').height;
