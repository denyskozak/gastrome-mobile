import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import _ from 'lodash';
import Icon from '@expo/vector-icons/Ionicons';
import { isAvailableAsync, requestReview } from 'expo-store-review';

import { useTranslator } from '../../hooks/useTranslator';
import { useMenuCart } from '../../contexts/cart.context';

import { Spaces } from '../../styles/spaces';
import { Button } from '../../components/atomic/button/button.component';
import { Colors } from '../../styles/colors';
import { Input } from '../../components/atomic/input/input.component';
import { useCommonModal } from '../../contexts/commonModal/commonModal.context';
import { mapRenderCartQuantity } from '../recipe/recipe.renders';
import { sortByTitle } from '../recipes/recipes.sortings';
import {
  addSpaceBefore,
  addSpaceWithCondition,
} from '../../utilities/renders';
import { ConfirmModal } from '../../components/molecular/confirm-modal/confirm-modal.component';
import { ON_BOARD_CART_STORE_KEY } from '../../constants/asyncStoreKeys';
import { IntroVideoModal } from '../../components/organismic/intro-video-modal/intro-video-modal';
import { useIsFirstLaunchByKey } from '../../hooks/useIsFirstLaunchByKey';

import styles from './cart.styles';
import { HelpButton } from '../../components/molecular/help-button/help-button';
import { useSettings } from '../../contexts/settings.context';
import { handleSocialShare } from '../../utilities/socialShare';
import { recipesPageRoute } from '../../navigation/navigation.routes';
import { recipesRoute } from '../recipes/navigation/recipes.routes';

const intoVideo = require('./cart-instruction-video.mp4');

