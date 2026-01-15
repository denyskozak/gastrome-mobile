import React, {useContext, createContext, useState, useEffect} from 'react';
import {getDailyViewedRecipes} from "../utilities/dailyRecipeLimit";
import {useSubscriptions} from "./subscriptions.context";

export const FreeRecipesContext = createContext(null);

// Hook
export const useFreeRecipes = () => {
    const context = useContext(FreeRecipesContext);

    if (!context) {
        throw new Error('useFreeRecipes must be used within a FreeRecipesContext.Provider')
    }

    const {
        viewedRecipeIds,
        setViewedRecipeIds,
    } = context;

    return [
        viewedRecipeIds,
        setViewedRecipeIds,
    ];
};

// Component
const FreeRecipesComponent = (props) => {
    const {
        children,
    } = props;
    const [isSubscriber] = useSubscriptions();

    const [viewedRecipeIds, setViewedRecipeIds] = useState([]);

    useEffect(() => {
        if (isSubscriber) {
            setViewedRecipeIds([]);
            return;
        }

        let isMounted = true;

        const loadViewedRecipes = async () => {
            try {
                const {ids} = await getDailyViewedRecipes();
                if (isMounted) {
                    setViewedRecipeIds(ids);
                }
            } catch (error) {
                if (isMounted) {
                    setViewedRecipeIds([]);
                }
            }
        };

        loadViewedRecipes();

        return () => {
            isMounted = false;
        };
    }, [isSubscriber]);

    const value = {
        viewedRecipeIds,
        setViewedRecipeIds,
    };

    return (
        <FreeRecipesContext.Provider value={value}>
            {children}
        </FreeRecipesContext.Provider>
    );
};

export const FreeRecipesContextWrapper = FreeRecipesComponent;
