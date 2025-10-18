import { StyleSheet } from 'react-native';
import { getPercentWidth, getTextStyles } from '../../styles/common.styles';
import { Spaces } from '../../styles/spaces';
import { Colors } from '../../styles/colors';
import { BorderRadius } from '../../styles/borderRadiuses';
import { getDevice } from '../../utilities/getCurrentDevice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Assistant
  assistantButton: {
    width: '100%',
    borderRadius: 0,
    // height: '100%',
    height: Spaces.xxlarge + Spaces.small,
    marginBottom: Spaces.small,
  },
  assistantButtonText: getTextStyles({
    fontSize: 24,
    color: Colors.white,
    alignItems: 'center',
  }),

  // Search
  content: {
    position: 'relative',
    marginRight: Spaces.medium,
    marginLeft: Spaces.small,
    flex: 1,
    paddingBottom: Spaces.medium,
    marginTop: Spaces.small,
  },
  search: {
    marginLeft: Spaces.small,
  },

  // List of ingredients
  itemsContainer:  {
    marginTop: Spaces.small,
    paddingBottom: Spaces.xxxlarge + Spaces.medium,
  },
  itemContainer: {
    borderWidth: Spaces.xxsmall,
    borderColor: Colors.red,
    borderRadius: BorderRadius.small,
    height: Spaces.mxxlarge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: getTextStyles({
    fontSize: 16,
  }),
  selectedText: getTextStyles({
    color: Colors.white,
  }),
  selected: {
    borderColor: Colors.black,
    backgroundColor: Colors.black,
  },
  // confirm: {
  //   alignSelf: 'center',
  //   marginTop: Spaces.medium,
  //   marginBottom: Spaces.medium,
  // },
  confirmButtonBackground: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    transform: [{translateX: -25}],
    width: getPercentWidth(60),
    height: 80,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderRadius: BorderRadius.medium,
    // padding: Spaces.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    width: getPercentWidth(getDevice() === 'iPad' ? 40 : 50),
    shadowColor: Colors.primary,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {height: 1}
  },
  confirmText: getTextStyles({color: Colors.white}),
  addedModalContainer: {
    marginTop: Spaces.medium,
    marginBottom: Spaces.medium,
    alignItems: 'center',
  },
  addedProductsTitle: getTextStyles({
    marginTop: Spaces.large,
    fontSize: 18,
  }),
  addedProducts: {
    marginTop: Spaces.medium,
  },
  addedModalButton: {
    marginTop: Spaces.large,
  },
  addedModalButtonText: getTextStyles({
    fontSize: 18,
  }),

  // Not found
  notFound: getTextStyles({
    fontSize: 18,
    color: Colors.primary
  }),
});

export default styles;
