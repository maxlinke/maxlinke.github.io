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
        for(let i=0; i<3; i++){     // temp
            for(let pageId of pageIdsSortedByYear){
                const page = portfolioPages[pageId];
                const newLink = addLink("", `#${pageId}`, bodyDiv);
                newLink.className = "portfolioPageLink";
                const newBoxDiv = addDiv(newLink);
                newBoxDiv.className = "portfolioPageLinkBox portfolioPageLinkBoxOverlayTint";
                newBoxDiv.style = `background-image: url(${page.subfolderName}/${page.backgroundImageName})`;
                const newYearDiv = addDiv(newBoxDiv);
                newYearDiv.className = "portfolioPageLinkYear";
                newYearDiv.innerText = page.year;
                const newTitleDiv = addDiv(newBoxDiv);
                newTitleDiv.className = "portfolioPageLinkTitle";
                newTitleDiv.innerText = page.title;
                const newMiniDescDiv = addDiv(newBoxDiv);
                newMiniDescDiv.className = "portfolioPageLinkMiniDescription";
                newMiniDescDiv.innerText = page.miniDescription;
            }
        }
    }
}

function clearPage () {
    bodyDiv.replaceChildren();
}

function addDiv (parent) {
    parent = parent || bodyDiv;
    const newDiv = document.createElement("div");
    parent.appendChild(newDiv);
    return newDiv;
}

function addHeader (headerText, parent, style) {
    parent = parent || bodyDiv;
    const newHeader = document.createElement("h3");
    parent.appendChild(newHeader);
    newHeader.innerText = headerText;
    if(style){
        addStyleToInnerHtml(newHeader, style);
    }
    return newHeader;
}

function addParagraph (paragraphText, parent, style) {
    parent = parent || bodyDiv;
    const newParagraph = document.createElement("p");
    parent.appendChild(newParagraph);
    newParagraph.innerText = paragraphText;
    if(style){
        addStyleToInnerHtml(newParagraph, style);
    }
    return newParagraph;
}

// TODO add support for side-images? they probably wouldn't go into the paragraph though. check wikipedia. 
// TODO but at least style would be nice to have. probably per piece. 
function addCompoundParagraph (paragraphPieces, parent) {
    parent = parent || bodyDiv;
    const tempDiv = document.createElement("div");
    parent.appendChild(tempDiv);
    for(const piece of paragraphPieces){
        let newElement;
        if(piece.href){
            newElement = addLink(piece.text, piece.href, tempDiv, piece.style);
        }else{
            newElement = addParagraph(piece.text, tempDiv, piece.style);
        }
    }
    const outputParagraph = addParagraph("", parent);
    let innerHtmlPieces = [];
    for(const childNode of tempDiv.childNodes){
        switch(childNode.nodeName){
            case "P":
                innerHtmlPieces.push(childNode.innerHTML);
                break;
            case "A":
                innerHtmlPieces.push(childNode.outerHTML);
                break;
            default:
                throw new Error(`Unsupported node name \"${childNode.nodeName}\"`);
        }
    }
    outputParagraph.innerHTML = innerHtmlPieces.join("");
    parent.removeChild(tempDiv);
    return outputParagraph;
}

function addStyleToInnerHtml (target, styleInput) {
    let styles = [];
    if(typeof(styleInput) == "string"){
        styles.push(styleInput);
    }else if(Array.isArray(styleInput)){
        for(const style of styleInput){
            if(typeof(style) == "string"){
                styles.push(style);
            }else{
                throw new Error(`Unsupported style object ${style}`);
            }
        }
    }else{
        throw new Error(`Unsupported style object ${styleInput}`);
    }
    for(const style of styles){
        target.innerHTML = `<${style}>${target.innerHTML}</${style}>`;
    }
}

// a lot of good info on links
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks
function addLink (linkText, linkTarget, parent, style) {
    parent = parent || bodyDiv;
    const newLink = document.createElement("a");
    parent.appendChild(newLink);
    newLink.innerText = linkText;
    newLink.href = linkTarget;
    if(style){
        addStyleToInnerHtml(newLink, style);
    }
    return newLink;
}