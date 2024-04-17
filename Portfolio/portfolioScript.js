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
let currentPage;
let showingMainList;

function registerPage (id, page) {
    portfolioPages[id] = page;
}

document.addEventListener("DOMContentLoaded", () => {
    bodyDiv = document.getElementById("portfolioBody");
    regeneratePage();
});

window.addEventListener("hashchange", () => {
    regeneratePage();
});

function regeneratePage () {
    clearPage();
    const prevPage = currentPage;
    const wasShowingList = showingMainList;
    if(window.location.href.includes("#")){
        showingMainList = false;
        addBackToListLink();
        const pageId  = window.location.href.substring(window.location.href.indexOf("#") + 1);
        if(portfolioPages[pageId] == undefined){
            currentPage = null;
            addHeader("Error");
            addParagraph(`Unknown page \"${pageId}\"`);
        }else{
            currentPage = portfolioPages[pageId];
            addHeader(currentPage.title);
            if(currentPage.createElements){
                currentPage.createElements();
            }
        }
        addPageFooterSeparatorLine();
        addBackToListLink();
        if(wasShowingList || (prevPage != null && currentPage != prevPage)){
            scrollToTop();
        }
    }else{
        currentPage = null;
        showingMainList = true;
        const pageIdsSortedByYear = getPortfolioPageIdsSorted();
        for(let pageId of pageIdsSortedByYear){
            const page = portfolioPages[pageId];
            if(page.hidden){
                continue;
            }
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
        if(!wasShowingList){
            scrollToTop();
        }
    }
}

function clearPage () {
    bodyDiv.replaceChildren();
}

function scrollToTop () {
    window.scrollTo(0, 0);
}

function addBackToListLink () {
    addLink("< Back to list", "", addParagraph(""));    // TODO can i just change the href of the window without an actual reload? i.e. just remove the stuff behind the # and invoke a hashchange?
}

function addPageFooterSeparatorLine (parent) {
    parent = parent || bodyDiv;
    const separator = document.createElement("hr");
    separator.id = "portfolioPageFooterSeparator";
    parent.appendChild(separator);
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

function addSubHeader (headerText, parent, style) {
    parent = parent || bodyDiv;
    const newHeader = document.createElement("h4");
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
    newParagraph.className = "portfolioTextElement";
    newParagraph.innerText = paragraphText;
    if(style){
        addStyleToInnerHtml(newParagraph, style);
    }
    return newParagraph;
}

function mergePiecesToInnerHTML (pieces, parent) {
    parent = parent || bodyDiv;
    const tempDiv = document.createElement("div");
    parent.appendChild(tempDiv);
    for(const piece of pieces){
        let newElement;
        if(piece.href){
            newElement = addLink(piece.text, piece.href, tempDiv, piece.style);
        }else{
            newElement = addParagraph(piece.text, tempDiv, piece.style);
            newElement.className = undefined;
        }
    }
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
    const output = innerHtmlPieces.join("");
    parent.removeChild(tempDiv);
    return output;
}

function addCompoundParagraph (paragraphPieces, parent) {
    parent = parent || bodyDiv;
    const outputParagraph = addParagraph("", parent);
    outputParagraph.innerHTML = mergePiecesToInnerHTML(paragraphPieces);
    return outputParagraph;
}

function addFormattedParagraph (rawText, parent) {
    const readNumberOfAsterisks = function (checkIndex) {
        let output = 0;
        while(checkIndex < rawText.length && rawText.charAt(checkIndex) == "*"){
            output++;
            checkIndex++;
        }
        return output;
    };
    const getNewPiece = function () {
        return {
            text: "",
            href: "",
            leadingAsteriskCount: 0
        };
    }
    const pieces = [];
    let currentPiece = getNewPiece();
    for(let i = 0; i < rawText.length; i++){
        if(rawText.charAt(i) == "\\"){      // escapes the next character, appending it to the current paragraph's text directly
            i++;
            if(i < rawText.length){
                currentPiece.text += rawText.charAt(i);
            }
            continue;
        }
        switch(rawText.charAt(i)){
            case "*":
                const asteriskCount = readNumberOfAsterisks(i);
                i += asteriskCount - 1;
                if(currentPiece.text){
                    if(currentPiece.leadingAsteriskCount < 1){  // finish the unformatted text, start a new block
                        pieces.push(currentPiece);
                        currentPiece = getNewPiece();
                        currentPiece.leadingAsteriskCount = asteriskCount;
                    }else{
                        if(asteriskCount == currentPiece.leadingAsteriskCount){
                            switch(asteriskCount){
                                case 1: 
                                    currentPiece.style = "i";
                                    break;
                                case 2: 
                                    currentPiece.style = "b";
                                    break;
                                case 3: 
                                    currentPiece.style = ["b", "i"];
                                    break;
                            }
                        }
                        if(!currentPiece.style){
                            currentPiece.text = `${"*".repeat(currentPiece.leadingAsteriskCount)}${currentPiece.text}${"*".repeat(asteriskCount)}`;
                        }
                        pieces.push(currentPiece);
                        currentPiece = getNewPiece();
                    }
                }else{  // the piece has no text, so it must be new
                    currentPiece.leadingAsteriskCount = asteriskCount;
                }
                break;
            case "[":
                if(currentPiece.text){
                    pieces.push(currentPiece);
                    currentPiece = getNewPiece();
                }
                const rawRemainder = rawText.substring(i);                  // makes for much easier to read code, even if it's potentially inefficient
                const textEndBracketPos = rawRemainder.indexOf("]");        // if this is -1, there's no text
                const textLength = textEndBracketPos - 1;                   // if this is <1, there is no text so it's invalid
                const linkStartParenthesisPos = rawRemainder.indexOf("(");  // if this is -1, there's no link
                const validLinkStartPos = linkStartParenthesisPos == textEndBracketPos + 1;
                const linkEndParenthesisPos = rawRemainder.indexOf(")");    // if this is -1, there's no link. 
                const linkLength = validLinkStartPos 
                                   ? linkEndParenthesisPos - linkStartParenthesisPos - 1
                                   : 0; 
                if(textLength < 1 || linkLength < 1){
                    currentPiece.text += rawText.charAt(i);
                    continue;    
                }else{
                    currentPiece.text = rawRemainder.substring(1, textEndBracketPos);
                    currentPiece.href = rawRemainder.substring(linkStartParenthesisPos + 1, linkEndParenthesisPos);
                    i += linkEndParenthesisPos;
                }
                break;
            default:
                if(currentPiece.href){
                    pieces.push(currentPiece);
                    currentPiece = getNewPiece();
                }
                currentPiece.text += rawText.charAt(i);
        }
    }
    if(currentPiece.text){
        pieces.push(currentPiece);
    }
    return addCompoundParagraph(pieces, parent);
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

function addCodeBlock (text, parent) {
    // TODO it's a paragraph with a different kind of style
    alert("TODO");
}

function addMedia (elementType, fileNameOrPath, altText, subText, parent) {
    parent = parent || bodyDiv;
    const overallParent = addDiv(parent);
    overallParent.className = "portfolioMediaContainer";
    const mediaParent = addDiv(overallParent);
    mediaParent.className = "horizontallyCenterChild";
    const newMediaElement = document.createElement(elementType);
    mediaParent.appendChild(newMediaElement);
    newMediaElement.className = "portfolioMedia";
    if(currentPage){
        newMediaElement.src = `./${currentPage.subfolderName}/${fileNameOrPath}`;
    }else{
        newMediaElement.src = fileNameOrPath;
    }
    switch(elementType){
        case "img":
            newMediaElement.alt = altText;
            break;
        case "video":
            newMediaElement.controls = true;
            break;
    }
    newMediaElement.title = altText;
    if(subText){
        const newSubText = addParagraph(subText, overallParent);
        newSubText.className = "portfolioMediaSubtext";
    }
    return newMediaElement;
}

function addImage (fileNameOrPath, altText, subText, parent) {
    return addMedia("img", fileNameOrPath, altText, subText, parent);
}

function addVideo (fileNameOrPath, altText, subText, parent) {
    return addMedia("video", fileNameOrPath, altText, subText, parent);
}

function addList (tag, items, parent) {
    parent = parent || bodyDiv;
    const newList = document.createElement(tag);
    parent.appendChild(newList);
    for(const item of items){
        const newItem = document.createElement("li");
        newList.appendChild(newItem);
        newList.className = "portfolioTextElement";
        if(Array.isArray(item)){
            newItem.innerHTML = mergePiecesToInnerHTML(item);
        }else{
            if(typeof(item) == "string"){
                const tempParagraph = addFormattedParagraph(item, parent);
                const tempHTML = tempParagraph.innerHTML;
                parent.removeChild(tempParagraph);
                newItem.innerHTML = tempHTML;
            }else{
                newItem.innerHTML = mergePiecesToInnerHTML([item]);
            }
        }
    }
    return newList;
}

function addOrderedList (items, parent) {
    return addList("ol", items, parent);
}

function addUnorderedList (items, parent) {
    return addList("ul", items, parent);
}