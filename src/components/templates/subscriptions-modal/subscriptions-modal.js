import React, { useEffect, useMemo, useState } from 'react';
import NativeModal from 'react-native-modal';
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { Button } from '../../atomic/button/button.component';

import styles from './subscriptions-modal.styles';
import { Colors } from '../../../styles/colors';
import { useTranslator } from '../../../hooks/useTranslator';
import { AnimatedLogo } from '../../atomic/logo/animated-logo.component';
import Purchases from 'react-native-purchases';
import { useSubscriptions } from '../../../contexts/subscriptions.context';
import { Spaces } from '../../../styles/spaces';
import * as Haptics from 'expo-haptics';
import PaywallBackground from '../../../../assets/paywall-background.jpg';

const SubscriptionsModalComponent = (props) => {
  const { isOpen, onChangeVisible } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  const [t] = useTranslator('components.subscriptionsModal');
  const [, , subscriptions, setCurrentSubscription] = useSubscriptions();
  const options = useMemo(
    () => (subscriptions ? subscriptions.availablePackages : []),
    [subscriptions],
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const updateTimer = () => {
      const now = new Date();
      const nextReset = new Date();
      nextReset.setHours(24, 0, 0, 0);
      const diff = Math.max(nextReset - now, 0);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      setTimeLeft(formatted);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [isOpen]);

  const handleOptionClick = (item) => {
    setIsLoading(true);

    Purchases.purchasePackage(item)
      .then(({ customerInfo }) => {
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
      backdropColor={Colors.backdropColor}
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
                <Text style={[styles.benefitsText, styles.firstBenefitText]}>{t('benefitsOne')}</Text>
                <Text style={styles.benefitsText}>{t('benefitsTwo')}</Text>
                <Text style={styles.benefitsText}>{t('benefitsThree')}</Text>
                {/*<Text style={styles.benefitsText}>{t('benefitsFour')}</Text>*/}
              </View>
              {timeLeft ? (
                <Text style={styles.timerText}>
                  {t('nextFreeRecipesIn', { time: timeLeft })}
                </Text>
              ) : null}
              {isLoading && (
                <View style={styles.logoWrapper}>
                  <AnimatedLogo size="medium" color="white" isInfinity />
                </View>
              )}
              {!isLoading && (
                <View style={styles.buttons}>
                  {!isError && !isSuccess && (
                    <>
                      {options.map((item) => (
                        <Button
                          key={item.product.identifier}
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
                      ))}
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
            <Button
              type="outlined"
              size="m"
              style={styles.closeButton}
              textStyle={styles.closeButtonText}
              onPress={() => handleVisibilityChange(false)}
            >
              <Icon name="close-outline" size={Spaces.large} color={Colors.white} />
            </Button>
          </View>
        </SafeAreaView>
        </View>
      </ImageBackground>
    </NativeModal>
  );
};

export const SubscriptionsModal = SubscriptionsModalComponent;
