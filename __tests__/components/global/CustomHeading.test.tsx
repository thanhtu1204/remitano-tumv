import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import CustomHeading from 'components/global/CustomHeading';
import { goBack } from 'utils/NavigationUtil';

// Mock the goBack function
jest.mock('../../../src/utils/NavigationUtil', () => ({ goBack: jest.fn() }));

describe('CustomHeading', () => {
  it('should render the title correctly', () => {
    const title = 'Test Title';
    render(<CustomHeading title={title} />);

    // Sử dụng `screen` để truy cập `getByText`
    expect(screen.getByText(title)).toBeTruthy();
  });

  it('should call goBack when the back button is pressed', () => {
    render(<CustomHeading title="Test Title" />);

    const backButton = screen.getByTestId('back-button');

    fireEvent.press(backButton);

    expect(goBack).toHaveBeenCalled();
  });
});
