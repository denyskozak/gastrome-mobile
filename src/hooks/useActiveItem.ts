import { useCallback, useMemo, useRef, useState } from 'react';
import type { ViewToken } from 'react-native';

export type ActiveItemHookConfig = {
  itemVisiblePercentThreshold?: number;
};

export type UseActiveItemResult = {
  activeIndex: number;
  onViewableItemsChanged: ({ viewableItems }: { viewableItems: Array<ViewToken> }) => void;
  viewabilityConfig: { itemVisiblePercentThreshold: number };
  setActiveIndex: (index: number) => void;
};

const DEFAULT_THRESHOLD = 80;

/**
 * Tracks currently visible index inside a FlatList with memoised callbacks to prevent re-renders.
 */
export const useActiveItem = (
  config: ActiveItemHookConfig = {},
): UseActiveItemResult => {
  const { itemVisiblePercentThreshold = DEFAULT_THRESHOLD } = config;

  const viewabilityConfig = useMemo(
    () => ({ itemVisiblePercentThreshold }),
    [itemVisiblePercentThreshold],
  );

  const activeIndexRef = useRef(0);
  const viewableItemsRef = useRef<{ viewableItems: Array<ViewToken> } | null>(null);
  const [activeIndex, setActiveIndexState] = useState(0);

  const setActiveIndex = useCallback((index: number) => {
    if (activeIndexRef.current !== index) {
      activeIndexRef.current = index;
      setActiveIndexState(index);
    }
  }, []);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      viewableItemsRef.current = { viewableItems };
      const nextItem = viewableItems.find((item) => item.isViewable && item.index != null);
      if (nextItem?.index != null) {
        setActiveIndex(nextItem.index);
      }
    },
    [setActiveIndex],
  );

  return {
    activeIndex,
    onViewableItemsChanged,
    viewabilityConfig,
    setActiveIndex,
  };
};
