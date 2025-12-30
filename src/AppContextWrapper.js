import React from 'react';

import {MenuDarkModeContextWrapper} from './contexts/menuDarkMode.context';
import {MenuCartContextWrapper} from './contexts/cart.context';
import {CommonModalContextWrapper} from './contexts/commonModal/commonModal.context';
import {SearchByIngredientsContextWrapper} from './contexts/searchByIngredients.context';
import {FavoritesContextWrapper} from './contexts/favorites.context';
import {SubscriptionsContextWrapper} from './contexts/subscriptions.context';
import {SettingsContextWrapper} from './contexts/settings.context';
import { SplashScreenContextWrapper} from "./contexts/splash-screen.context";

export const AppContextWrapper = ({children, defaultSettings = null}) => {
    return (
        <MenuDarkModeContextWrapper>
            <MenuCartContextWrapper>
                <CommonModalContextWrapper>
                    <SearchByIngredientsContextWrapper>
                        <FavoritesContextWrapper>
                            <SubscriptionsContextWrapper>
                                <SettingsContextWrapper defaultSettings={defaultSettings}>
                                    <SplashScreenContextWrapper>
                                    {children}
                                    </SplashScreenContextWrapper>
                                </SettingsContextWrapper>
                            </SubscriptionsContextWrapper>
                        </FavoritesContextWrapper>
                    </SearchByIngredientsContextWrapper>
                </CommonModalContextWrapper>
            </MenuCartContextWrapper>
        </MenuDarkModeContextWrapper>
    );
};
