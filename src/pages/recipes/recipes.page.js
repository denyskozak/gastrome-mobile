import React, {useState, useMemo, useEffect, useRef, useCallback, Fragment} from 'react';
import {Text, View, Pressable, SafeAreaView} from 'react-native';
import SwipeablePanel from 'react-native-sheets-bottom';
import Icon from '@expo/vector-icons/Ionicons';
import { FlashList } from "@shopify/flash-list";
import * as Haptics from "expo-haptics";

import {RecipeItem} from './components/recipes.item.component';
import {useTranslator} from '../../hooks/useTranslator';
import {Button} from '../../components/atomic/button/button.component';
import {Colors} from '../../styles/colors';
import {sortRecipes} from './recipes.sortings';
import {filterRecipes} from './recipes.filters';
import {useSearchByIngredients} from '../../contexts/searchByIngredients.context';
import {filterRecipesByIngredientsList} from './recipes.utilities';
import {recipeRoute, recipesGroceryRoute} from './navigation/recipes.routes';
import {useFavorites} from '../../contexts/favorites.context';
import {getDevice} from '../../utilities/getCurrentDevice';
import {SubscriptionsModal} from '../../components/templates/subscriptions-modal/subscriptions-modal';

import styles from './recipes.styles';
import {useRecipes} from "../../hooks/useRecipes";
import {useSubscriptions} from "../../contexts/subscriptions.context";
import {SubscriptionButton} from "../../components/templates/subscription-button/subscription-button";
import {filterIcons} from "../../constants/filters";
import {renderFilterIcon} from "../../utilities/renders";
import {useSettings} from "../../contexts/settings.context";

filterIcons.pop(); // remove last el for space

