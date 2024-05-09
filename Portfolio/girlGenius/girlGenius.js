'use strict';

registerPage("girlGenius", {
    title: "Girl Genius: Adventures In Castle Heterodyne",
    miniDescription: "The first commercial game I developed from start to finish",
    year: 2023,
    numberInYear: 3,
    subfolderName: "girlGenius",
    backgroundImageName: "girlGenius_banner.jpg",
    createElements: () => {
        addYouTubeEmbed({
            src: "https://www.youtube.com/embed/cSRddBKfEiQ",
            width: 560,
            height: 315
        });
        addFormattedParagraph("Girl Genius: Adventures In Castle Heterodyne (in this article \"GG\" for short) is a third person action adventure somewhat akin to the older 3D Zelda games. The player slips into the shoes of heroine Agatha Heterodyne fighting robots, dodging traps and solving puzzles in the titular castle. ");
        addFormattedParagraph("I worked on this game for its full duration. Writing about everything I did during that time, even in passing, would result in a ~~very~~ ~~extremely~~ ~~insanely~~ absolutely humongously long piece of text. So this, just like the page for [the first game I ever worked on](#mesmer), will be merely an overview. ");

        addProjectInfo({
            "Project Type": "Video Game",
            "Team Size": "Around 6",
            "Project Duration": "March 2020 - September 2023",
            "Project Purpose": "Professional Game Development",
            "Key Aspects": [
                "Kickstarter campaign",
                "Total conversion",
                "Every aspect of Unity and then some"
            ],
            "Tech Used": [
                "Unity (2019.3.10f1 - 2021.3.12f1)",
                "Blender",
                "VS Code"
            ],
            "Links": [
                "[Girl Genius: Adventures In Castle Heterodyne \\(on Steam\\)](https://store.steampowered.com/app/1789370/Girl_Genius_Adventures_In_Castle_Heterodyne/)",
                "[Girl Genius: Adventures In Castle Heterodyne \\(on GOG\\)](https://www.gog.com/en/game/girl_genius_adventures_in_castle_heterodyne)",
            ]
        });

        addSubHeader("The Kickstarter campaign");
        addImage(
            { fileName: "kickstarter_gif.gif", altText: "Castle Heterodyne" },
            "I made nearly every model you see in this shot"
        );
        addFormattedParagraph("The initial plan for the game was a reskin of World to the West, the game Rain worked on before doing [Mesmer](#mesmer), so a top-down Zelda-like, but with some mechanics swapped out and of course all new assets. To get the funding needed for the development, or at least part of it, we did a [kickstarter campaign](https://www.kickstarter.com/projects/ggadventures/girl-genius-adventures-in-castle-heterodyne/description), for which I created a lot of models (including the one for the castle itself), wrote a bunch of tools to help me build the city and together with one other programmer, tried our best to put together a prototype we could use for a video working with the WttW (World to the West) codebase and assets. ");
        addFormattedParagraph("Just for the shot of the city, I created my own spline-library, made it possible to use those splines to place objects in a scene (to put the houses along the \"streets\") and move objects along them (for the people walking on said \"streets\"), made my own high-performance boids for ONE flock of birds flying past the camera, wrote a shader for procedural electric arcs and another whole shader suite for everything else AND of course modeled and textured most of the houses and landmarks. ");
        addYouTubeEmbed({
            src: "https://www.youtube.com/embed/AZmMu_iDPq4",
            width: 560,
            height: 315
        });
        addFormattedParagraph("The prototype game was a cobbled together mess that looked good in the trailer and not much else, but with the kickstarter campaign actually meeting its goal, proper development would soon begin. ");

        addSubHeader("The new dialogue system");
        addFormattedParagraph("Both me and my fellow programmers would often lament having to work on top of the old WttW codebase, rather than starting fresh and only copying over useful things. In the end, I'd estimate that maybe 5% of the game's code is even related to WttW with the absolute majority of things having been created new. One such thing is the dialogue system. WttW used world space canvases to have speech bubbles eminating from the talking characters' 3d models, GG got a more traditional overlay dialogue UI with one text box and big sprites. To deliver the data for the UI to display at runtime, extending the old WttW classes would have been far too much effort, so an entirely new set of classes and editor scripts was devised, along with a custom system for localization, as Unity's Localization package was pretty bad back then. ");
        addImage(
            { fileName: "gg_dialogue_editor.png", thumbnailName: "gg_dialogue_editor_small.png", altText: "A screenshot of the dialogue editor", dontLimitMaxHeight: true },
            "My piece of test dialogue in the dialogue editor"
        );
        addFormattedParagraph("Since the comic uses a lot of **bold** and *italic* and ***bold-italic*** text for emphasis, we had to replicate this. TextMeshPro does support rich text, but it requires typing html-like tags, which isn't all that convenient for writers. I implemented the asterisk-system Discord uses, where ||\\*this\\*|| turns into ||*this*||, ||\\*\\*that\\*\\*|| into ||**that**|| and so on. It also supports a handful of other things such as pauses for the text crawl. ");
        
        addSubHeader("Addressing Addressables");
        addFormattedParagraph("Way too late into development we were notified that Nintendo requires Addressables to be used in Unity games, in order to be approved for release on the Switch. Their reasoning is somewhat sound, as Unity normally creates its builds in the form of massive chunks of compressed binary data, which thanks to the compression will change completely if even just one thing is changed. This is bad, because it means that even minor patches will be huge, which Nintendo doesn't want. Addressables allows developers to manually group their data into bundles, among other things. Unfortunately, it also has the potential to break things massively if the rest of the project wasn't already made with Addressables in mind. The developer of [Fortune's Run](https://store.steampowered.com/app/1692240/Fortunes_Run/) posted [a tweet](https://twitter.com/FortunesRun/status/1667056963362906112) about the fact that reference equality can't be taken for granted with Addressables, which I found hilarious, having suffered the same problem previously. This is because individually bundled scenes make sure all their non-addressible content is also present in the scene bundle, creating duplicates of those assets which aren't reference-equal and ballooning the build size. ");
        addFormattedParagraph("We used the actual loading and manual unloading on demand of addressable assets only with the very large character dialogue sprites. Dealing with the async nature or the potential lag of forcing addressables to be synced was too much of a hassle for most of our scriptable objects, which were fairly light on the memory usage. To manage these in a non-reference-breaking way, we used \"configs\" (scriptable objects that contain other scriptable objects) and guids together with editor scripting for easy dropdowns when setting up such references while building levels and other things. The actual scriptable objects are only present in one asset bundle and are loaded into other objects only at runtime. ");

        addSubHeader("Using the InputSystem");
        addFormattedParagraph("The input system was another neccessity, as there are very few good things that can be said about the built-in input manager, except for that it is simple and generally works. As far as identifying controllers and providing easy access to a unified layout of their controls, it falls flat. The input system fixes this, but complicates everything else massively. Me and another programmer asked if we could just use ReWired instead, as that does the same thing, but has been out for a while and is very reliable, but no. ");
        addFormattedParagraph("Getting input from the input system isn't very difficult and neither is setting up gamepad bindings that work like you'd expect them to. Changing the binds at runtime is where the trouble lies. The documentation about rebinding is incorrect in places and leaves important things blank in others. Luckily with modern Unity packes, you get to take a look into the source code, so you can debug what counts as a 1.0 \"stable\" release yourself (apparently places marked with ||//FIXME|| are no problem). After much sweat and tears (of joy, once it finally worked) however, full rebindability of the controls was achieved. And having used ReWired for a different project afterwards, I am more sure than ever that it would have been a far better choice. ");

        addSubHeader("Custom cutscenes");
        addImage(
            { fileName: "gg_cutscene_editor.png", thumbnailName: "gg_cutscene_editor_small.png", altText: "A screenshot of the generic cutscene editor", dontLimitMaxHeight: true },
            "The editor that allows creating cutscenes without scripting or extra assets"
        );
        addFormattedParagraph("WttW had its own system for putting together cutscenes in the editor. The folks at Rain told me that one day some people from Unity came over to the office and saw their system, which may or may not have influenced the Timeline package. Unfortunately Timeline, as it is, was not usable for our cutscenes, which aren't the cinematic animated sequences that Timeline is made for, but rather a sequence of actions and waits which can't be timed beforehand. A good example is two characters walking to a place, upon arriving starting a dialogue, the duration of which is driven by player input, after which they again walk away. ");
        addFormattedParagraph("For us, we simply tell the characters where to move, wait for them to arrive, start the dialogue, wait for it to finish, then tell the characters to move somewhere else. This requires no extra animation, no timeline assets, has seamless transitions to and from gameplay and since it's our code, could be made to interact with the game. It can also handle things happening simlutaneously, such as going somewhere AND talking while doing that, requiring one or both or neither to finish before going to the next action in the cutscene. ");

        addSubHeader("Other systems");
        addFormattedParagraph("I've already mentioned the dialogue and localization system and the cutscenes, as well as the system of configs and scriptable object references via guids and managing rebinds with the input system. I was the systems guy on the GG project and thus made a lot of other systems, including, but not limited to:");
        addUnorderedList([
            "The \"flow\" system, allowing references to components in other scenes, of course implemented via guids and a config but using a lot of editor magic to make it all work automagically",
            "The saves system, which still contains the skeleton of the WttW system, but now actually supports multiple saves with timestamps, screenshots and more",
            "The stats and achievements system, tracking ingame stats and automatically triggering achievements upon certain goals being reached, manual triggers being another option of course",
            "Our system for spawning mobs and NPCs, addressables friendly and user friendly with nice color coded gizmos and navmesh snapping",
            "The player's items and abilites as well as the upgrades for the player and their items and abilities",
            "The editor system managing the grouping of all the addressables automatically",
            "The system for managing scenes, most of which are addressable, but crucially not all, so the system unifies the scene manager and addressables scene loading into one",
            "The build-system (as in building contraptions in the game) and the grid upon it works and making it function with the only partially grid-based levels",
            "A custom ingame-menu system with custom navigation and all custom buttons, which turned out to be a very bad idea, especially once I had to add in sliders and input fields for the settings menu but it DOES work at least",
            "A suite of ingame debug tools, useful not just for testing things but also for trade shows where it's not easily possible to quickly alter a build to show a level, item or feature not accessible in the demo"
        ]);

        addSubHeader("Other gameplay scripting");
        addFormattedParagraph("Besides being the systems guy (and of course shaders too), there was still plenty to do on the gameplay, since the game turned out to not really be just WttW with a fresh code of paint after all. The most important gameplay thing I did, is in my opinion the change to a more traditional third person camera. I floated the idea once, made a quick mockup and even though it made it neccessary to now add ceilings to every level, nobody would argue that it was the wrong call. ");
        addVideo(
            { fileName: "Overview Gg Laserbot-1.webm", altText: "Bamboozling the laser bot" },
            "Bamboozling the laser bot"
        );
        addFormattedParagraph("I also got to do the AI for one enemy, the laser bot or \"Stingray\" as it's called in the game. They are somewhat \"smart\", running away when you close in, chasing after you when you exit their field of fire and being very cute when they look around after chasing you, searching for their target. ");
        addFormattedParagraph("Besides that, I also scripted other things, but that list would be even longer than the list of systems, so I'll just leave it at \"a lot\". ");

        addSubHeader("Steam integration");
        addFormattedParagraph("Fortunately, there's a set of scripts with very simple calls one can add to a Unity project to have it function properly with Steam. Adding the proper calls to trigger stat upgrades and achievements in Steam too was very simple too, since the stats and achievements system was already using string-IDs for everything, just like Steam. ");

        addSubHeader("Automatically creating the minimap");
        addFormattedParagraph("The tool which combines a color-coded heightmap with a 3d-model tileset to build a level's rough geometry on a 1x1m grid is one of the few things left over from WttW. While clunky and not generating ceilings, it did prove useful in two instances. One was the aforementioned build system, which uses that same grid at runtime to place structures or prevent it. The other was the option to automatically generate the map for the entire castle. ");
        addImage(
            { fileName: "gg_map_zoom.png", thumbnailName: "gg_map_zoom_small.png", altText: "A zoomed in view of the ingame minimap" },
            "A cropped screenshot of the ingame map view zoomed in to show the player's location as well as fast travel points in the adjacent levels. If a little care had been taken in properly setting up the level transitions, the grey connections would line up nicely too but oh well..."
        );
        addFormattedParagraph("Using the height map and some simple image processing algorithms, I was able to generate images for the levels which come together to form the entire castle in the pause menu. As an additional treat, various objects have their location accessible even when not loaded, such as fast travel points or certain quest objectives. This allows me to draw icons at their precise locations, as well as of course the player's location. ");
        addFormattedParagraph("Funnily enough, automatically generating and placing the grey tunnels connecting the levels was way more complicated than the images for the levels themselves. If the level connections are set up properly, they will create perfect transitions from the level into the connector, unfortunately that care wasn't taken and as such, they will forever be disjointed, annoying me and only me to no end. ");

        addSubHeader("Closing remarks");
        addFormattedParagraph("While working on [Mesmer](#mesmer) was fun in its own right, doing the same project every week for several years until it's finally released was quite different. Especially since this time I wasn't the intern, I was a proper dev, helping newer team members onboard instead of being the guy in need of help. That the game was received positively is nice too. And it even has a physical release, but I wasn't involved in that in a major way. ");
    }
});