import React, {useState, useMemo, useEffect, useRef, useCallback, Fragment} from 'react';
import {VirtualizedList, Text, View, Pressable, SafeAreaView} from 'react-native';
import SwipeablePanel from 'react-native-sheets-bottom';
import Icon from '@expo/vector-icons/Ionicons';

import {RecipeItem} from './components/recipes.item.component';
import {useTranslator} from '../../hooks/useTranslator';
import {Button} from '../../components/atomic/button/button.component';
import {Colors} from '../../styles/colors';
import {sortRecipes} from './recipes.sortings';
import {filterRecipes} from './recipes.filters';
import {useSearchByIngredients} from '../../contexts/searchByIngredients.context';
import {filterRecipesByIngredientsList} from './recipes.utilities';
import {CountryList} from '../../components/atomic/country-flag/country-flag.list';
import {CountryFlag} from '../../components/atomic/country-flag/country-flag.component';
import {recipeRoute, recipesGroceryRoute} from './navigation/recipes.routes';
import {useFavorites} from '../../contexts/favorites.context';
import {getDevice} from '../../utilities/getCurrentDevice';
import {SubscriptionsModal} from '../../components/templates/subscriptions-modal/subscriptions-modal';

import styles from './recipes.styles';
import {useRecipes} from "../../hooks/useRecipes";
import {useSubscriptions} from "../../contexts/subscriptions.context";
import {SubscriptionButton} from "../../components/templates/subscription-button/subscription-button";

const filters = [
    {
        'breakfast': '🍳',
        'lunch': '🍽️',
        'dinner': '🥘',
    },
    {
        'italy': '🇮🇹',
        'ukraine': '🇺🇦',
    },
    {
        // 'Christmas': '🎄',
        'pasta': '🍝',
        'dessert': '🍨',
        'snack': '🥨',
        'coffee': '☕',
        'salad': '🥗',
    }
];

const filtersFlatObject = filters.reduce((store, item) => ({...store, ...item}));
let isFirstRun = true;
const RecipesPageComponent = (props) => {
    const {
        navigation,
    } = props;

    const [t, , currentLanguage] = useTranslator('pages.recipes');
    const [tFilter] = useTranslator('components.filters');
    const [favorites] = useFavorites();
    const [isSubscriber] = useSubscriptions();

    const [recipes] = useRecipes();

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

    const defaultDataList = useMemo(() => sortRecipes(preMappingFavorites(recipes), 'asc'), [preMappingFavorites, recipes]);

    // List
    const [listData, setListData] = useState(defaultDataList);
    const [searchedItems, setSearchedItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filterNames, setFilterNames] = useState([]);
    const [listSearchByIngredients, setSearchByIngredients] = useSearchByIngredients();
    const [filteredByChosenIngredientsListData, setFilteredByChosenIngredientsListData] = useState([]);
    const [isFilterOpened, setFilterOpened] = useState(false);
    const [isSubscriptionsOpened, setSubscriptionsOpened] = useState(false);
    const flatListRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState(new Set());

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

    const renderFilterIcon = value => CountryList.includes(value)
        ? <> <CountryFlag name={value} size={14}/></>
        : <> {filtersFlatObject[value]}</>;

    const renderFilters = (item) => (
        <Button
            type="outlined"
            key={`filter-${item}`}
            style={styles.filterCloseButton}
            onPress={() => setFilterNames(filterNames.filter(name => name !== item))}
        >
            {item}
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
            onPress={() => setFilter(tFilter(filter))}
            selected={filterNames.includes(tFilter(filter))}
        >
            {tFilter(filter)}
            {renderFilterIcon(filter)}
        </Button>
    );

    const setFilter = (name) => {
        if (filterNames.includes(name)) {
            setFilterNames(filterNames.filter(item => item !== name));
            return;
        }
        setFilterNames([...filterNames, name]);
    };

    // Priority: searchedItems -> listData
    const data = searchText
        ? searchedItems
        : listData;

    // indexes: 0 - label, 1 - icon name, 2 - onPress
    const actions = [
        [t('filters'), 'filter-outline', () => setFilterOpened(true)],
        [t('ingredients'), 'nutrition-outline', () => navigation.navigate(recipesGroceryRoute)],
        [t('favorites'), 'bookmark-outline', () => setFilter('Favorites')]
    ];

    // onViewableItemsChanged callback
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        setVisibleItems(new Set(viewableItems.map((item) => item.key)));
    }).current;

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

                    {actions.map(([text, iconName, onPress]) => (
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
                    ))}

                </View>
            </View>

            {/*Filters*/}
            {filterNames.length > 0
                ? <View
                    style={styles.filterButtons}
                >
                    {filterNames.map(renderFilters)}
                </View>
                : null}
            {/*Items list*/}
            <VirtualizedList
                // initialNumToRender={getDevice() === 'iPad' ? 4 : 2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ref={flatListRef}
                onViewableItemsChanged={onViewableItemsChanged}
                contentContainerStyle={styles.list}
                data={data}
                gap={10}
                initialNumToRender={3}
                getItemCount={items => items.length}
                getItem={(items, index) => data[index]}
                numColumns={getDevice() === 'iPad' ? 2 : 1}
                ListEmptyComponent={<Text style={styles.emptyList}>{t('emptyList')}</Text>}
                ListHeaderComponent={<View>
                    {renderSelectedIngredients()}
                    {!isSubscriber
                        ? <View style={styles.firstSubscriptionButton}>
                            <Text style={styles.subscriptionsInto}>
                                {t('extraRecipesText')}
                            </Text>
                            <SubscriptionButton onPress={() =>setSubscriptionsOpened(true)} text={t('buySubscription')} />
                    </View>
                        : null}
                </View>}
                ListFooterComponent={
                    () => !isSubscriber
                        ? (<View style={styles.subscriptions}>
                            <Text style={styles.subscriptionsInto}>
                                {t('extraRecipesText')}
                            </Text>
                            <SubscriptionButton onPress={() => setSubscriptionsOpened(true)} text={t('buySubscription')} />
                        </View>)
                        : null
                }
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <RecipeItem
                        enableHint
                        animate={visibleItems.has(item.id)}
                        onPress={id => {
                            navigation.navigate(recipeRoute, {id});
                        }}
                        isFavorited={favorites.includes(item.id)}
                        selectedIngredients={listSearchByIngredients}
                        {...item}
                    />
                )}
            />

            <SubscriptionsModal
                isOpen={isSubscriptionsOpened}
                onChangeVisible={() => {
                    setSubscriptionsOpened(false)
                }}
            />

            {/*Filters*/}
            <SwipeablePanel
                fullWidth
                onlyLarge
                closeOnTouchOutside
                barStyle={styles.filtersBar}
                isActive={isFilterOpened}
                style={styles.filters}
                onClose={() => setFilterOpened(false)}
            >
                <Text style={styles.filtersTitle}>{t('filtersTitle')}</Text>
                <View style={styles.filtersContainer}>
                    {filters.map(list => (
                        <View key={`filters-group-${Object.keys(list)}`} style={styles.filtersSection}>
                            {Object.keys(list).map(renderFilter)}
                        </View>
                    ))}
                </View>
                <View style={styles.filtersClose}>
                    <Button
                        size="l"
                        // type="outlined"
                        onPress={() => setFilterOpened(false)}
                    >
                        {t(filterNames.length ? 'apply' : 'close')}
                    </Button>
                </View>
            </SwipeablePanel>
        </SafeAreaView>
    );
};

export const RecipesPage = RecipesPageComponent;