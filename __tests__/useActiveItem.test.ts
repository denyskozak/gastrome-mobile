import { act, renderHook } from '@testing-library/react-hooks';
import type { ViewToken } from 'react-native';
import { useActiveItem } from '../src/hooks/useActiveItem';

describe('useActiveItem', () => {
  const createToken = (index: number, isViewable = true): ViewToken => ({
    index,
    isViewable,
    item: null,
    key: String(index),
    timestamp: Date.now(),
    section: undefined,
  });

  it('updates active index from viewable items', () => {
    const { result } = renderHook(() => useActiveItem());

    act(() => {
      result.current.onViewableItemsChanged({
        viewableItems: [createToken(2), createToken(3, false)],
      });
    });

    expect(result.current.activeIndex).toBe(2);
  });

  it('allows manual active index override', () => {
    const { result } = renderHook(() => useActiveItem());

    act(() => {
      result.current.setActiveIndex(4);
    });

    expect(result.current.activeIndex).toBe(4);
  });
});
