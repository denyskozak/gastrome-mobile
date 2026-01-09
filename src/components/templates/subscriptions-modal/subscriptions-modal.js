import React, {useMemo, useState} from 'react';
import NativeModal from 'react-native-modal';
import {ImageBackground, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import {Button} from '../../atomic/button/button.component';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import {useStyles} from './subscriptions-modal.styles';
import {useTranslator} from '../../../hooks/useTranslator';
import {AnimatedLogo} from '../../atomic/logo/animated-logo.component';
import Purchases from 'react-native-purchases';
import {useSubscriptions} from '../../../contexts/subscriptions.context';
import {Spaces} from '../../../styles/spaces';
import * as Haptics from 'expo-haptics';
import PaywallBackground from '../../../../assets/paywall-background.jpg';
import {useTheme} from '../../../hooks/useTheme';
import {BorderRadius} from "../../../styles/borderRadiuses";


const GlowWrap = ({children, enabled = true, glowColor = 'rgba(255,255,255,0.9)'}) => {
    const p = useSharedValue(0);

    React.useEffect(() => {
        if (!enabled) return;

        p.value = withRepeat(
            withTiming(1, {duration: 1500, easing: Easing.inOut(Easing.quad)}),
            -1,
            true,
        );

        return () => {
            // на всякий случай сброс
            p.value = 0;
        };
    }, [enabled, p]);

    const auraStyle = useAnimatedStyle(() => {
        // 0..1..0 (ping-pong), делаем мягкий пульс
        const scale = 1 + 0.03 * p.value;
        const opacity = 0.18 + 0.22 * p.value;

        return {
            transform: [{scale}],
            opacity,
        };
    });

    if (!enabled) {
        return children;
    }

    return (
        <View style={{alignSelf: 'stretch'}}>
            {/* Аура под кнопкой */}
            <Animated.View
                pointerEvents="none"
                style={[
                    {
                        position: 'absolute',
                        left: -8,
                        right: -8,
                        top: -8,
                        bottom: -8,
                        borderRadius: BorderRadius.medium,
                        // Лёгкое свечение через фон + тени
                        backgroundColor: glowColor,

                        // iOS shadow
                        shadowColor: glowColor,
                        shadowOpacity: 0.35,
                        shadowRadius: 18,
                        shadowOffset: {width: 0, height: 10},

                        // Android
                        elevation: 12,
                    },
                    auraStyle,
                ]}
            />
            {children}
        </View>
    );
};

const SubscriptionsModalComponent = (props) => {
    const {isOpen, onChangeVisible} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [t] = useTranslator('components.subscriptionsModal');
    const [, , subscriptions, setCurrentSubscription] = useSubscriptions();
    const {theme} = useTheme();
    const styles = useStyles(theme);
    const options = useMemo(
        () => (subscriptions ? subscriptions.availablePackages : []),
        [subscriptions],
    );

    const handleOptionClick = (item) => {
        setIsLoading(true);

        Purchases.purchasePackage(item)
            .then(({customerInfo}) => {
                setIsLoading(false);
                setIsSuccess(true);
                setCurrentSubscription(customerInfo);
            })
            .catch((e) => {
                console.log('Purchase Subscription error: ', e);
                setIsError(true);
                setIsLoading(false);
            });
    };

    const handleRestoreClick = () => {
        setIsLoading(true);

        Purchases.restorePurchases()
            .then((customerInfo) => {
                setIsLoading(false);
                setIsSuccess(true);
                setCurrentSubscription(customerInfo);
            })
            .catch(() => {
                setIsError(true);
                setIsLoading(false);
            });
    };

    const handleVisibilityChange = (value) => {
        if (isLoading) {
            return;
        }

        onChangeVisible(value);
        if (!value) {
            setIsError(false);
        }
    };

    return (
        <NativeModal
            isVisible={isOpen}
            style={styles.modal}
            backdropColor={theme.colors.backgroundColor}
            backdropOpacity={0.8}
            animationInTiming={400}
            animationOutTiming={400}
            onBackdropPress={() => handleVisibilityChange(false)}
            onBackButtonPress={() => handleVisibilityChange(false)}
            useNativeDriver
        >
            <ImageBackground
                source={PaywallBackground}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <SafeAreaView style={styles.safeArea}>
                        <ScrollView
                            bounces={false}
                            contentContainerStyle={styles.scrollContent}
                        >
                            <View style={styles.content}>
                                <Text style={styles.title}>{t('benefits')}</Text>
                                <View style={styles.benefits}>
                                    <Text
                                        style={[styles.benefitsText, styles.firstBenefitText]}>{t('benefitsOne')}</Text>
                                    <Text style={styles.benefitsText}>{t('benefitsTwo')}</Text>
                                    <Text style={styles.benefitsText}>{t('benefitsThree')}</Text>
                                    {/*<Text style={styles.benefitsText}>{t('benefitsFour')}</Text>*/}
                                </View>
                                {isLoading && (
                                    <View style={styles.logoWrapper}>
                                        <AnimatedLogo size="medium" color="black" isInfinity/>
                                    </View>
                                )}
                                {!isLoading && (
                                    <View style={styles.buttons}>
                                        {!isError && !isSuccess && (
                                            <>
                                                {options.map((item, idx) => {
                                                    // Пример: подсветить первую кнопку или "годовую" (настройте под себя)
                                                    const isHighlighted =
                                                        String(item?.product?.identifier || '').toLowerCase().includes('annual') ||
                                                        String(item?.product?.identifier || '').toLowerCase().includes('year');
                                                    const showDiscountChip = idx === 1;

                                                    return (
                                                        <GlowWrap
                                                            key={item.product.identifier}
                                                            enabled={isHighlighted}
                                                            glowColor={theme.colors?.primary}
                                                        >
                                                            <View style={styles.offerWrapper}>
                                                                {showDiscountChip && (
                                                                    <View style={styles.discountChip}>
                                                                        <Text style={styles.discountChipText}>-30%</Text>
                                                                    </View>
                                                                )}
                                                                <Button
                                                                    type="fulled"
                                                                    size="xl"
                                                                    style={styles.button}
                                                                    textStyle={styles.buttonText}
                                                                    onPress={() => {
                                                                        Haptics.impactAsync('light');
                                                                        handleOptionClick(item);
                                                                    }}
                                                                >
                                                                    {item.product.priceString} / {item.product.identifier}
                                                                </Button>
                                                            </View>
                                                        </GlowWrap>
                                                    );
                                                })}

                                                <Button
                                                    type="fulled"
                                                    size="xl"
                                                    style={styles.button}
                                                    textStyle={styles.buttonText}
                                                    onPress={handleRestoreClick}
                                                >
                                                    {t('restore')}
                                                </Button>
                                            </>
                                        )}
                                        {isError && <Text style={styles.error}>{t('error')}</Text>}
                                        {isSuccess && <Text style={styles.success}>{t('success')}</Text>}
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                        <View style={styles.closeButtonWrapper}>
                            <Text style={styles.subtitle}>{t('subtitle')}</Text>
                            <Button
                                type="outlined"
                                size="m"
                                style={styles.closeButton}
                                textStyle={styles.closeButtonText}
                                onPress={() => handleVisibilityChange(false)}
                            >
                                <Icon name="close-outline" size={Spaces.large} color={theme.colors.white}/>
                            </Button>
                        </View>
                    </SafeAreaView>
                </View>
            </ImageBackground>
        </NativeModal>
    );
};

export const SubscriptionsModal = SubscriptionsModalComponent;
