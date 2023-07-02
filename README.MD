# Itch.io rating helper

## How to install
Use Tampermonkey extension (or similar) in your browser. Import script `itch-io-rating-helper.js`.
The easiest way to import is copy-paste the source text.

## Safety
The script is limited to a specific URL
```
    // @match        https://itch.io/jam/*

## Features on the specific submission's page:
Show average rating of the multiple rating criteria.
It is displayed in the left-top corner in a dark floating panel with vertical text.

## Features on the page showing the list of submissions:
Show your rating for each game. Each game you rated will be ✓ Rated [rating].
You first have to visit each game's page for its rating to be stored in cache.
Sort games by rating. The button is located in the top-left corner in a vertical floating panel.