'use strict';

const defaultDocumentTitle = document.title;

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
    document.title = defaultDocumentTitle;
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
            document.title = `${document.title} - ${currentPage.title}`;
        }
        addSeparatorLine();
        addBackToListLink();
        if(wasShowingList || (prevPage != null && currentPage != prevPage)){
            scrollToTop();
        }
    }else{
        currentPage = null;
        showingMainList = true;
        const listIntro = addParagraph("An overview of some of the things I've worked on:", bodyDiv);
        listIntro.id = "portfolioListLabel";
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

function addSeparatorLine (parent) {
    parent = parent || bodyDiv;
    const separator = document.createElement("hr");
    separator.className = "portfolioPageSeparator";
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
    const readNumberOfCharacters = function (checkCharacter, checkIndex) {
        let output = 0;
        while(checkIndex < rawText.length && rawText.charAt(checkIndex) == checkCharacter){
            output++;
            checkIndex++;
        }
        return output;
    };
    const getNewPiece = function () {
        return {
            text: "",
            href: "",
            leadingAsteriskCount: 0,
            style: [...activeStyles]
        };
    }
    const toggleStyle = function (style) {
        if(currentPiece.text){
            pieces.push(currentPiece);
        }
        if(Array.isArray(style)){
            let missingStyles = [];
            for(const singleStyle of style){
                if(!activeStyles.includes(singleStyle)){
                    missingStyles.push(singleStyle);
                }
            }
            if(missingStyles.length < 1){
                for(const singleStyle of style){
                    activeStyles.splice(activeStyles.indexOf(singleStyle), 1);
                }
            }else{
                activeStyles.push(...missingStyles);
            }
        }else{
            const removeIndex = activeStyles.indexOf(style);
            if(removeIndex >= 0){
                activeStyles.splice(removeIndex, 1);
            }else{
                activeStyles.push(style);
            }
        }
        currentPiece = getNewPiece();
        return true;
    }
    const styleMarkdown = {
        "~": {
            2: "del"
        },
        "_": {
            2: "u"
        },
        "*": {
            1: "i",
            2: "b",
            3: ["b", "i"]
        },
        "|": {
            2: "code"
        }
    };
    const activeStyles = [];
    const pieces = [];
    let currentPiece = getNewPiece();
    for(let i = 0; i < rawText.length; i++){
        const currentChar = rawText.charAt(i);
        if(currentChar == "\\"){    // escape
            i++;
            if(i < rawText.length){
                currentPiece.text += rawText.charAt(i);
            }
            continue;
        }
        if(styleMarkdown[currentChar] != undefined){    // try to toggle style
            const occurrences = readNumberOfCharacters(currentChar, i);
            const style = styleMarkdown[currentChar][occurrences];
            if(style){      // the tag was found
                toggleStyle(style);
            }else{          // the tag is invalid
                currentPiece.text += currentChar.repeat(occurrences);
            }
            i += occurrences - 1;
            continue;
        }
        if(currentChar == "["){     // weblinks
            if(currentPiece.text){
                pieces.push(currentPiece);
                currentPiece = getNewPiece();
            }
            const rawRemainder = rawText.substring(i);                  // makes for much easier to read code, even if it's potentially inefficient
            const findNotEscapedCharacterIndex = function (input, characterToFind) {
                for(let j=0; j<input.length; j++){
                    if(input.charAt(j) == "\\"){
                        j++;
                    }else if(input.charAt(j) == characterToFind){
                        return j;
                    }
                }
                return -1;
            };
            const unescapeEverything = function (input) {
                let output = "";
                for(let j=0; j<input.length; j++){
                    if(input.charAt(j) == "\\"){    // this should work. if we have an escaped backslash, i.e. two backslashes, the first one is skipped and the second one gets appended
                        j++;
                    }
                    output += input.charAt(j);
                }
                return output;
            };
            const textEndBracketPos = findNotEscapedCharacterIndex(rawRemainder, "]");        // if this is -1, there's no text
            const textLength = textEndBracketPos - 1;                                         // if this is <1, there is no text so it's invalid
            const linkStartParenthesisPos = findNotEscapedCharacterIndex(rawRemainder, "(");  // if this is -1, there's no link
            const validLinkStartPos = linkStartParenthesisPos == textEndBracketPos + 1;
            const linkEndParenthesisPos = findNotEscapedCharacterIndex(rawRemainder, ")");    // if this is -1, there's no link. 
            const linkLength = validLinkStartPos 
                               ? linkEndParenthesisPos - linkStartParenthesisPos - 1
                               : 0; 
            if(textLength < 1 || linkLength < 1){
                currentPiece.text += rawText.charAt(i);
                continue;    
            }else{
                currentPiece.text = unescapeEverything(rawRemainder.substring(1, textEndBracketPos));
                currentPiece.href = unescapeEverything(rawRemainder.substring(linkStartParenthesisPos + 1, linkEndParenthesisPos));
                i += linkEndParenthesisPos;
            }
            continue;
        }
        // we got past all the custom shenanigans
        if(currentPiece.href){
            pieces.push(currentPiece);
            currentPiece = getNewPiece();
        }
        currentPiece.text += rawText.charAt(i);
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
    parent = parent || bodyDiv;
    const containerDiv = document.createElement("div");
    containerDiv.className = "portfolioCodeContainer";
    parent.appendChild(containerDiv);
    const newParagraph = document.createElement("p");
    newParagraph.className = "portfolioCodeParagraph";
    containerDiv.appendChild(newParagraph);
    newParagraph.innerText = text;
    return newParagraph;
}

function addMedia (elementInfo, subText, parent) {
    parent = parent || bodyDiv;
    const overallParent = addDiv(parent);
    overallParent.className = "portfolioMediaContainer";
    const output = [];
    const outputOnlyFirstElement = !Array.isArray(elementInfo);
    if(!Array.isArray(elementInfo)){
        elementInfo = [elementInfo];
    }
    for(let i=0; i<elementInfo.length; i++){
        const newMediaElement = document.createElement(elementInfo[i].type);
        if(!currentPage || elementInfo[i].srcPath.startsWith("http://") || elementInfo[i].srcPath.startsWith("https://")){
            newMediaElement.src = elementInfo[i].srcPath;
        }else{
            newMediaElement.src = `./${currentPage.subfolderName}/${elementInfo[i].srcPath}`;
        }
        overallParent.appendChild(newMediaElement);
        newMediaElement.className = elementInfo[i].dontLimitMaxHeight ? "portfolioMediaNoMaxHeight" : "portfolioMedia";
        switch(elementInfo[i].type){
            case "img":
                if(elementInfo[i].fullSizePath){
                    // this is not as "correct" as doing with with an "a", but at least i can make it work without completely breaking the layout
                    // because for some reason, putting the image into an a just breaks things
                    const onClickOpenPath = currentPage ? `./${currentPage.subfolderName}/${elementInfo[i].fullSizePath}` : elementInfo[i].fullSizePath;
                    newMediaElement.style = "cursor: zoom-in";
                    newMediaElement.onclick = () => {
                        window.open(onClickOpenPath);
                    };
                }
                break;
            case "video":
                newMediaElement.controls = true;
                break;
        }
        if(elementInfo[i].altText){
            newMediaElement.alt = elementInfo[i].altText;       // alt text is useful if someone can't see the media...
            // newMediaElement.title = elementInfo[i].altText;  // ... but the popup is just annoying when it's there
        }
        output.push(newMediaElement);
    }
    if(subText){
        // const subTextParent = addDiv(parent);
        // subTextParent.className = "horizontallyCenterChild";
        const newSubText = addFormattedParagraph(subText, parent);
        newSubText.className = "portfolioMediaSubtext";
    }
    return outputOnlyFirstElement ? output[0] : output;
}

function addImage (imgInfo, subText, parent) {
    return addMedia(
        {
            type: "img", 
            srcPath: imgInfo.thumbnailName ? imgInfo.thumbnailName : imgInfo.fileName, 
            fullSizePath: imgInfo.thumbnailName ? imgInfo.fileName : undefined,
            altText: imgInfo.altText,
            dontLimitMaxHeight: imgInfo.dontLimitMaxHeight
        },
        subText, 
        parent
    );
}

function addImages (imgInfo, subText, parent) {
    return addMedia(
        imgInfo.map((ii) => { 
            return {
                type: "img", 
                srcPath: ii.thumbnailName ? ii.thumbnailName : ii.fileName,
                fullSizePath: ii.thumbnailName ? ii.fileName : undefined,
                altText: ii.altText,
                dontLimitMaxHeight: ii.dontLimitMaxHeight
            }
        }), 
        subText, 
        parent
    );
}


function addVideo (vidInfo, subText, parent) {
    return addMedia(
        {
            type: "video", 
            srcPath: vidInfo.fileName, 
            altText: vidInfo.altText,
            dontLimitMaxHeight: vidInfo.dontLimitMaxHeight
        }, 
        subText, 
        parent
    );
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

function addProjectInfo (info, parent) {
    const getFormattedParagraphHTML = function (rawText) {
        const temparagraph = addFormattedParagraph(rawText, parent);
        const htmlCache = temparagraph.innerHTML;
        parent.removeChild(temparagraph);
        return htmlCache;
    }
    parent = parent || bodyDiv;
    addSeparatorLine(parent);
    addSubHeader("Project info", parent);
    const newTable = document.createElement("table");
    parent.appendChild(newTable);
    newTable.className = "portfolioProjectInfoTable";
    for(const infoCategory in info){
        const newRow = document.createElement("tr");
        newTable.appendChild(newRow);
        const label = document.createElement("th");
        newRow.appendChild(label);
        label.className = "portfolioProjectInfoTableLabel";
        label.innerText = infoCategory;
        const content = document.createElement("td");
        newRow.appendChild(content);
        content.className = "portfolioProjectInfoTableContent";
        let categoryValue = info[infoCategory];
        if(Array.isArray(categoryValue) && categoryValue.length == 1){
            categoryValue = categoryValue[0];
        }
        if(Array.isArray(categoryValue)){
            const newList = document.createElement("ul");
            content.appendChild(newList);
            newList.className = "portfolioProjectInfoTableContentList";
            for(const item of categoryValue){
                const newItem = document.createElement("li");
                newList.appendChild(newItem);
                newItem.className = "portfolioProjectInfoTableContentListItem";
                newItem.innerHTML = getFormattedParagraphHTML(`${item}`);
            }
        }else{
            content.innerHTML = getFormattedParagraphHTML(`${categoryValue}`);
        }
    }
    addSeparatorLine(parent);
}

function addYouTubeEmbed (info, parent) {
    parent = parent || bodyDiv;
    const centerParent = addDiv(parent);
    centerParent.className = "horizontallyCenterChild";
    const newIFrame = document.createElement("iframe");
    newIFrame.className = "portfolioYouTubeEmbed";
    centerParent.appendChild(newIFrame);
    newIFrame.src = info.src;
    newIFrame.width = info.width;
    newIFrame.height = info.height;
    newIFrame.altText = "YouTube Video";
    newIFrame.allowFullscreen = true;
    return newIFrame;
}