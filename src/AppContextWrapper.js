import React from 'react';

import {MenuDarkModeContextWrapper} from './contexts/menuDarkMode.context';
import {SpeechProfileContextWrapper} from './contexts/speechProfile.context';
import {AppWrapper} from './AppWrapper';
import {MenuCartContextWrapper} from './contexts/cart.context';
import {CommonModalContextWrapper} from './contexts/commonModal/commonModal.context';
import {SearchByIngredientsContextWrapper} from './contexts/searchByIngredients.context';
import {FavoritesContextWrapper} from './contexts/favorites.context';
import {SubscriptionsContextWrapper} from './contexts/subscriptions.context';
import {SettingsContextWrapper} from './contexts/settings.context';

export const AppContextWrapper = () => {
    return (
        <MenuDarkModeContextWrapper>
            <SpeechProfileContextWrapper>
                <MenuCartContextWrapper>
                    <CommonModalContextWrapper>
                        <SearchByIngredientsContextWrapper>
                            <FavoritesContextWrapper>
                                <SubscriptionsContextWrapper>
                                    <SettingsContextWrapper>
                                        <AppWrapper/>
                                    </SettingsContextWrapper>
                                </SubscriptionsContextWrapper>
                            </FavoritesContextWrapper>
                        </SearchByIngredientsContextWrapper>
                    </CommonModalContextWrapper>
                </MenuCartContextWrapper>
            </SpeechProfileContextWrapper>
        </MenuDarkModeContextWrapper>
    );
};
