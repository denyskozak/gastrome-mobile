import React from 'react';

import {MenuDarkModeContextWrapper} from './contexts/menuDarkMode.context';
import {MenuCartContextWrapper} from './contexts/cart.context';
import {CommonModalContextWrapper} from './contexts/commonModal/commonModal.context';
import {SearchByIngredientsContextWrapper} from './contexts/searchByIngredients.context';
import {FavoritesContextWrapper} from './contexts/favorites.context';
import {SubscriptionsContextWrapper} from './contexts/subscriptions.context';
import {SettingsContextWrapper} from './contexts/settings.context';

export const AppContextWrapper = ({children}) => {
    return (
        <MenuDarkModeContextWrapper>
            <MenuCartContextWrapper>
                <CommonModalContextWrapper>
                    <SearchByIngredientsContextWrapper>
                        <FavoritesContextWrapper>
                            <SubscriptionsContextWrapper>
                                <SettingsContextWrapper>
                                    {children}
                                </SettingsContextWrapper>
                            </SubscriptionsContextWrapper>
                        </FavoritesContextWrapper>
                    </SearchByIngredientsContextWrapper>
                </CommonModalContextWrapper>
            </MenuCartContextWrapper>
        </MenuDarkModeContextWrapper>
    );
};
