'use strict';

registerPage ("testPage", {
    // hidden: true,
    title: "Test Page",
    miniDescription: "This is just a test",
    year: 2024,
    numberInYear: 0,
    subfolderName: "testPage",
    backgroundImageName: "testBackground.png",
    createElements: function () {
        addParagraph("Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        addCompoundParagraph([
            { text: "Wurden zunächst die wenigen Zeilen von " },
            { text: "„Lorem ipsum“", href: "#ayy" },
            { text: " im Blindtext fortlaufend wiederholt, so dient heute der " },
            { text: "Cicero-Text", href: "#lmao" },
            { text: " als Basis vieler Lorem-ipsum-Generatoren, die darauf aufbauend längere Abschnitte erzeugen. Die Wortfolge ist so weithin üblich, dass viele Desktop-Publishing-Programme einen Menüpunkt für Blindtext haben, der eine Sequenz erzeugt, die mit „Lorem ipsum“ beginnt. Außerdem wird heute die Wortfolge „Lorem ipsum“ in der elektronischen Druckaufbereitung erkannt und eine Warnmeldung ausgegeben, damit eine Publikation mit verbliebenem Blindtext nicht versehentlich in den Druck geht." }
        ]);
        addCompoundParagraph([
            { text: "Das hier ist nur ein " },
            { text: "Test", style: "b" },
            { text: ", ob Zeichen wie " },
            { text: "zum Beispiel", style: ["b", "i"] },
            { text: " < " },
            { text: "funktionieren", href: "#ayy" },
            { text: ", oder auch > oder &. Oder direkt <b>Hypertext</b>. " },
            { text: "Lorem ipsum", href: "#lmao" },
            { text: " und so, ne? Dies sollte z.B. kein Link sein: <a href=\"\">Blablabla</a>." }
        ]);
        addFormattedParagraph("Das hier ist nur ein **Test**, ob Zeichen wie ***zum Beispiel*** < [funktionieren](#ayy), oder auch > oder &. Oder direkt <b>hypertext</b>. [Lorem ipsum](#lmao) und so, ne? Dies sollte z.B. kein Link sein: <a href=\"\">Blablabla</a>.");
        addFormattedParagraph("Btw, der zweite identische ist als \\*ein\\* Stück Text im JS definiert, während der identische zuvor wesentlich involvierter geschrieben ist. Ich habe dafür nen Parser geschrieben. \\*Italic\\* wird *Italic*, \\*\\*Bold\\*\\* wird **Bold**, \\*\\*\\*Bold-Italic\\*\\*\\* wird ***Bold-Italic***, \\_\\_Underline\\_\\_ wird __Underline__ und \\~\\~Strikethrough\\~\\~ wird ~~Strikethrough~~. Man *kann **auch** __mixen*, was **ziemlich**__ cool ist. Invalide Tags wie ****,_ oder ~ werden einfach ignoriert. ");
        addParagraph("Bold-Test Nummer 1", null, "b");
        addStyleToInnerHtml(addParagraph("Bold-Test Nummer 2"), "b");
        addParagraph("List test 1");
        addOrderedList([
            { text: "Item 1" },
            [ 
                { text: "Item " },
                { text: "2", href: "#lmao" }
            ],
            [
                { text: "Item 3 " },
                { text: "with ", style: "i" },
                { text: "style! ", style: "b" },
                { text: "(But writing it like this is annoying...)" }
            ]
        ]);
        addParagraph("List test 2");
        addOrderedList([
            "Item 1",
            "Item [2](#lmao)",
            "Item 3 *with* **style!** (But writing it like this is super chill!)"
        ]);

        addSubHeader("Sub header, yo");
        addParagraph("The battle of New Carthage, part of the Second Punic War, took place in early 209 BC when a Roman army under Publius Scipio (bust pictured) assaulted New Carthage, held by a Carthaginian garrison under Mago. Late in 210 BC Scipio took command of Roman forces in Iberia (modern Spain and Portugal) and decided to strike at the regional centre of Carthaginian power: its capital, New Carthage.");
        addImage("testBackground.png", "Test Image", "Test Subtext");
        addParagraph("He marched on the city and immediately attacked it. After defeating a Carthaginian force outside the walls, he pressed attacks on the east gate and the walls. Both were repulsed, but later that day Scipio renewed them. ");
        addVideo("Bossmusic-1.webm", "Test Video", "Video Subtext");
        addParagraph("Hard-pressed, Mago moved men from the north wall, overlooking a broad, shallow lagoon. Anticipating this, a force of 500 men waded the lagoon to scale the north wall unopposed. They fought their way to the east gate, opened it from inside and let in their comrades. The city fell and became a logistics centre for the Roman war effort. By 206 BC the Carthaginians had been expelled from Iberia.");
        addCodeBlock(`using UnityEngine;

public class MyClass : MonoBehaviour {

    public void Start () {
        Debug.Log("This is a log!");  // this is a test for code block formatting
    }

}`);
    }
});