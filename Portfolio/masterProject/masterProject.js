'use strict';

registerPage("masterProject", {
    title: "My Master Project",
    miniDescription: "A .NET framework for training and evaluating AI agents for games",
    year: 2023,
    numberInYear: 80,
    subfolderName: "masterProject",
    backgroundImageName: "masterproject_thumbnail.png",
    createElements: () => {
        addVideo(
            {fileName: "Overview Masterproject-1.webm", altText: "A quick overview over the essentials of my framework" },
            "A quick overview over the essentials of the framework I created"
        );
        addFormattedParagraph("I wrote my master thesis about a framework I had created, in which N-player games can be implemented and AI-agents set against one another to generate data about the quality of their strategies. This data can then be analyzed via an included web-based visualizer. The framework was tested with four very different games, which yielded very interesting results. ");

        addProjectInfo({
            "Project Type": ".NET Console Application/Framework",
            "Team Size": "Solo",
            "Project Duration": "April 2023 - August 2023",
            "Project Purpose": "University - Master Thesis",
            "Key Aspects": [
                "Creating a framework",
                "Machine learning",
                "Data visualization",
            ],
            "Tech Used": [
                "Microsoft Visual Studio Community 2022",
                ".NET 6.0",
                "NUnit Test Framework",
            ],
            "Repository": "[MasterProject \\(github.com\\)](https://github.com/maxlinke/MasterProject)"
        });

        addSubHeader("Inspiration");
        addFormattedParagraph("For my [bachelor thesis](#bachlorProject), I was inspired by a WebGL-app which I decided to expand upon and improve. For my master thesis, I opted to use a scientific paper, albeit a satirical one, as inspiration. The paper, written by Tom Murphy, is titled [Elo World, a framework for benchmarking weak chess engines](http://tom7.org/chess/weak.pdf). The author also has an [excellent YouTube-channel](https://www.youtube.com/@tom7) with a [video about the same subject](https://www.youtube.com/watch?v=DpXy041BIlA). I liked the idea of a framework to not just find \"the best\" strategy, but also compare a variety strategies against each other to find interesting pairings and other oddities. And with my C#-skills writing generic code honed from writing my [tracker music player plugin](#trackerMusicPlayer), I decided to make my framework generic, capable of analyzing any game, not just chess. ");

        addSubHeader("Structure");
        addFormattedParagraph("The framework roughly consists of three layers. At the bottom, there's the individual games, which includes the agents. This is where users of the framework write their own code, implemeting their own games and strategies to compare. Above games is the tournament-layer, where games are run with agents and the results tallied up for a tournament result, which can be visualized. At the very top are boot camps, where training (a.k.a. machine learning) occurs. Boot camps use tournaments and agents that have changeable parameters to gradually produce better and better agents and files that can also be visualized to analyze the training progress. Both tournaments and boot camps require no further programming, they are implemented generically to work with all games and agents extending the given base classes. ");

        addSubHeader("Writing your own game to test");
        addFormattedParagraph("For compatability with tournaments, the game must extend the class ||Game||. For turn-based games with a limited number of actions per turn, it is advisable to extend ||Game<TGame, TGameState, TMove>|| instead, as this already contains a turn-based game loop and implements most of the abstract functions and procedures in ||Game||. ");
        addCodeBlock(`namespace MasterProject.TicTacToe {

    public class TTTGame : Game<TTTGame, TTTGameState, TTTMove> {

        public override int MinimumNumberOfAgentsRequired => TTTGameState.PLAYER_COUNT;

        public override int MaximumNumberOfAgentsAllowed => TTTGameState.PLAYER_COUNT;

        public override Agent GetRandomAgent () => new MasterProject.TicTacToe.Agents.RandomAgent();

        protected override TTTGameState GetInitialGameState () {
            var output = new TTTGameState();
            output.Initialize();
            return output;
        }

    }
}`);
        addFormattedParagraph("The main effort when writing a game in this way will be spent on the game state, extending ||GameState<TGameState, TMove>|| or ||GameState<TGameState, TMove, TPlayerState>||, which has to generate all possible moves, so that the agents only need to pick a move, not generate one themselves. ");
        addFormattedParagraph("To write easily agents using game tree search, I also added a generic N-player implementation combining Alpha-Beta-Pruning and Expectiminimax. This makes it possible to even analyze games where outcomes of moves are non deterministic, like with dice rolls or coin flips. ");

        addSubHeader("Running a tournament");
        addImage(
            { fileName: "tournamentInProgress.png", altText: "Console-window showing tournament progress" },
            "The console showing the progress of a currently running tournament"
        );
        addFormattedParagraph("With a game and agents implemented, tournaments are automatically available to use. The generic static factory methods ||Tournament<TGame>.New|| and ||Tournament<TGame>.Continue|| are used to create a new tournament or continue a previous tournament respectively. A number of parameters can then be set, before the tournament is started by calling ||Run|| on it with the agents to use, the number of matches to play per possible matchup, and a filter-object preventing unwanted matchups, for example preventing mirror-matches. ");
        addFormattedParagraph("Upon starting the application, a console will open up. A running tournament will log its progress periodically, along with how long it has been running and an estimate of how long it will continue to run before finishing. Unless the tournament was explicitly set to play each matchup to completion before moving onto the next, the estimate will be very accurate very quickly. ");
        addFormattedParagraph("After a tournament is finished, it is advisable to save the result to disk for analysis. Both these final results, as well as tournament autosaves, if enabled, can be used to continue at a later time, using ||Tournament<TGame>.Continue|| to create the tournament instead of calling ||Tournament<TGame>.New||.");

        addSubHeader("Running a boot camp");
        addFormattedParagraph("While tournaments can be run simply using games and agents, running boot camps requires an extension of the class ||Individual|| to be created. Again, several generic subclasses already exist taking care of the required overrides, needing only very little additional programming to get running. Individuals are asked to create agents to play in tournaments and to create new individuals for generations down the line. ");
        addFormattedParagraph("Just like tournaments, the console window informs the user about the progress and once again, data can be saved to disk for visualization and later continuation. Additionally, individuals and their agents can be extracted from those files and be put into regular tournaments, to gauge performance against more explicit strategies. ");

        addSubHeader("Analyzing the data");
        addImage(
            {fileName: "vis_matchupMatrix.png", altText: "A colorful matrix visualizing the average results between various agents in chess" },
            "A colorful matrix visualizing the average results between various agents in chess"
        );
        addFormattedParagraph("I opted to build a web-based visualizer rather than building one into the .NET-application mainly because I already had experience building such things in the browser using only regular HTML, CSS and JavaScript. Both the data from tournaments and boot camps can be visualized. ");
        addFormattedParagraph("The tournament visualization consists of a table showing the summed up wins, losses and draws for the various agents, along with other metrics, and the colorful matchup matrix, which shows the average results of the various matchups via color and a more precise numeric popup on hover. Elo World, the paper that inspired me, also has such a matrix. Since my framework is generic and doesn't limit the number of players per game to two however, the visualizer is similarly flexible. And just like in Elo World, matchups that always end the same (and can thus be considered deterministic) can be specially highlighted. ");
        addImage(
            {fileName: "vis_fitness.png", altText: "A scatterplot showing the evolving average fitness over multiple generations" },
            "A scatterplot showing the evolving average fitness over multiple generations"
        );
        addFormattedParagraph("The visualization of boot camps itself has two modes of displaying its data. One shows the parent-child relations between generations to track the lineage of certain inviduduals, the other shows the individuals on a scatterplot measured by whatever value one chooses. Ordering them by their fitness is a good way to determine whether to continue a boot camp for more generations or whether to quit, as a plateau in fitness has been reached. ");

        addSubHeader("What I learned");
        addFormattedParagraph("I implemented and analyzed four games with my own framework. The first game was Tic Tac Toe, mainly just to test the framework in general and quickly generate data for the visualizer. The second game implemented was \"G44P\", a game invented by one of my professors. It is a four player game which was useful for testing the N-player aspect of the framework. I had also done some parameter optimization for agents playing this game before, so I was interested in seeing if my generic machine learning algorithm would reach the same conclusions, which it did. The third game was chess, where I replicated the strategies found in Elo World and compared my results to those in the paper, once again to find them to match very closely. Finally I tested a reduced version of God Field, a highly randomized online card game, to analyze whether strategy even matters in such a nondeterministic environment, which it does. ");
        addFormattedParagraph("Overall, by running many tournaments and training many individuals, I learned several things. While precise game tree search delivers quality results, it is also incredibly expensive to run, especially at scale. Simply running the game forwards, in some capacity, without regarding the opponent's actions still allows for evaluations of future game states at a much reduced cost, for not much reduced proficiency. The second thing I learned was that in free for all games, to win, simply trying to maximize one's own \"score\" is a worse strategy than trying to achieve the maximum lead. Finally, having the computer play against itself and viewing the outcome is a lot of fun, at least for me. ");
    }
});