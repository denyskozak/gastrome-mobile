import { StyleSheet } from 'react-native';
import { containerMarginTop, getPercentWidth, getTextStyles } from '../../styles/common.styles';
import { Spaces } from '../../styles/spaces';
import { BorderRadius } from '../../styles/borderRadiuses';
import {getDevice} from "../../utilities/getCurrentDevice";

export const useStyles = (theme) => StyleSheet.create({
  container: {
    // marginLeft: Spaces.xsmall,
    // marginRight: Spaces.xsmall,
    flex: 1,
  },
  actionButtonsContainer: {
    // height: Spaces.xxlarge,
    paddingTop: Spaces.medium,
    paddingBottom: Spaces.medium,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
    width: getPercentWidth(100),
    gap: Spaces.small,
  },
  actionButton: {
    marginLeft: Spaces.small,
    // width: Spaces.xxxlarge,
    borderRadius: BorderRadius.small,
    borderColor: theme.colors.white
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
    color: theme.colors.primary
  }),
  firstSubscriptionButton: {
    margin: Spaces.medium,
    // width: 320,
  },
  actionText: getTextStyles({
    fontSize: 14,
    marginLeft: Spaces.small,
    color: theme.colors.primary,
  }),
  resetButton: {
    marginTop: Spaces.small,
    borderColor: theme.colors.white,
  },
  resetButtonText: getTextStyles({
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: theme.colors.white,
  }),

  // Filters
  filters: {
    backgroundColor: theme.colors.backgroundColor,
    borderColor: theme.colors.primary,
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
    backgroundColor: theme.colors.primary,
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
    backgroundColor: theme.colors.primary,
    borderRadius: BorderRadius.small,
    alignItems: 'center'
  },
  searchByIngredients: getTextStyles({
    fontSize: 14,
    color: theme.colors.white,
  }),

  //list
  // list: {
    // gap: Spaces.xlarge,
  // },
  separator: {
    height: Spaces.large
  },
  subscriptions: {
    padding: Spaces.medium,
  },
  // Voice assistant button
  assistant: {
    height: Spaces.xxlarge + Spaces.small,
    width: getPercentWidth(100),
    borderRadius: 0,
  },
  assistantButtonText: getTextStyles({
    marginLeft: Spaces.small,
    fontSize: 24,
    color: theme.colors.white,
    justifyContent: 'center',
  }),
});
