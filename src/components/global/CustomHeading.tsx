import {
  View, Text, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { goBack } from 'utils/NavigationUtil';
import TextStyle from 'styles/TextStyle';

interface CustomHeadingProps {
  title: string;
}

const CustomHeading: React.FC<CustomHeadingProps> = ({ title }) => (
  <View>
    <TouchableOpacity testID="back-button" onPress={() => goBack()}>
      <ChevronLeftIcon color="white" />
    </TouchableOpacity>
    <Text style={TextStyle.headingTitle}>{title}</Text>
  </View>
);

export default CustomHeading;
