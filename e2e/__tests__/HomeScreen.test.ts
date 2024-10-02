import { device, element, by, expect } from 'detox';

describe('Home Screen Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display the home screen with tabs "Phim", "Yêu Thích", and "Đang Đặt"', async () => {
    await expect(element(by.text('Phim'))).toBeVisible();
    await expect(element(by.text('Yêu Thích'))).toBeVisible();
    await expect(element(by.text('Đang Đặt'))).toBeVisible();
  });

  it('should switch to "Yêu Thích" tab', async () => {
    await element(by.text('Yêu Thích')).tap();
    await expect(element(by.id('favorite-movies-list'))).toBeVisible();
  });

  it('should switch to "Đang Đặt" tab', async () => {
    await element(by.text('Đang Đặt')).tap();
    await expect(element(by.id('booked-movies-list'))).toBeVisible();
  });

  it('should display a list of movies in "Phim" tab', async () => {
    await element(by.text('Phim')).tap();
    await expect(element(by.id('movie-list'))).toBeVisible();
    await expect(element(by.id('movie-item-0'))).toBeVisible();
  });

  it('should add a movie to favorites when "Yêu Thích" button is pressed', async () => {
    await element(by.text('Phim')).tap();
    await element(by.id('movie-item-0')).tap();
    await element(by.id('favorite-button-0')).tap();
    await element(by.text('Yêu Thích')).tap();
    await expect(element(by.id('movie-item-0'))).toBeVisible();
  });

  it('should navigate to the booking screen when "Đặt vé" button is pressed', async () => {
    await element(by.text('Phim')).tap();
    await element(by.id('movie-item-1')).tap();
    await element(by.id('book-button-1')).tap();
    await expect(element(by.text('Đặt vé cho Movie Title 1'))).toBeVisible();
  });
});
