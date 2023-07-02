//@ts-check
// ==UserScript==
// @name         itch.io game jam rating helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://itch.io/jam/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('ITCH IO GAME JAM RATING HELPER');
    const KEY = 'ITCH_IO_GAME_JAM_RATING_HELPER';

    function readGameTitle() {
        const header = document.querySelector('.jam_game_header h1');
        return header?.firstChild?.textContent;
    }

    const readRatingElementId = KEY + '-info-panel';
    /** @type {MutationObserver} */
    let mutationObserver;
    function readRating() {
        const criteriaRater = document.querySelector('div.jam_jam_game_voter_widget.criteria_rater');
        if (!criteriaRater) {
            return;
        }
        let infoPanel = document.getElementById(readRatingElementId);
        if (!infoPanel) {
            infoPanel = document.createElement('div');
            infoPanel.id = readRatingElementId;
            infoPanel.setAttribute('style', [
                'position: fixed',
                'z-index: 100',
                'top: 50px',
                'left: 0px',
                'width: 20px',
                'background-color:rgba(0, 0, 0, 0.66)',
                'writing-mode: vertical-rl',
                'color: white',
                'padding: 4px',
                'padding-left: 6px',
                'font-size: 20px',
            ].join(';'));
            document.body.appendChild(infoPanel);
        }
        const criteriaRows = criteriaRater.querySelectorAll('tr.criteria_row');
        /** @type {number[]} */
        const ratings = [];
        for (const row of criteriaRows) {
            const buttons = row.querySelectorAll('.star_picker button');
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].getAttribute('aria-checked') == 'true') {
                    ratings.push(i + 1);
                    break;
                }
            }
        }
        let totalRating = 0;
        for (const rating of ratings)
            totalRating += rating;
        const averageRating = ratings.length ? (totalRating / ratings.length) : 0
        infoPanel.innerText = 'RATING: ' + averageRating.toFixed(1);

        if (!mutationObserver) {
            mutationObserver = new MutationObserver(change => {
                readRating();
            });
            mutationObserver.observe(criteriaRater, { childList: true, subtree: true });
        }
        const gameTitle = readGameTitle();
        if (gameTitle)
            if (localStorage.getItem(KEY + ' ' + gameTitle) == null)
                localStorage.setItem(KEY + ' ' + gameTitle, '' + averageRating);
    }

    if (document.readyState == 'complete')
        readRating();
    else
        addEventListener('load', readRating);
})();