'use strict';

registerPage ("genericDialogueSystem", {
    title: "Dialogue System Package",
    miniDescription: "A generic dialogue system package for Unity games",
    year: 2024,
    numberInYear: 10,
    subfolderName: "genericDialogueSystem",
    backgroundImageName: "genericDialogueSystem_thumbnail.png",
    createElements: function () {
        addFormattedParagraph("The dialogue system I build for [Girl Genius](#girlGenius) was apparently so well liked by the people using it, that the people from the other team at Rain took note. It was however not written with being used in other games in mind, so rather than trying to refactor it, I got to apply my knowledge and build a new, better dialogue system from scratch and turn it into a proper package. ");

        addProjectInfo({
            "Project Type": "Unity Package",
            "Team Size": "Solo",
            "Project Duration": "January 2024",
            "Project Purpose": "Company-internal package",
            "Key Aspects": [
                "Developing custom Unity pacakges",
                "Using the SerializeReference-Attribute for maximum flexibility",
            ],
            "Tech Used": [
                "Unity 2023.3.10f1",
                "VS Code"
            ]
        });

        addSubHeader("What's there");
        addImage(
            { fileName: "genericDialogueSystem_dialogueFileEditor.png", thumbnailName: "genericDialogueSystem_dialogueFileEditor_small.png", altText: "A screenshot of a piece of sample dialogue in the dialogue editor window", dontLimitMaxHeight: true },
            "This editor looks a lot like [the one from Girl Genius](./girlGenius/gg_dialogue_editor.png)"
        );
        addFormattedParagraph("The package is a self-initializing dialogue system working much like the one I made for GG, but having learned from what worked and what didn't. Once again, there is the overall ||DialogueConfig||-scriptable object singleton, but this time it is automatically created and automatically loaded without needing a programmer to hardcode the asset guid somewhere after creation. ||DialogueFile||-scriptable objects are still the objects containing an entire dialogue, via the contained ||DialogueLine||-objects. Having distinct characters mapped to a line is a concept deemed universal enough that ||DialogueCharacter|| is still a scriptable object class containing its own name and sprites. Finally, the system of custom dropdowns and custom categories for objects contained in those dropdowns to make long lists manageable was also taken over but made 100% coding-free this time, with categories being creatable simply via the editor window. ");

        addSubHeader("What's different");
        addFormattedParagraph("Besides requiring more manual setup and scripting, the dialogue system I made for GG was written with a lot of GG-specific things in mind. For example that there would be speech bubble shaped text boxes and as such, there was an enum per dialogue line which type to use. The same goes for some general text styles used in that game (people and \"the castle\" use different fonts) and furthermore, setting a character would automatically set bubbles and text styles automatically, since that saved time. ");
        addFormattedParagraph("With the new dialogue system, only the most generic parts are included \"in the box\". A template dialogue UI is also included, to show a possible way to implement one for the dialogue system, but since there is an uncountably infinite number of possible styles for such things, it is barebones, trying not to influence the actual user implementation. ");

        addSubHeader("How I made extendable dialogue lines");
        addImage(
            {fileName: "genericDialogueSystem_dialogueLinePolymorphism.png", altText: "A dropdown showing one additional dialogue line class"  },
            "Dialogue lines can change type now"
        );
        addFormattedParagraph("Dialogue lines, the individual lines said by a character or \"the narrator\" or nobody at all, are still implemented as a simple serializable class rather than scriptable objects. Making the lines also scriptable objects would have made polymorphism easy, as the Unity serializer isn't picky when serializing references. This would however have created a LOT of assets over the course of making a game this way, which isn't great for load and import times. Furthermore, unless special care is taken, it is easy to simply dereference a dialogue line, but keep its asset unused but taking up space in the asset database. ");
        addFormattedParagraph("For this reason, ||DialogueFile|| is still a scriptable object class with a simple array of ||DialogueLine||-objects in it, which are just regular serializable classes. However, this array is not preceded by the usual ||SerializeField||-attribute, but rather the ||SerializeReference||-attribute, which actually makes it possible to have polymorphism without needing to resort to scriptable objects. The following code snippet taken from the property drawer for dialogue lines shows how nice and neat it all is. ");
        addCodeBlock(`protected virtual void DrawBeforeProperties (ref Rect position) {
    var typeDropdownRect = EditorGUITools.RemoveLine(ref position);
    typeDropdownDrawer = typeDropdownDrawer ?? new DialogueLineTypeDropdownDrawer();
    if (typeDropdownDrawer.DrawDropdownWithChangeCheck(
        position: typeDropdownRect,
        obj: serializedProperty.managedReferenceValue.GetType(),
        label: typeDropdownLabel,
        showMixedValue: false,
        newObj: out var newType,
        setup: DialogueLineTypeDropdownDrawer.defaultSetup,
        miniMode: false
    )) {
        var oldReferenceValue = serializedProperty.managedReferenceValue;
        var newReferenceValue = CreateNewLineOfTypeWithConstructorParameter(newType, oldReferenceValue);
        serializedProperty.managedReferenceValue = newReferenceValue;
    }
}

static DialogueLine CreateNewLineOfTypeWithConstructorParameter (System.Type newType, object constructorParameter) {
    var constructorInfo = newType.GetConstructor(new System.Type[] { typeof(DialogueLine) });
    return constructorInfo.Invoke(new object[] { constructorParameter }) as DialogueLine;
}`);

        addSubHeader("Leaving it unfinished");
        addFormattedParagraph("While the package is already usable and provides a lot of utility that would have to be programmed by someone probably less familiar with making a good dialogue system, several fairly important parts are still missing, such as built in support for localization. Addressables is already supported via compiler directives, but Unity's localization package isn't, even though I did tests to see how I could make it work and found it to be a lot more user friendly than when I tested it originally for Girl Genius. However, with Rain being in some financial trouble, they couldn't pay me any more to develop the package further and as such, it sits unfinished. ");
    }
});