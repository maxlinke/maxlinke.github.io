'use strict';

registerPage("mesmer", {
    title: "Mesmer",
    miniDescription: "The first commercial game I worked on by interning at a game studio",
    year: 2019,
    numberInYear: 100,
    subfolderName: "mesmer",
    backgroundImageName: "mesmer_banner.jpg",
    createElements: () => {
        addYouTubeEmbed({
            src: "https://www.youtube.com/embed/fettovMEzVs",
            width: "516",
            height: "312"
        });
        addFormattedParagraph("Mesmer is the first commercially released game I ever worked on. It is a \"social survival game\", somewhat akin to games like [Don't Starve](https://store.steampowered.com/app/219740/Dont_Starve/), but managing social standing and city politics rather than bodily needs in order to survive. ");

        addProjectInfo({
            "Project Type": "Video Game",
            "Team Size": "Around 10",
            "Project Duration": "January 2019 - May 2019",
            "Project Purpose": "Internship",
            "Key Aspects": [
                "Commercial Game Development",
                "Prototyping mechancics and minigames",
                "Unity UI",
                "Learning Unity Editor Scripting"
            ],
            "Tech Used": [
                "Unity 2018.3.9f1",
                "JetBrains Rider"
            ],
            "Links": [
                "[Mesmer \\(on Steam\\)](https://store.steampowered.com/app/1308760/Mesmer/)",
                "[Mesmer \\(on GOG\\)](https://www.gog.com/en/game/mesmer)"
            ]
        });

        addSubHeader("The internship");
        addFormattedParagraph("Part of my university studies included a mandatory internship abroad. I applied to studios all over Europe and Rain answered the call. Mesmer had been in development for quite some time before I got on board and it continued to be developed after the end of my five month internship. While I didn't get \"the full picture\" of developing a commercially released game, I still learned a lot during that time. I moved to Norway for the duration of the internship and went back to Germany afterwards to write my [bachlor's thesis](#bachelorProject) and finish my degree. ");

        addSubHeader("Large scale UI redesigns");
        addFormattedParagraph("My first task was a total overhaul of the shop UI. I was given a drawing showing the desired outcome and a handful of assets to use and more or less let loose on the problem, occasionally going to the programmers for help. I had never dynamically generated a UI before, only built one in the editor, so I had to come to grips with the peculiarities of [RectTransforms](https://docs.unity3d.com/2018.4/Documentation/ScriptReference/RectTransform.html), settings up [Buttons](https://docs.unity3d.com/2018.4/Documentation/ScriptReference/UI.Button.html) and completely custom selectables and finally making everything look nice and animated using [Coroutines](https://docs.unity3d.com/2018.4/Documentation/ScriptReference/Coroutine.html). I was shown that C# allows programmers to create [extension methods](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods) and that [string interpolation](https://learn.microsoft.com/en-us/dotnet/csharp/tutorials/string-interpolation) is incredibly handy for creating strings with variable sections. ");
        addImage(
            { fileName: "new_shop_first_implementation.png", altText: "A screenshot of the new shop interface, after a week of working on it" },
            "The new shop interface after one week, still containing some temp images"
        );
        addFormattedParagraph("Since the clickable cards unfolding underneath a now read-only text box worked so well, I was later tasked with extracting that part into something more generic, so that other menus could also be converted to this new mouse- AND controller-friendly control-scheme. ");

        addSubHeader("Shaders");
        addFormattedParagraph("I had taken interest in programming shaders about a year prior to my internship, so I was somewhat familiar with them already. That turned out to be useful, as I got several tasks involving shaders throughout the internship. The first one was to make a shader for the detailed NPC models seen during dialogues, in the shop and similar places. The game overall had a somewhat toon-ish look and these NPCs were supposed to look very different. We settled on fully physically based rendering for these characters, but instead of using the standard shader and a lot of lamps, I wrote a PBR shader, using the standard shader's BRDF and one cubemap for image based lighting, to render it in exquisit detail using only one pass. ");
        addImage(
            {fileName: "blue_boxes.png", altText: "A view of the streets in the evening, with blue boxes surrounding the street lights" },
            "Blue boxes surround the street lights in the evening"
        );
        addFormattedParagraph("Another task was to debug and solve a problem visible during the evening in the game, when the street lights came on. Something was causing very faint blue rectangles to appear around the lamps, and it wasn't easy to find the culprit. After creating a testing scene with just the relevant pieces, because the frame debugger was utterly unsuable otherwise, the problem presented itself: For some reason, in the surface shader, ambient lighting had been explicitly disabled and was instead added manually. With only one light source during the day, the sun, this looked correct, but as more than one light source affected a pixel, the ambient light would be applied again, leading to the erroneous blue boxes. Adding to the problem, the erroneous piece of code was copied to a whole host of other shaders, all doing the same thing slightly differently. ");
        addFormattedParagraph("I created a .cginc file containing the shared code to both fix the error and cut back the amount of copy-pasted code in one. But since nearly everything was drawn with surface shaders doing almost the same thing, and the game was also suffering from very bad performance during the evening and night, when all the lights were on, I also gave the shaders a proper deferred pass. The game had been set to deferred rendering for a while, but with no appropriate pass in the shaders, the objects were still being drawn forward, leading to the poor framerate. ");
        addFormattedParagraph("I created more shaders after that for various purposes, one to outline characters with particular colors during a minigame, one to allow them to fade in and out by dithering, several UI shaders and probably more I don't even remember. ");

        addSubHeader("Minigames");
        addFormattedParagraph("With the main programmers busy with the games MANY systems, I got the very fun task of prototyping several mechanics and minigames. This usually started with a paper prototype, followed by a quick software prototype in a separate project, repeated testing and tweaking before getting proper assets from the artists and being integrated into the main project. ");
        addImage(
            { fileName: "favour_negotiation_minigame_crop.png", altText: "Negotiating for a favour using spinning wheels", dontLimitMaxHeight: true },
            "Favour negotiation minigame prototype"
        );
        addFormattedParagraph("The first minigame was a half skill-based, half random minigame to determine success when negotiating for favours with NPCs. It features spinning wheels, which all stop either on a button press or after a set time, if the user waited too long. Once again, this required a lot of UI scripting to build the wheels dynamically, as well as coroutines to make everything animate. At that point in time, coroutines were my hammer I'd apply to any problem, later finding out that it's very easy to create undebuggable spaghetti code this way. ");
        addImage(
            { fileName: "public_speech_sceneview.png", altText: "The player character standing on a soap box speaking to a crowd" },
            "Scene view of the speech minigame"
        );
        addFormattedParagraph("The speech minigame was one of those things core to the game itself. The character gets onto a soap box and starts giving a speech. People come and go, partially attracted or driven away by the the arguments chosen by the player and a steady growth in police presence either cancels the event prematurely or is overpowered by the crowd and a riot starts. Because of the importance of this minigame, but also the complexity of it, the visuals had to be clear so as to not confuse players. The UI was one thing, but managing the actual NPC crowd was another. Instead of just bars representing attendance by the various factions, there are actual NPCs surrounding the player, color coded with that outline shader I mentioned earlier to show their allegiance. ");
        
        addSubHeader("Addendum");
        addFormattedParagraph("I worked on Mesmer for five months, during which I did way more things than I could fit into a handful of paragraphs for an easy to read portfolio piece. When I went to Rain, I was familiar enough with Unity to actually help them and not just be a dead weight, but lacked versatility. During my internship, I learned things I never touched on in my personal projects or during university, such as dynamic UIs and editor scripting. After my internship, I put that knowledge to use in creating my [bachelor project](#bachelorProject), which got me my degree, after which I went back to Rain, although not physically this time, since 2019 had ended and 2020 had come. ");
    }
});