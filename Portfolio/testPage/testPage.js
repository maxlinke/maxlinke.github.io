'use strict';

portfolioPages.testPage = {
    title: "Test Page",
    miniDescription: "This is just a test",
    year: 2024,
    numberInYear: 0,
    subfolderName: "testPage",      // everything is in this folder
    backgroundImageName: "asdf",    // so stuff like this doesn't need a folder prefix
    createElements: function () {
        addParagraph("Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        addCompoundParagraph([
            { text: "Wurden zunächst die wenigen Zeilen von " },
            { text: "„Lorem ipsum“", href: "" },
            { text: " im Blindtext fortlaufend wiederholt, so dient heute der " },
            { text: "Cicero-Text", href: "" },
            { text: " als Basis vieler Lorem-ipsum-Generatoren, die darauf aufbauend längere Abschnitte erzeugen. Die Wortfolge ist so weithin üblich, dass viele Desktop-Publishing-Programme einen Menüpunkt für Blindtext haben, der eine Sequenz erzeugt, die mit „Lorem ipsum“ beginnt. Außerdem wird heute die Wortfolge „Lorem ipsum“ in der elektronischen Druckaufbereitung erkannt und eine Warnmeldung ausgegeben, damit eine Publikation mit verbliebenem Blindtext nicht versehentlich in den Druck geht." }
        ]);
    }
};