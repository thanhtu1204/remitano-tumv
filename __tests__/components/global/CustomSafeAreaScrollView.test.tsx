import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import CustomSafeAreaScrollView from 'components/global/CustomSafeAreaViewScroll';

describe('CustomSafeAreaScrollView', () => {
  it('should render children correctly', () => {
    render(
      <CustomSafeAreaScrollView>
        <Text>Test Child</Text>
      </CustomSafeAreaScrollView>,
    );

    expect(screen.getByText('Test Child')).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    render(
      <CustomSafeAreaScrollView style={customStyle}>
        <Text>Test Child</Text>
      </CustomSafeAreaScrollView>,
    );

    const container = screen.getByTestId('safe-area-view');
    expect(container.props.style).toContainEqual(customStyle);
  });
});
