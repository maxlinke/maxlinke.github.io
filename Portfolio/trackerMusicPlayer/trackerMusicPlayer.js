'use strict';

registerPage("trackerMusicPlayer", {
    title: "Tracker Music Player",
    miniDescription: "A plugin that properly plays .mod and .xm music files in Unity",
    year: 2023,
    numberInYear: 1,
    subfolderName: "trackerMusicPlayer",
    backgroundImageName: "tempBackground.png",
    createElements: () => {
        addFormattedParagraph(
            "I've been making music on and off for a while. For a time I used [FamiTracker](http://famitracker.com/index.php) to make chiptunes, which is how I got into trackers. Trackers are a by now somewhat antiquated way of making music on computers, playing songs \"live\" from a small number of waveform samples, rather than containing the whole song as a waveform. Tracker music was how most PC-games did their soundtracks until CDs and ever increasing hard drive capacities made waveform audio viable. The amazing soundtracks of Unreal Tournament (the one from '99) and the original Deus Ex are 100% tracker music and even the excellent [Ion Fury](https://store.steampowered.com/app/562860/Ion_Fury/) has a proper tracked OST. I wanted to bring *proper* support for tracker files to Unity for a while and finally got the opportunity to do so as a part of my degree. "
        );

        addProjectInfo({
            "Project Type": "Unity Plugin",
            "Team Size": "Solo",
            "Project Duration": 9999,
            "Key Aspects": [
                "Ayy",
                "Lmao",
                "Ayy Lmao"
            ],
            "Something else": "Something else",
        });

        addSubHeader("Sub Header");
        addFormattedParagraph("TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO ");
        // TODO
    }
});