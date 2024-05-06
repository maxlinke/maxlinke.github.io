'use strict';

registerPage ("incrementalComputer", {
    title: "Incremental Computer",
    miniDescription: "A small incremental game made for a course at uni",
    year: 2022,
    numberInYear: 20,
    subfolderName: "incrementalComputer",
    backgroundImageName: "incrementalComputer_thumbnail.png",
    createElements: function () {
        addVideo(
            { fileName: "Overview Incrementalcomputer-1.webm", altText: "A few slices of \"gameplay\"" },
            "A few slices of \"gameplay\""
        );
        addFormattedParagraph("\"Incremental Computer\" is a small incremental game I developed for a course during my master's degree. You are controlling a virtual computer generating \"currency\" via a command based interface, buying parts with the generated currency to generate currency faster so you can afford ever more expensive parts for ever increasing currency gains. ");

        addProjectInfo({
            "Project Type": "Video Game",
            "Team Size": "Solo",
            "Project Duration": "January 2022 - February 2022",
            "Project Purpose": "University Coursework",
            "Key Aspects": [
                "Game Design",
                "Game Development"
            ],
            "Tech Used": [
                "Unity 2020.3.17f1",
                "[UniRX-Plugin \\(github.com\\)](https://github.com/neuecc/UniRx)"
            ],
            "Repository": "[GT3-Incremental-Computer \\(github.com\\)](https://github.com/maxlinke/GT3-Incremental-Computer)",
            "Playable Build": "[GT3 Incremental Game](https://maxlinke.github.io/WebGL/IncrementalComputerWebGL/index.html)",
            "Report": "[gt3_report_max_linke.pdf](incrementalComputer/gt3_report_max_linke.pdf)"
        });

        addSubHeader("What's an incremental game and why did I make one?");
        addFormattedParagraph("In short, incremental games are \"number go up\" games like [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/). Sometimes they're also known as \"idle games\" because they play themselves. ");
        addFormattedParagraph("One of the courses during my master's degree was titled \"Realtime Interactive Systems\", identified as \"GT3\" (GT standing for \"Game Technologies\", the broader subject). The course was taught by a developer making such games, using them as a practical way to teach working with Unity. Even though I had worked with Unity quite a bit before, even [professionally](#mesmer), I still learned some things here and there. Also it was quite fun to get to develop a game mostly free of any constraints and actually finish it. ");

        addSubHeader("Designing the game");
        addFormattedParagraph("When it came to actually designing the game, I already knew what I wanted to do. Not wanting to spend time on creating lots of assets, I decided to make a very computer-y game, inspired by the amazing Zachtronics game [TIS-100](https://store.steampowered.com/app/370360/TIS100/). Where in that game, you write code to actually run the computer, in my game the computer runs itself, but you buy the components via a command-line interface to make it run more efficiently. Running the computer generates money, which you can spend on said components, but the better components are of course more expensive. Hence you get the classic incremental game loop of constant improvements. ");

        addSubHeader("Developing the game");
        addFormattedParagraph("With pretty much no time spent drawing the handful of pixel art sprites used throughout the game, I could go whole hog on building a nice codebase. The unique thing about this project (at least for me) is that i used the [UniRX-Plugin \\(github.com\\)](https://github.com/neuecc/UniRx), a reactive framework. The idea is to write cleaner code by having so called \"observables\" and subscribing to them under previously specified conditions. ");
        addCodeBlock(`const KeyCode CANCEL_KEY = KeyCode.Escape;
Subject<Event> onKeyEvent = new Subject<Event>();
Subject<Event> onCancel = new Subject<Event>();
        
// called from somewhere else. could also just be start or awake. 
public void Initialize () {
    onKeyEvent
        .Where(evt => evt.keyCode == CANCEL_KEY)
        .Subscribe(evt => {
            onCancel.OnNext(evt);
            evt.Use();
        });
}

void OnGUI () {
    var curr = Event.current;
    if(curr.type == EventType.KeyDown){
        onKeyEvent.OnNext(curr);
    }
}`);
        addFormattedParagraph("In the above example, the ||onKeyEvent|| observable is triggered every time a key is pressed. By subscribing to a filtered version of it, ||onCancel|| is triggered only if the the escape key was pressed. This can again be observed and filtered in other places, such as to close a menu, but only if the menu is focused, for example. ");
        addFormattedParagraph("I must admit however, although there were probably more places to use this pattern, I only really used it in processing user inputs. The game's logic itself is programmed more conventionally. The coolest thing for me is how the entire game state is a serializable object, so implementing saving and loading was incredibly simple. Otherwise, it's just really clean code due to the small project size and short duration not giving much time for a spaghetti mess to develop. ");
        
        addSubHeader("Closing remarks");
        addFormattedParagraph("It only took me pretty much one month exactly to go from start to finish with this game, probably owing to my familiarity with Unity and clear plan from the outset. The only real issue is that it's not a very good incremental game, because those can usually run for a LONG time being mostly driven by formulae, while my game has discrete steps, which of course only go so far as I put them in. Other than that, I am pretty proud of what I created. ");
        addFormattedParagraph("If you want to play it, there is a [slightly reduced WebGL-build](https://maxlinke.github.io/WebGL/IncrementalComputerWebGL/index.html), which is only missing the saving and loading feature. There's also [the report I submitted](incrementalComputer/gt3_report_max_linke.pdf), which goes into a bit more detail in all the parts. And not to forget, [the repository](https://github.com/maxlinke/GT3-Incremental-Computer) is publicly accessible, so if you really want to judge what I consider to be \"clean code\" for yourself, you can. ");
    }
});