import { StyleSheet } from 'react-native';
import { containerMarginTop, getPercentWidth, getTextStyles } from '../../styles/common.styles';
import { Spaces } from '../../styles/spaces';
import { Colors } from '../../styles/colors';
import { BorderRadius } from '../../styles/borderRadiuses';
import {getDevice} from "../../utilities/getCurrentDevice";

const styles = StyleSheet.create({
  container: {
    marginLeft: Spaces.xsmall,
    marginRight: Spaces.xsmall,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: Spaces.large,
  },
  actionButtonsContainer: {
    // height: Spaces.xxlarge,
    paddingTop: Spaces.medium,
    paddingBottom: Spaces.medium,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.primary,
    width: getPercentWidth(100),
    gap: Spaces.small,
  },
  actionButton: {
    marginLeft: Spaces.small,
    // width: Spaces.xxxlarge,
    borderRadius: BorderRadius.small,
    borderColor: Colors.black
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // width: getPercentWidth(100)
  },
  search: {
    width: getPercentWidth(80),
    textAlign: 'center'
  },
  emptyList: getTextStyles({
    fontSize: 16,
    marginTop: Spaces.medium,
    color: Colors.primary
  }),
  firstSubscriptionButton: {
    paddingTop: Spaces.large,
  },
  actionText: getTextStyles({
    fontSize: 14,
    marginLeft: Spaces.small,
    color: Colors.primary,
  }),
  resetButton: {
    marginTop: Spaces.small,
    borderColor: Colors.white,
  },
  resetButtonText: getTextStyles({
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: Colors.white,
  }),

  // Filters
  filters: {
    backgroundColor: Colors.backgroundColor,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  filtersTitle: getTextStyles({
    fontSize: 20,
    padding: Spaces.small,
    textAlign: 'center',
  }),
  filtersContainer: {
    // flexDirection: 'row',
    gap: Spaces.medium,
    justifyContent: 'center',
  },
  filtersSection: {
    flexDirection: 'row',
    gap: Spaces.small,
    margin: Spaces.small,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  filtersClose: {
    marginTop: Spaces.medium,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersBar: {
    backgroundColor: Colors.primary,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spaces.small,
    marginTop: Spaces.small,
    marginBottom: Spaces.small,
    justifyContent: 'center',
  },
  filterCloseButton: {
    height: Spaces.xxlarge,
  },

  searchByIngredientsContainer: {
    marginTop: Spaces.medium,
    padding: Spaces.small,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.small,
    alignItems: 'center'
  },
  searchByIngredients: getTextStyles({
    fontSize: 14,
    color: Colors.white,
  }),

  //list
  list: {
    gap: Spaces.xlarge,
    alignItems: 'center',
    width: getDevice() === 'iPhone' ? '100%' : getPercentWidth(99),
  },
  subscriptions: {
    paddingBottom: Spaces.xlarge,
  },
  subscriptionsInto: getTextStyles({
    textAlign: 'center',
    fontSize: 16,
    marginBottom: Spaces.small,
  }),
  // Voice assistant button
  assistant: {
    height: Spaces.xxlarge + Spaces.small,
    width: getPercentWidth(100),
    borderRadius: 0,
  },
  assistantButtonText: getTextStyles({
    marginLeft: Spaces.small,
    fontSize: 24,
    color: Colors.white,
    justifyContent: 'center',
  }),
});

export default styles;
