'use strict';

registerPage("mesmer", {
    title: "Mesmer",
    miniDescription: "The first commercial game I worked on by interning at a game studio",
    year: 2019,
    numberInYear: 100,
    subfolderName: "mesmer",
    backgroundImageName: "../underConstruction.png",
    createElements: () => {
        addYouTubeEmbed({
            src: "https://www.youtube.com/embed/fettovMEzVs",
            width: "516",
            height: "312"
        });
        addFormattedParagraph("TODO");
    }
});