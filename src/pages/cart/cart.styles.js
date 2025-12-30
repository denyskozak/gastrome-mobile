import { StyleSheet } from 'react-native';
import { getPercentWidth, getTextStyles } from '../../styles/common.styles';
import { Spaces } from '../../styles/spaces';
import { BorderRadius } from '../../styles/borderRadiuses';

export const useStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },

  // Add ingredient actions
  addFormContainer: {
    paddingTop: Spaces.small,
    paddingBottom: Spaces.medium,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
    width: getPercentWidth(100),
  },
  addForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: getPercentWidth(100)
  },
  titleInput: {
    width: getPercentWidth(60),
  },
  addButton: {
    marginLeft: Spaces.small,
    borderRadius: BorderRadius.small,
    backgroundColor: theme.colors.black,
  },

  // List of ingredients
  itemsContainer: {
    marginTop: Spaces.large,
    marginLeft: Spaces.small,
    marginRight: Spaces.small,
    marginBottom: Spaces.xxxlarge,
  },
  itemWrapper: {
    width: '100%',
  },
  item: {
    borderWidth: Spaces.xxsmall,
    borderRadius: BorderRadius.small,
    minHeight: Spaces.mxxlarge,
    width: '100%',
  },
  selectedItem: {
    backgroundColor: theme.colors.red,
    borderColor: theme.colors.red,
  },
  subText: getTextStyles({
    fontSize: 14,
    color: theme.colors.primary,
  }),

  // Action buttons
  actionButtons: {
    flexDirection: 'row-reverse',
    padding: Spaces.medium,
    height: Spaces.xxxlarge,
    // backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.primary,
  },
  actionButton: {
    marginLeft: Spaces.small,
    width: Spaces.xxxlarge,
    borderRadius: BorderRadius.small,
  },

  // Finish button
  finishButton: {
    width: '100%',
    borderRadius: 0,
    height: Spaces.xxlarge + Spaces.small,
  },
  finishButtonText: getTextStyles({
    fontSize: 24,
    color: theme.colors.white,
    alignItems: 'center',
  }),

  // Not found
  notFound: getTextStyles({
    fontSize: 18,
    textAlign: 'center',
  }),
  notFoundButtonText: getTextStyles({
    fontSize: 18,
    textAlign: 'center',
  }),
  notFoundButton: {
    marginTop: Spaces.medium,
    alignSelf: 'center',
    borderColor: theme.colors.primary
  }
});
