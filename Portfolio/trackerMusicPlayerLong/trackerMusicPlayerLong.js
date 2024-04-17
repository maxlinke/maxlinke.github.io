'use strict';

registerPage("trackerMusicPlayerLong", {
    // hidden: true,
    title: "Tracker Music Player (Long)",
    miniDescription: "A plugin that properly plays .mod and .xm music files in Unity",
    year: 2023,
    numberInYear: 1,
    subfolderName: "trackerMusicPlayerLong",
    backgroundImageName: "tempBackground.png",
    createElements: () => {
        // addCompoundParagraph([
        //     { text: "Repo-Link: " },
        //     { text: "TODO", href: "https://github.com/maxlinke" }
        // ]);
        addFormattedParagraph(
            "TODO Make a Unity Web Player demo that takes links to modarchive (or anything else one can download tracker files), \"downloads\" the file and the plays it with full OnGUI-controls for adjusting everything. Also put in some recommended tunes via convenient buttons on startup or something!"
        );

        addSubHeader("Introduction");
        addFormattedParagraph(
            "In today's world of ample hard drive space and CPU clock frequencies measured in billions of cycles per second, playing music is a thing computers can do without breaking a figurative sweat. However, unsurprisingly, that wasn't always the case. In the brief time before CDs were widespread, and even for some time after, trackers made their mark. However, this is my portfolio and not a history lesson. There's a good overview on [Wikipedia](https://en.wikipedia.org/wiki/Music_tracker), as well as YouTube-Videos such as the ones by [Ahoy](https://www.youtube.com/watch?v=roBkg-iPrbw) and [ida deerz](https://www.youtube.com/watch?v=aiILSgNt23E) for those who want to know more about the subject in general."
        );
        
        addSubHeader("Why would I do this?");
        addFormattedParagraph(
            "Depending on how well you know Unity, you might already know that you can just drag tracker files into Unity and it'll convert them into AudioClips, that you can then play as you would any other imported audio file. There is even a special page dedicated to it [in the docs](https://docs.unity3d.com/2023.2/Documentation/Manual/TrackerModules.html) and this support has been there for a long time already."
        );
        addFormattedParagraph(
            "*Well, ...*"
        );
        addFormattedParagraph(
            "The problem lies with Unity needing to convert them to AudioClips, so that the regular AudioSource-Component can play them, which loses a lot of the things that elevate tracker music files over regular wave-based ones. Yes, tracker files are smaller, but in today's world, that's hardly a selling point. The main benefit is that the music is \"played live\" rather than simply being read from one long waveform. While generating the waveform that is ultimately sent to the speakers or headphones is a tad more involved this allows several things that are either hard to do do or flatout impossible with normal audio files. "
        );
        addUnorderedList([
            "The first thing is selective volume control. Since the music is generated live from individual samples included in the file, the volume can be adjusted per sample, enabling such things as a dynamic soundtrack that only becomes audible when the player's health is low for example. While the same can be achieved with proper synchronization of AudioClips, here it's a side-effect of the playback itself. ",
            "Also, the speed can be altered without shifting the pitch. The frequency of the sounds the samples produce is independent of the timing with which they are triggered. Granted, I only know this from the old Super Mario games and not much else, but this wouldn't be as easy with normal audio files. ",
            "Finally, since the music is played live, the song can jump from one position to another without the clicking that would arise from trying the same with a simple waveform. It can even be easily synced to the beat to be completely unnoticeable. "
        ]);
        addFormattedParagraph(
            "Also I really like tracker music and I needed two long-ish programming projects for the \"Independent Coursework\" portion of my degree. That's the *real* answer to the question *\"Why would I do this?\"*. The rest of this page will go over the broad strokes, for more detail you can check the two report papers I wrote. Be warned though, they are in German."
        );
        addUnorderedList([
            `[Erstellung eines Plugins zum Abspielen von ProTracker-Module-Dateien in der Unity Engine](${currentPage.subfolderName}/bericht_ic1.pdf)`,
            `[Erweiterung des Tracker-Plugins um das XM-Format](${currentPage.subfolderName}/bericht_ic2.pdf)`
        ]);

        addSubHeader("So how did I actually do it?");
        addFormattedParagraph(
            "Figuring out how to do generative audio was the first problem that needed solving. There are multple ways of going about this in Unity, but implementing the method *OnAudioFilterRead* in a MonoBehaviour-Script is by far the best solution I found. Putting such a script on a GameObject with an AudioSource- or AudioListener-Component will then call that method with a float-array that can be read from and written to. Some experiments regarding channel count, sample rate and more followed, but before long I had a very nice abstract base class handling audio generation, which the more complex tracker music could build upon. "
        );
        addFormattedParagraph(
            "Writing routines to read the sometimes *ancient* tracker music files and play them back live was the second big problem. I figured that .mod, being the oldest (kinda) format, would be the easiest to start with. It only deals with samples, not instruments, and has a rather small number of effects to implement. Searching for a format specification very quickly yielded [a very nice document](https://www.aes.id.au/modformat.html) detailing not only the file structure, but also some very important notes on playback. My tracker music player is very much a modern piece of code, using objects and abstraction, things that weren't really a thing back when The Ultimate Soundtracker was originally created. As such, I created a bunch of data structures to hold the things I'd decode bytewise from the files, verifying the correctness by comparing my own read results to values I'd see in OpenMPT or MilkyTracker. "
        );
        addFormattedParagraph(
            "With the reading and decoding of files being taken care of, writing the playback routine was all that was left. TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO "
        );
        // the samplerate of the output buffer -> samples/tick and samples/sample-sample
        // my bresenham modification (rather than floating point shenanigans)
        // poor documentation of effects -> audacity comparisons
        addFormattedParagraph(
            "Having a functioning plugin that exclusively .mod files wasn't what I had really set out to do however. I wanted to make a proper *Tracker* Music Player, I'd have to add support for more formats. Back in the day, there was a plethora or tracker programs, each somewhat unique and with their own formats that are still around today. FastTracker II's \"Extended Module\" - XM for short - was the format I chose as the first addition to my plugin. TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO "
        );
        // the xm-link
        // the refactor
        // not much else honestly, it was fairly straightforward iirc.
        addFormattedParagraph(
            "Or course this isn't a detailed \"How to write your own Tracker Music Player Plugin for Unity\" Tutorial. I may at some point release the plugin on the Asset Store, or just make the repository public. Until that happens, you, dear reader, still have enough time to write your own plugin and beat me to it. It's really not that hard if you go about it in a methodical manner and with some knowledge about the subject. "
        );

        addSubHeader("The result");
        addFormattedParagraph(
            "After two semesters spent writing the plugin, I had a plugin playing back both .mod- and .xm-files live in Unity. TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO "
        );
        addFormattedParagraph(
            "Also, this is the first portfolio page I've written, besides my super secret [test page](#testPage). It might be a tad long, I don't know what's good here. Anyways, hope you enjoyed the read and maybe learned a thing or two. :)"
        );
        // TODO some videos

        // TODO a unity web player thing that i can paste modarchive-links to, which "downloads" the file and plays it with full ongui controls for everything. that'd be neat. if i have the time
    }
});