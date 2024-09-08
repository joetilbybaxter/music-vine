## Instructions ##

1. Run 'npm ci' in the root directory
2. Run 'npm run start' to deploy the web application to localhost
3. Select either SFX or Tracks then type in the search bar for which song you want

## Improvements given more time ##

1. The UI mainly on the mobile could do with changes in it's layout. I would like to have gotten the search component to drop down from the top after a tapping of a hamburger. 

2. I would like to have got some tests in place, both visual and data based. I would have liked to check that the data coming back from the API was as expected and the correct values where there, I would have done this with some integration tests using a test data file. I also would have liked to check that visually my result card components where staying at the same size as of each other to ensure uniform.

3. I would have liked to have seperate the displaying of the search result cards and the search component to allow for a new collection (sfx/track) could be chosen without it changing what is displayed in the result cards.

4. Utilising typescript further: I wanted to create more types rather than just the result/api types as this would have added more certainty to the results of my code.