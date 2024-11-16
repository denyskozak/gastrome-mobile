import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import PropTypes from 'prop-types';
import { Modal } from '../../atomic/modal/modal.component';
import { Button } from '../../atomic/button/button.component';

import styles from './subscriptions-modal.styles';
import { Colors } from '../../../styles/colors';
import { useTranslator } from '../../../hooks/useTranslator';
import { AnimatedLogo } from '../../atomic/logo/animated-logo.component';
import Purchases from 'react-native-purchases';
import { useSubscriptions } from '../../../contexts/subscriptions.context';
import { Spaces } from '../../../styles/spaces';

const SubscriptionsModalComponent = (props) => {
  const {isOpen, onChangeVisible} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [t] = useTranslator('components.subscriptionsModal');
  const [, , subscriptions, setCurrentSubscription] = useSubscriptions();
  const options = subscriptions ? subscriptions.availablePackages : [];

  const handleOptionClick = (item) => {
    setIsLoading(true);

    Purchases.purchasePackage(item)
      .then(({customerInfo}) => {
        setIsLoading(false);
        setIsSuccess(true);
        setCurrentSubscription(customerInfo);
      })
      .catch(
        (e) => {
          console.log('Purchase Subscription error: ', e);
          setIsError(true);
          setIsLoading(false);
        }
      )
  };

  const handleRestoreClick = () => {
    setIsLoading(true);

    Purchases.restorePurchases()
      .then((customerInfo) => {
        setIsLoading(false);
        setIsSuccess(true);
        setCurrentSubscription(customerInfo);
      })
      .catch(
        () => {
          setIsError(true);
          setIsLoading(false);
        }
      )
  };

  return (
    <Modal isVisible={isOpen} onChangeVisible={(value) => {
        if (isLoading) return;
      onChangeVisible(value);
      setIsError(false)
    }}>
      <Text style={styles.title}>{t('benefits')}</Text>
      <View style={styles.benefits}>
        <Text style={styles.benefitsText}>{t('benefitsOne')}</Text>
        <Text style={styles.benefitsText}>{t('benefitsTwo')}</Text>
        <Text style={styles.benefitsText}>{t('benefitsThree')}</Text>
      </View>
      {isLoading && (<AnimatedLogo size="medium" isInfinity/>)}
      {!isLoading && (<View style={styles.buttons}>
        {!isError && !isSuccess && (
          <>
            {options.map((item) => (
              <Button
                key={item.product.identifier}
                type="outlined"
                size="xl"
                style={styles.button}
                textStyle={styles.buttonText}
                onPress={() => {
                  handleOptionClick(item)
                }}
              >
                {item.product.priceString} / {item.product.identifier}
              </Button>
            ))}
            <Button
              type="outlined"
              size="xl"
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={handleRestoreClick}
            >
              {t('restore')}
            </Button>
          </>
        )}
        {isError && (
          <Text style={styles.error}>{t('error')}</Text>
        )}
        {isSuccess && (
          <Text style={styles.success}>{t('success')}</Text>
        )}
        <Button
          type="outlined"
          size="m"
          style={styles.closeButton}
          onPress={() => {
            onChangeVisible(false);
            setIsError(false)
          }}
        >
          <Icon name="checkmark-outline" size={Spaces.large} color={Colors.black}/>
        </Button>
      </View>)}
    </Modal>
  );
}

SubscriptionsModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onChangeVisible: PropTypes.func.isRequired,
}

export const SubscriptionsModal = SubscriptionsModalComponent;