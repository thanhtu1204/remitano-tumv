import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react-native';
import Input from 'components/ui/Input';

describe('Input component', () => {
  const mockOnChangeText = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<Input value="" onChangeText={mockOnChangeText} placeholder="Enter text" testID="inputComponent" />);
    expect(screen.getByTestId('inputComponent')).toBeTruthy();
  });

  it('should display the placeholder text', () => {
    render(<Input value="" onChangeText={mockOnChangeText} placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('should call onChangeText when text is entered', () => {
    render(<Input value="" onChangeText={mockOnChangeText} placeholder="Enter text" />);
    fireEvent.changeText(screen.getByTestId('textInput'), 'New text');
    expect(mockOnChangeText).toHaveBeenCalledWith('New text');
  });

  it('should display error text if error prop is provided', () => {
    render(<Input value="" onChangeText={mockOnChangeText} placeholder="Enter text" error="This is an error" />);
    expect(screen.getByTestId('errorText')).toHaveTextContent('This is an error');
  });

  it('should call onFocus and set focus state on input focus', () => {
    render(<Input value="" onChangeText={mockOnChangeText} placeholder="Enter text" onFocus={mockOnFocus} />);
    fireEvent.focus(screen.getByTestId('textInput'));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it('should call onBlur and remove focus state on input blur', () => {
    render(<Input value="" onChangeText={mockOnChangeText} placeholder="Enter text" onBlur={mockOnBlur} />);
    fireEvent.blur(screen.getByTestId('textInput'));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('should apply disabled style and prevent text changes when disabled', () => {
    render(<Input value="" onChangeText={mockOnChangeText} placeholder="Enter text" disabled />);

    // Check that pointerEvents is set to 'none' for the disabled state
    const animatedView = screen.getByTestId('animatedView');
    expect(animatedView).toHaveStyle({ pointerEvents: 'none' });

    // Ensure the text input is not editable
    const textInput = screen.getByTestId('textInput');
    expect(textInput.props.editable).toBe(false);
  });

  it('should handle multiple focus and blur events', () => {
    render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter text"
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />,
    );

    fireEvent.focus(screen.getByTestId('textInput'));
    fireEvent.blur(screen.getByTestId('textInput'));
    fireEvent.focus(screen.getByTestId('textInput'));
    fireEvent.blur(screen.getByTestId('textInput'));

    expect(mockOnFocus).toHaveBeenCalledTimes(2);
    expect(mockOnBlur).toHaveBeenCalledTimes(2);
  });

  it('should call default onFocus function when not provided', () => {
    render(<Input value="" onChangeText={mockOnChangeText} placeholder="Enter text" />);

    fireEvent.focus(screen.getByTestId('textInput'));
  });

  it('should call default onBlur function when not provided', () => {
    render(<Input value="" onChangeText={mockOnChangeText} placeholder="Enter text" />);

    fireEvent.blur(screen.getByTestId('textInput'));
  });
});