let isFirstRun = true;
const RecipesPageComponent = (props) => {
    const {
        navigation,
    } = props;

    console.log('props ', props)
    const [t, , currentLanguage] = useTranslator('pages.recipes');
    const [tFilter] = useTranslator('components.filters');
    const [favorites] = useFavorites();
    const [isSubscriber] = useSubscriptions();
    const [{filterNames}, setSetting] = useSettings();
    const setFilterNames = name => setSetting('filterNames', name);
    console.log('filterNames ', filterNames);

    const [recipes] = useRecipes(true);

    // Add like to filers of item
    const preMappingFavorites = useCallback((items) => {
        return items.map(item => {
            const isFavorites = favorites.includes(item.id);
            return {
                ...item,
                filters: isFavorites ? [...item.filters, 'Favorites'] : item.filters,
            }
        });
    }, [favorites]);

    const defaultDataList = useMemo(() => sortRecipes(preMappingFavorites(recipes), isSubscriber ? 'asc' : 'free'), [preMappingFavorites, recipes, isSubscriber]);
    // List
    const [listData, setListData] = useState(defaultDataList);
    const [searchedItems, setSearchedItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [listSearchByIngredients, setSearchByIngredients] = useSearchByIngredients();
    const [filteredByChosenIngredientsListData, setFilteredByChosenIngredientsListData] = useState([]);
    const [isFilterOpened, setFilterOpened] = useState(false);
    const [isSubscriptionsOpened, setSubscriptionsOpened] = useState(false);
    const flatListRef = useRef(null);

    // Search
    const findRecipeIndexesByTitle = useCallback((value, list) => {
        // First search by filtered items
        return list.reduce(
            (acc, item, index) => {
                if (item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                    acc.push(index);
                }

                return acc;
            },
            [],
        )
    }, []);

    const applySearch = useCallback(
        (value, items) => findRecipeIndexesByTitle(value, items).map(index => ({...listData[index]})),
        [listData]);

    useEffect(() => {
        setListData(defaultDataList);
    }, [defaultDataList])

    useEffect(() => {
        setSearchedItems(applySearch(searchText, listData));
    }, [searchText, listData])

    useEffect(() => {
        isFirstRun = false;
    }, []);

    // Filter by selected ingredients on Grocery page
    useEffect(() => {
        if (listSearchByIngredients.length > 0) {
            const items = filterRecipesByIngredientsList(listData, listSearchByIngredients);
            setSearchText('');
            setFilterNames([]);
            setListData(items);
            setFilteredByChosenIngredientsListData(items);
            flatListRef.current.scrollToOffset({animated: true, offset: 0});
        }
    }, [setListData, listSearchByIngredients]);

    const applyFilters = useCallback((items, dataAsDefault) => (
        items
            // Collect all recipes from all filters
            .reduce((store, filterName) => {
                return [...store, ...filterRecipes(dataAsDefault, filterName)]
            }, [])
            // Remove duplicates
            .reduce((store, item) => {
                const createExistsFunction = (id) => (item) => id === item.id;

                const exists = store.find(
                    createExistsFunction(item.id)
                );
                if (!exists) {
                    return [...store, item];
                }

                return store;
            }, [])
    ), []);

    // Filter recipes on filterNames change
    useEffect(() => {
        const listDataAsDefault = listSearchByIngredients.length > 0 ? filteredByChosenIngredientsListData : defaultDataList;
        if (filterNames.length === 0) return setListData(listDataAsDefault);

        const items = applyFilters(filterNames, listDataAsDefault);
        if (searchText) {
            setSearchedItems(applySearch(searchText, items));
        }
        setListData(items);
        flatListRef.current.scrollToOffset({animated: true, offset: 0});
    }, [filterNames]);


    const renderFilters = (item) => (
        <Button
            type="outlined"
            key={`filter-${item}`}
            style={styles.filterCloseButton}
            onPress={() => setFilterNames(filterNames.filter(name => name !== item))}
        >
            {tFilter(item)}
            {renderFilterIcon(item)}
            {' '}
            <Icon name="close-circle-outline" size={16}/>
        </Button>
    );

    const renderSelectedIngredients = () => listSearchByIngredients.length > 0
        ? (
            <View style={styles.searchByIngredientsContainer}>
                <Text
                    style={styles.searchByIngredients}>{t('selectedIngredientsTitle')}: {listSearchByIngredients.join(', ')}</Text>
                <Button
                    size="l"
                    type="outlined"
                    style={
                        styles.resetButton
                    }
                    onPress={() => {
                        setSearchByIngredients([]);
                        setSearchText('');
                        setFilterNames([]);
                        setListData(defaultDataList);
                        flatListRef.current.scrollToOffset({animated: true, offset: 0});
                    }}
                >
                    <Text style={styles.resetButtonText}>
                        {t('reset')}
                        {' '}
                        <Icon name="close-circle-outline" size={14} color={Colors.white}/>
                    </Text>
                </Button>
            </View>
        ) : null;

    const renderFilter = filter => (
        <Button
            size="l"
            type="outlined"
            key={`filter-${filter}`}
            onPress={() => setFilter(filter)}
            selected={filterNames.includes(filter)}
        >
            {tFilter(filter)}
            {renderFilterIcon(filter)}
        </Button>
    );

    const setFilter = (name) => {
        // remove if exist in list
        if (filterNames.includes(name)) {
            setFilterNames(filterNames.filter(item => item !== name));
            return;
        }

        // add
        if (filterNames.length < 3) {
            setFilterNames([...filterNames, name]);
        }
    };

    // Priority: searchedItems -> listData
    const data = searchText
        ? searchedItems
        : listData;

    // indexes: 0 - label, 1 - icon name, 2 - onPress
    const actions = [
        [t('filters'), 'filter-outline', () => setFilterOpened(true)],
        [t('ingredients'), 'nutrition-outline', () => navigation.navigate(recipesGroceryRoute)],
        [t('favorites'), 'bookmark-outline', () => setFilter('favorites')]
    ];

    const renderActions = () => (
        actions.map(([text, iconName, onPress]) => (
            <Fragment key={text}>
                <Pressable onPress={onPress}>
                    <Text style={styles.actionText}>{text}</Text>
                </Pressable>
                <Button
                    style={styles.actionButton}
                    type="outlined"
                    onPress={onPress}
                    size="s"
                >
                    <Icon name={iconName} size={24} color={Colors.black}/>
                </Button>
            </Fragment>
        ))
    )
    return (
        <SafeAreaView style={styles.container}>
            {/*Actions and search*/}
            <View style={styles.actionButtonsContainer}>
                {/* Hidden search by name, return in future */}
                {/*<View style={styles.actionContainer}>*/}
                {/*  <Input*/}
                {/*    placeholder={t('searchTitle')}*/}
                {/*    style={styles.search}*/}
                {/*    onChange={value => {*/}
                {/*      setSearchText(value);*/}
                {/*    }}*/}
                {/*    value={searchText}*/}
                {/*  />*/}
                {/*</View>*/}
                <View style={styles.actionContainer}>

                    {filterNames.length > 0
                        ? <View
                            style={styles.filterButtons}
                        >
                            {filterNames.map(renderFilters)}
                        </View>
                        : renderActions()}
                </View>
            </View>

            {/*Filters*/}

            {/*Items list*/}
            <FlashList
                // initialNumToRender={getDevice() === 'iPad' ? 4 : 2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ref={flatListRef}
                // contentContainerStyle={styles.list}
                data={data}

                estimatedItemSize={data.length > 0 ? data.length : 1}
                getItemCount={items => items.length}
                getItem={(items, index) => data[index]}
                numColumns={2}
                ListEmptyComponent={<Text style={styles.emptyList}>{t('emptyList')}</Text>}
                ListHeaderComponent={<View>
                    {renderSelectedIngredients()}
                    {!isSubscriber
                        ? <View style={styles.firstSubscriptionButton}>
                            <SubscriptionButton onPress={() =>setSubscriptionsOpened(true)} text={t('buySubscription')} />
                    </View>
                        : null}
                </View>}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={
                    () => !isSubscriber
                        ? (<View style={styles.subscriptions}>
                            <SubscriptionButton onPress={() => {
                                Haptics.impactAsync('light');
                                setSubscriptionsOpened(true);
                            }} text={t('buySubscription')} />
                        </View>)
                        : null
                }
                keyExtractor={item => item.id}
                renderItem={({item}) => {

                    return (
                        <RecipeItem
                            // enableHint
                            onPress={id => {
                                navigation.navigate(recipeRoute, {id});
                                Haptics.selectionAsync();
                            }}
                            isFavorited={favorites.includes(item.id)}
                            selectedIngredients={listSearchByIngredients}
                            {...item}
                        />
                    )
                }}
            />

            <SubscriptionsModal
                isOpen={isSubscriptionsOpened}
                onChangeVisible={() => {
                    setSubscriptionsOpened(false)
                }}
            />

            {/*Filters*/}
            <SwipeablePanel
                // fullWidth
                onlyLarge
                closeOnTouchOutside
                barStyle={styles.filtersBar}
                isActive={isFilterOpened}
                style={styles.filters}
                onClose={() => setFilterOpened(false)}
            >
                <Text style={styles.filtersTitle}>{t('filtersTitle')}</Text>
                <View style={styles.filtersClose}>
                    <Button
                        size="l"
                        // type="outlined"
                        onPress={() => setFilterOpened(false)}
                    >
                        {t(filterNames.length ? 'apply' : 'close')}
                    </Button>
                </View>
                <View style={styles.filtersContainer}>
                    {filterIcons.map(list => (
                        <View key={`filters-group-${Object.keys(list)}`} style={styles.filtersSection}>
                            {Object.keys(list).map(renderFilter)}
                        </View>
                    ))}
                </View>

            </SwipeablePanel>
        </SafeAreaView>
    );
};

export const RecipesPage = RecipesPageComponent;