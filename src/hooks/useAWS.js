export const useAWS = () => {
  const aws = 'https://d15bc7buvgt326.cloudfront.net';

  return {
    getCookingStepURL: (recipeId, step) => `${aws}/${recipeId}/${step}.mov`,
  }
}