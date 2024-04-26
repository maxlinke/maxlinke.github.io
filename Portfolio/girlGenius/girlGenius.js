'use strict';

registerPage("girlGenius", {
    title: "Girl Genius: Adventures In Castle Heterodyne",
    miniDescription: "The first commercial game I developed from start to finish",
    year: 2023,
    numberInYear: 3,
    subfolderName: "girlGenius",
    backgroundImageName: "../underConstruction.png",
    createElements: () => {
        addYouTubeEmbed({
            src: "https://www.youtube.com/embed/cSRddBKfEiQ",
            width: 560,
            height: 315
        });
        addFormattedParagraph("TODO");
        // a few ideas for sections
        // - gg cutscene system
        // - generic dialogue system
        // - laser bot ai
        // - gg topdown to third person conversion
    }
});