const CartPageComponent = (props) => {
  const {
    navigation,
  } = props;

  const [t] = useTranslator('pages.cart');

  const [cart, addCartItems, setCart] = useMenuCart();
  const [selected, setSelected] = useState([]);
  const [addIngredientValue, setAddIngredientValue] = useState('');
  const [hasIngredientAdded, setHasIngredientAdded] = useState(false);
  const [isRefreshConfirmModalOpen, setRefreshConfirmModalOpen] = useState(false);
  const [isOnBoardModalVisible, setIsOnBoardModalVisible] = useIsFirstLaunchByKey(ON_BOARD_CART_STORE_KEY);
  const [settings] = useSettings();
  const { measure } = settings;

  const [openCommonModal] = useCommonModal();

  useEffect(() => {
    if (hasIngredientAdded) {
      setTimeout(() => {
        setHasIngredientAdded(false);
      }, 1200);
    }
  }, [hasIngredientAdded]);

  const collectSameItems = (store = [], item) => {
    const {quantity, unit} = item;
    const index = store.findIndex(searchItem => searchItem.title === item.title);

    if (index > -1) {
      if (quantity) {
        // Looking by same quantity for sum their quantities together if name of unit the same
        const quantityIndex = store[index].quantities.findIndex(item => item.unit === unit);
        if (quantityIndex > -1) {
          store[index].quantities[quantityIndex].quantity += quantity;
        } else {
          store[index].quantities.push({quantity, unit});
        }
      }

    } else {
      store.push({
        title: item.title,
        comment: item.comment,
        quantities: quantity ? [{quantity, unit}] : [],
      });
    }

    return store;
  };

  // Items
  const items = useMemo(() => cart.sort(sortByTitle).reduce(collectSameItems, []), [cart]);
  const isSelectedAll = items.length > 0 && selected.length === items.length;
  const isDeleteButtonDisplays = selected.length > 0 && selected.length !== items.length;
  const isShareButtonDisplays = items.length > 0;

  const handleShare = async () => {
    try {
      const itemsList = items.map(renderShareIngredients).join(', \n');
      await handleSocialShare(
        `I've prepared list of products for next shopping: \n\n${itemsList}.`,
      );
    } catch (error) {
      alert(error.message);
    }
  };
  const renderShareIngredients = (item) => {
    const quantities = item.quantities.map((item) => mapRenderCartQuantity(item, measure)).join(', ');
    return `${item.title}${addSpaceWithCondition(quantities, item.quantities.length > 0)}${addSpaceBefore(item.comment)}`;
  };

  const addItemToList = () => {
    const foundDuplicate = items.find(item => item.title === addIngredientValue);
    if (!foundDuplicate) {
      addCartItems([{title: addIngredientValue}]);
      setHasIngredientAdded(true);
      // openCommonModal({
      //   icon: 'checkmark-done-outline', title: t('addedToCartTitle', {name: addIngredientValue}),
      // });
    } else {
      openCommonModal({
        icon: 'checkmark-done-outline', title: t('alreadyAdded', {name: addIngredientValue}),
      });
    }
    setAddIngredientValue('');
  };

  const renderItem = ({item, index}) => (
    <View
      key={item.title + index}
      style={styles.itemWrapper}
    >
      <Button
        onPress={() => selected.includes(index) ? setSelected(_.without(selected, index)) : setSelected([...selected, index])}
        style={styles.item}
        type="outlined"
        selected={selected.includes(index)}
      >
        {/*Title*/}
        {selected.includes(index) && (<><Icon name="checkmark-outline" size={Spaces.medium}/>{' '}</>)}
        {item.title}
        {' '}
        {/*Quantities*/}
        {item.quantities.length > 0 && (<Text style={styles.subText}>
          ({item.quantities.map((item) => mapRenderCartQuantity(item, measure)).join(', ')})
        </Text>)}
        {/*Comment*/}
        {item.comment && <Text style={styles.subText}>{item.comment}</Text>}
      </Button>
    </View>
  );

  return (<SafeAreaView style={styles.container}>
    <View style={styles.content}>
      {/*Add ingredient*/}
      <View style={styles.addFormContainer}>
        <View style={styles.addForm}>
          <Input
            style={styles.titleInput}
            placeholder={t('addIngredient')}
            onChange={setAddIngredientValue}
            value={addIngredientValue}
            onSubmitEditing={addItemToList}
          />
          <Button
            style={styles.addButton}
            size="s"
            disabled={addIngredientValue === ''}
            onPress={addItemToList}
          >
            <Icon name={!hasIngredientAdded ? 'add-outline' : 'checkmark-done-outline'} size={24} color={Colors.white}/>
          </Button>
        </View>
      </View>
      {/*List*/}
        <FlatGrid
          spacing={Spaces.small}
          maxItemsPerRow={1}
          data={items}
          style={styles.itemsContainer}
          renderItem={renderItem}
          ListEmptyComponent={<View>
            <Text style={styles.notFound}>{t('notFound')}</Text>
            <Button
              style={styles.notFoundButton}
              textStyle={styles.notFoundButtonText}
              size="xl"
              type="outlined"
              onPress={() => {
                navigation.navigate(recipesPageRoute, {screen: recipesRoute})
              }}
              title={t('notFoundButton')}
            />
        </View>}
        />
    </View>

    {/*Action buttons*/}
    {isSelectedAll && (
        <Button
          style={styles.finishButton}
          animate
          type="fulled"
          onPress={() => {
            setCart([]);
            setSelected([]);
            isAvailableAsync().then(() => requestReview());
          }}
        >
          <Text style={styles.finishButtonText}>
            <Icon name="checkmark-done-outline" size={24} color={Colors.second}/>
            {' '}
            {t('finish')}
          </Text>
        </Button>

    )}

    {/*Finish button*/}
    {!isSelectedAll && (isDeleteButtonDisplays || isShareButtonDisplays) &&
      <View style={styles.actionButtons}>
        {isShareButtonDisplays && (<Button
          type="outlined"
          style={styles.actionButton}
          onPress={handleShare}
        >
          <Icon name="share-outline" size={24} color={Colors.black}/>
        </Button>)}
        <Button
          type="outlined"
          style={styles.actionButton}
          onPress={() => {
            setRefreshConfirmModalOpen(true);
          }}
        >
          <Icon name="refresh-outline" size={24} color={Colors.black}/>
        </Button>
        {isDeleteButtonDisplays && (<Button
          type="outlined"
          style={styles.actionButton}
          onPress={() => {
            setCart(cart.filter((item, index) => !selected.includes(index)));
            setSelected([]);
          }}
        >
          <Icon name="trash-outline" size={24} color={Colors.black}/>
        </Button>)}
      </View>
    }

    {/*Intro video modal*/}
    <IntroVideoModal isOpen={isOnBoardModalVisible} onChangeVisible={setIsOnBoardModalVisible} title={t('howItWorks')} source={intoVideo} />
    <HelpButton onPress={() => { setIsOnBoardModalVisible(true) }} />

    {/*Done modal*/}
    <ConfirmModal
      isOpen={isRefreshConfirmModalOpen}
      title={t('clear')}
      onConfirm={() => {
        setCart([]);
        setSelected([]);
      }}
      onClose={() => setRefreshConfirmModalOpen(false)}
    />
  </SafeAreaView>);
};

export const CartPage = CartPageComponent;
