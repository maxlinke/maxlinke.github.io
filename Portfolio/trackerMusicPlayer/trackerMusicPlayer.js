'use strict';

registerPage("trackerMusicPlayer", {
    title: "Tracker Music Player",
    miniDescription: "A plugin that properly plays .mod and .xm music files in Unity",
    year: 2023,
    numberInYear: 1,
    subfolderName: "trackerMusicPlayer",
    backgroundImageName: undefined,
    createElements: () => {
        // addCompoundParagraph([
        //     { text: "Repo-Link: " },
        //     { text: "TODO", href: "https://github.com/maxlinke" }
        // ]);
        addCompoundParagraph([
            { text: "In today's world of ample hard drive space and CPU clock frequencies measured in billions of cycles per second, playing music is a thing computers can do without breaking a figurative sweat. However, unsurprisingly, that wasn't always the case. In the brief time before CDs were widespread, and even for some time after, trackers made their mark. However, this is my portfolio and not a history lesson. There's a good overview on "},
            { text: "Wikipedia", href: "https://en.wikipedia.org/wiki/Music_tracker" },
            { text: ", as well as YouTube-Videos such as the ones by " },
            { text: "Ahoy", href: "https://www.youtube.com/watch?v=roBkg-iPrbw" },
            { text: " and " },
            { text: "ida deerz", href: "https://www.youtube.com/watch?v=aiILSgNt23E" },
            { text: " for those who want to know more about the subject in general. " }
        ]);
        
        addSubHeader("Why would I do this?");
        addCompoundParagraph([
            { text: "Depending on how well you know Unity, you might already know that you can just drag tracker files into Unity and it'll convert them into AudioClips, that you can then play as you would any other imported audio file. There is even a special page dedicated to it " },
            { text: "in the docs", href: "https://docs.unity3d.com/2023.2/Documentation/Manual/TrackerModules.html" },
            { text: " and this support has been there for a long time already. " }
        ]);
        addCompoundParagraph([
            { text: "Well, ...", style: "i" }
        ]);
        addCompoundParagraph([
            { text: "The problem lies with Unity needing to convert them to AudioClips, so that the regular AudioSource-Component can play them, which loses a lot of the things that elevate tracker music files over regular wave-based ones. Yes, tracker files are smaller, but in today's world, that's hardly a selling point. The main benefit is that the music is \"played live\" rather than simply being read from one long waveform. While generating the waveform that is ultimately sent to the speakers or headphones is a tad more involved this allows several things that are either hard to do do or flatout impossible with normal audio files. " }
        ]);
        addUnorderedList([
            { text: "The first thing is selective volume control. Since the music is generated live from individual samples included in the file, the volume can be adjusted per sample, enabling such things as a dynamic soundtrack that only becomes audible when the player's health is low for example. While the same can be achieved with proper synchronization of AudioClips, here it's a side-effect of the playback itself. " },
            { text: "Secondly, the speed can be altered without shifting the pitch. The frequency of the sounds the samples produce is independent of the timing with which they are triggered. Granted, I only know this from the old Super Mario games and not much else, but this wouldn't be as easy with normal audio files. " },
            { text: "Thirdly, since the music is played live, the song can jump from one position to another without the clicking that would arise from trying the same with a simple waveform. It can even be easily synced to the beat to be completely unnoticeable. " }
        ]);
        // add more text

        addCompoundParagraph([
            { text: "Also I really like tracker music and I needed two long-ish programming projects for the \"Independent Coursework\" portion of my Master. That's the " },
            { text: "real", style: "i" },
            { text: " answer to the question "},
            { text: "\"Why would I do this?\"", style: "i" },
            { text: ". " }
        ]);

        addSubHeader("So how did I actually do it?");
        addParagraph("TODO");
        // TODO broad strokes 

        addSubHeader("The result");
        addParagraph("TODO");
        // TODO some videos
    }
});