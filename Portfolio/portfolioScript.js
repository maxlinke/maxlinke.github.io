'use strict';

const portfolioPages = {};
const portfolioPageIdsSorted = [];
function getPortfolioPageIdsSorted () {
    if(portfolioPageIdsSorted.length < Object.keys(portfolioPages).length){
        for(const pageId in portfolioPages){
            portfolioPageIdsSorted.push(pageId);
        }
        portfolioPageIdsSorted.sort((idA, idB) => {
            const pageA = portfolioPages[idA];
            const pageB = portfolioPages[idB];
            if(pageA.year != pageB.year) return pageB.year - pageA.year;
            return pageB.numberInYear - pageA.numberInYear;
        });
    }
    return portfolioPageIdsSorted;
}

let bodyDiv;

document.addEventListener("DOMContentLoaded", () => {
    console.log("dom content loaded");
    bodyDiv = document.getElementById("portfolioBody");
    regeneratePage();
});

window.addEventListener("hashchange", () => {
    console.log("hash change");
    regeneratePage();
});

function regeneratePage () {
    console.log(`regenerate page at ${new Date().toISOString()}`);
    console.log(portfolioPages);
    clearPage();
    if(window.location.href.includes("#")){
        addLink("< Back to list", "", addParagraph(""));    // TODO can i just change the href of the window without an actual reload? i.e. just remove the stuff behind the # and invoke a hashchange?
        const pageId  = window.location.href.substring(window.location.href.indexOf("#") + 1);
        if(portfolioPages[pageId] == undefined){
            addHeader("Error");
            addParagraph(`Unknown page \"${pageId}\"`);
        }else{
            var page = portfolioPages[pageId];
            addHeader(page.title);
            page.createElements();
        }
    }else{
        const pageIdsSortedByYear = getPortfolioPageIdsSorted();
        for(let pageId of pageIdsSortedByYear){
            const page = portfolioPages[pageId];
            // TODO make this a nice pretty list
            // with pictures and stuff
            // use title, minidescrption, year (for sorting) and backgroundimagename (with subfoldername)
            var newLink = document.createElement("a");
            bodyDiv.appendChild(newLink);
            newLink.href = `#${pageId}`;
            newLink.innerText = `${page.title} (${page.year})`;
        }
    }
}

function clearPage () {
    bodyDiv.replaceChildren();
}

function addHeader (headerText, parent) {
    parent = parent || bodyDiv;
    const newHeader = document.createElement("h3");
    parent.appendChild(newHeader);
    newHeader.innerText = headerText;
    return newHeader;
}

function addParagraph (paragraphText, parent) {
    parent = parent || bodyDiv;
    const newParagraph = document.createElement("p");
    parent.appendChild(newParagraph);
    newParagraph.innerText = paragraphText;
    return newParagraph;
}

// TODO add support for side-images? they probably wouldn't go into the paragraph though. check wikipedia. 
function addCompoundParagraph (paragraphPieces, parent) {
    const newParagraph = addParagraph("", parent);
    for(const piece of paragraphPieces){
        if(piece.href != undefined){
            addLink(piece.text, piece.href, newParagraph);
        }else{
            newParagraph.innerHTML += piece.text;
        }
    }
    return newParagraph;
}

// a lot of good info on links
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks
function addLink (linkText, linkTarget, parent) {
    parent = parent || bodyDiv;
    const newLink = document.createElement("a");
    parent.appendChild(newLink);
    newLink.innerText = linkText;
    newLink.href = linkTarget;
    return newLink;
}