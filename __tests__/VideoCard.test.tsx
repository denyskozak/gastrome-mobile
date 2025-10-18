import React from 'react';
import { render } from '@testing-library/react-native';
import { VideoCard } from '../src/components/video/VideoCard';
import type { VideoItem } from '../src/types/video';

jest.mock('expo-av', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Video: React.forwardRef((props, ref) => <View ref={ref} {...props} testID="video" />),
    ResizeMode: { COVER: 'cover' },
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

const baseItem: VideoItem = {
  id: 'video-test',
  source: 'https://example.com/video.mp4',
  poster: 'https://example.com/poster.jpg',
  title: 'Test video',
  author: {
    name: 'Tester',
    avatar: 'https://example.com/avatar.jpg',
  },
  description: 'Test description',
  tags: ['#tag'],
};

describe('VideoCard', () => {
  it('renders video card layout', () => {
    const { toJSON } = render(
      <VideoCard
        item={baseItem}
        index={0}
        isActive={false}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
