import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import OnboardItem from 'components/global/OnboardItem';

describe('OnboardItem', () => {
  const mockOnPressFirst = jest.fn();
  const mockOnPressSecond = jest.fn();
  const imageSource = { uri: 'https://example.com/image.jpg' };
  const title = 'Test Title';
  const subtitle = 'Test Subtitle';
  const buttonTitleFirst = 'First Button';
  const buttonTitleSecond = 'Second Button';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with one button', () => {
    render(
      <OnboardItem
        imageSource={imageSource}
        title={title}
        subtitle={subtitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
      />,
    );

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByText(subtitle)).toBeTruthy();
    expect(screen.getByText(buttonTitleFirst)).toBeTruthy();
    expect(screen.getByTestId('background-image')).toBeTruthy();
  });

  it('should render correctly with two buttons', () => {
    render(
      <OnboardItem
        imageSource={imageSource}
        title={title}
        subtitle={subtitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
        onPressSecond={mockOnPressSecond}
        buttonTitleSecond={buttonTitleSecond}
      />,
    );

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByText(subtitle)).toBeTruthy();
    expect(screen.getByText(buttonTitleFirst)).toBeTruthy();
    expect(screen.getByText(buttonTitleSecond)).toBeTruthy();
  });

  it('should call onPressFirst when the first button is pressed', () => {
    render(
      <OnboardItem
        imageSource={imageSource}
        title={title}
        subtitle={subtitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
      />,
    );

    fireEvent.press(screen.getByText(buttonTitleFirst));
    expect(mockOnPressFirst).toHaveBeenCalled();
  });

  it('should call onPressSecond when the second button is pressed', () => {
    render(
      <OnboardItem
        imageSource={imageSource}
        title={title}
        subtitle={subtitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
        onPressSecond={mockOnPressSecond}
        buttonTitleSecond={buttonTitleSecond}
      />,
    );

    fireEvent.press(screen.getByText(buttonTitleSecond));
    expect(mockOnPressSecond).toHaveBeenCalled();
  });
});
