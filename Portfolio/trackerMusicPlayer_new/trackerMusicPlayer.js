'use strict';

registerPage("trackerMusicPlayer", {
    title: "Tracker Music Player",
    miniDescription: "A plugin that properly plays .mod and .xm music files in Unity",
    year: 2023,
    numberInYear: 1,
    subfolderName: "trackerMusicPlayer_new",
    backgroundImageName: "tempBackground.png",
    // backgroundImageName: "screenshot_playerscript_inspector.png",
    createElements: () => {
        addVideo("Trackermusicplayeroverview-1.webm", "", "Showcasing the plugin with [Surfing on a Sine Wave by Fearofdark](https://www.youtube.com/watch?v=00vYncpl0pk)");
        addFormattedParagraph(
            "I've been making music on and off for a while. For a time I used [FamiTracker](http://famitracker.com/index.php) to make chiptunes, which is how I got into trackers. Trackers are a by now somewhat antiquated way of making music on computers, playing songs \"live\" from a small number of waveform samples, rather than containing the whole song as a waveform. Tracker music was how most PC-games did their soundtracks until CDs and ever increasing hard drive capacities made waveform audio viable. The amazing soundtracks of Unreal Tournament (the one from '99) and the original Deus Ex are 100% tracker music and even the excellent [Ion Fury](https://store.steampowered.com/app/562860/Ion_Fury/) has a proper tracked OST. I wanted to bring *proper* support for tracker files to Unity for a while and finally got the opportunity to do so as a part of my degree. "
        );

        addProjectInfo({
            "Project Type": "Unity Plugin",
            "Team Size": "Solo",
            "Project Duration": "April 2022 - April 2023",
            "Project Purpose": "University (Independent Coursework)",
            "Key Aspects": [
                "Generative audio",
                "Working with legacy documentation",
                "Software Engineering"
            ],
            "Tech Used": [
                "Unity 2020.3.17f1",
                "Unity \"Test Framework\" Package Version 1.1.33",
                "VS Code",
            ]
        });

        addSubHeader("Building a .mod-player");
        addFormattedParagraph("While Unity natively supports [a variety of tracker file formats](https://docs.unity3d.com/2023.2/Documentation/Manual/TrackerModules.html), it transforms them into AudioClip-assets. This means that it is not possible to for example programmatically mute or unmute specific channels for a dynamic soundtrack, change patterns based on what's happening in the game or even alter the playback speed without shifting the pitch like with regular audio clips. I wanted to specifically leverage those features of tracker music, neccessitating the writing of my own plugin. Module-files (.mod for short) were the first widespread format for tracker music and as such it was my starting point. Finding [a specification of the .mod-format](https://www.aes.id.au/modformat.html) proved surprisingly easy. Using it for guidance, I wrote a reader for converting the binary data of the files into objects in memory for an easier time writing the playback-routine. ");
        addImage("screenshot_debug_patterns.png", "Test file in OpenMPT (L) and in Unity (R)", "Comparing a pattern in OpenMPT (L) to the decoded values printed in the Debug Log in Unity (R)");
        addFormattedParagraph("While the structure of the file format was well documented, playback was barely even mentioned. I had to rely on comparisons with [OpenMPT](https://openmpt.org/) to get the timing and frequencies right. With that out of the way however, the rest was somewhat straightforward. I implemented the effects as noted in the documentation, gathering missing info from once again using actual trackers like OpenMPT or [MilkyTracker](https://milkytracker.org/) as a reference and comparing waveforms and spectrograms in [Audacity](https://www.audacityteam.org/). ");
        addImage("screenshot_comparing_spectrograms.png", "Comparing spectrograms in Audacity", "Comparing my own audio output (top) to that of MilkyTracker (bottom). Note that MilkyTracker uses linear interpolation during playback, while my output has the characteristic overtones from nearest-neighbor interpolation");
        addFormattedParagraph("Since dragging the tracker files into Unity as assets \"destroys\" them via conversion to audio clips, I decided to use the StreamingAssets-folder for storing the raw files. As the Unity workflow revolves around assets, I wrote a ScriptableObject-class \"FileReference\" as a wrapper. For maximum ease-of-use, they can be created directly from a song file via a special context menu entry. The script handling the playback has a field for a FileReference-Object in the inspector, just like AudioSources have and AudioClip-field, but during runtime both file references and files read directly from disk can be used. When playing a song, the inspector shows information about the song and additional controls, such as the tempo, pattern queue and channels which can be enabled and disabled individually with the song continuing to play. ");

        addSubHeader("Exporting songs to .wav");
        addImage("screenshot_exporter_wizard.png", "Wav-Export EditorWindow", "Screenshot of the Exporter \"Wizard\" EditorWindow");
        addFormattedParagraph("The playback routine is written completely independent of the Unity-API, the player component implementing OnAudioFilterRead simply constructs an AudioBuffer-object and passes that to the playback routine to fill, then copying those values back to the float-array given by Unity. Not only does this enable porting of the plugin to different engines or applications, it also made it trivial to save the entire song as waveform-audio. All that was needed was a small Editor Window and a look at the structure of the RIFF-WAVE format to add the functionality of exporting songs to .wav from inside of Unity. While this may not be useful to users, it was extremely useful for debugging as it meant I wouldn't have to rely on recording Stereomix for comparisons in Audacity. ");

        addSubHeader("Extending the plugin to support .xm-files");
        addFormattedParagraph("TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO ");
    }
});