'use strict';

registerPage("alchemist", {
    title: "Alchemist",
    miniDescription: "A prototype WPF-application for automatically translating manga",
    year: 2024,
    numberInYear: 40,
    subfolderName: "alchemist",
    backgroundImageName: "thumbnail_alchemist.png",
    createElements: () => {
        addVideo(
            { fileName: "Alchemistoverview-1.webm", altText: "Quick Alchemist Showcase Video" },
            "A quick overview showing what Alchemist can do"
        );

        addFormattedParagraph("I had the privilege to develop a prototype application for [InkyPen](https://inky-pen.com/), aiming to produce a piece of software combining various pieces of state-of-the-art software greatly reducing the workload for translators. In just two months, me and my colleague produced a fully working application, although not a very polished one. ");
         
        addProjectInfo({
            "Project Type": "WPF Application",
            "Team Size": "Two programmers",
            "Project Duration": "Feburary 2024 - April 2024",
            "Project Purpose": "Internal prototyping, technology demonstration",
            "Key Aspects": [
                "Learning WPF while working with it",
                "Rapid prototyping",
                "Programming with pointers",
                "Image processing"
            ],
            "Tech Used": [
                "Microsoft Visual Studio 2022",
                ".NET 8.0", 
                "Various tools and plugins publicly available on the internet"
            ]
        });

        addSubHeader("What was the plan?");
        addFormattedParagraph("Me and a colleague were tasked with building this application in an environment of our choice, using open-source AI-tools to do the hard parts of actually doing the translation. We were given two months to try and get as far as we could. After short deliberation we settled on WPF for building the application as we could put our C#-skills to use there, only that neither of us had ever done anything using WPF. Furthermore, all the tools we could find were written in Python, which also neither of us had any experience with. I took care of building the application, my colleague took to integrating and troubleshoothing the various tools, but we often helped each other out when we got stuck. ");

        addSubHeader("Learning WPF as I went");
        addFormattedParagraph("Both me and my colleague had plenty of experience programming in C#, however during university I had used JavaFX for making GUIs for Java-applications and with .NET sometimes being called \"Microsoft Java\" I figured I might have a bit of a leg up with regards to building the user interface. And indeed, the general workflow was very similar. An XML-like document defining the window layout, a class being tied to the window which has fields to access all the named elements and more were all things I was familiar with already. But those were only the concepts, I still had learn how to do everything in a framework I had never used before. ");
        addFormattedParagraph("While the Microsoft-Docs are expansive and very nice to read, finding what you're looking for when you don't know what it's called is a bit of a challenge. Case in point, making the tool to transform text boxes involves an [Adorner](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/adorners-overview?view=netframeworkdesktop-4.8) which itself uses [Thumbs](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.primitives.thumb?view=windowsdesktop-8.0) to handle the mouse interactions. Luckily, there were only a few instances of needing to know some magic word before being able to continue working. ");

        addSubHeader("Making the application behave like expected");
        addImage(
            { fileName: "windowsLikeInterface.png", altText: "Comparing OpenOffice and Alchemist's menu bars" },
            "I styled Alchemist after OpenOffice Writer (seen in the backgound), but we didn't have any images for our buttons"
        );
        addFormattedParagraph("When working with windows applications, there are certain expectations about their layout and behaviour. I learned that at least with WPF, even though it literally stands for \"Windows Presentation Framework\", building a Windows-like interface and user experience required quite a bit of manual work. For example, perhaps unsurprisingly, undo and redo on their own only work for certain premade elements, such as text-editing inside a text box. So for everything else, we had to do that ourselves, for which I designed my own system. I also had a great time devising the file specification for our projects and implementing saving to and loading from disk. ");
        addFormattedParagraph("In [Girl Genius](#girlGenius) and my [master project](#masterProject) I used JSON due to how simple it is to serialize and deserialize objects with just a few attributes on the fields in classes. However, that simplicity has its downsides, namely that it is not possible to include efficiently encoded binary data inside. For Alchemist, I opted for a completely custom binary format, as I had already written encoders and decoders for some in [tracker music player](#trackerMusicPlayer). ");
        // TODO shortcuts?

        // addSubHeader("Trying things and iterating");
        // addFormattedParagraph("Given the short amount of time we had, ");
        // TODO how we'd do things, find out we'd need to do more or different things and stuff

        addSubHeader("Working with Rich Text");
        addImage(
            { fileName: "richTextDemo.png", altText: "Rich Text Demonstration" },
            "A piece of text with various formattings inside one rich text box"
        );
        addFormattedParagraph("Having good text-editing functionality was paramount, luckily WPF has the [RichTextBox](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/richtextbox-overview?view=netframeworkdesktop-4.8) element, which takes care of displaying all the wild formatting one can imagine. However, we wanted things like font and color to be properties of the text itself, rather than just the text box on a whole. ");
        addCodeBlock(`{\\rtf1\\ansi\\ansicpg1252\\uc1\\htmautsp\\deff2{\\fonttbl{\\f0\\fcharset0 Times New Roman;}{\\f2\\fcharset0 Segoe UI;}}{\\colortbl\\red0\\green0\\blue0;\\red255\\green255\\blue255;}\\loch\\hich\\dbch\\pard\\plain\\ltrpar\\itap0{\\lang1033\\fs18\\f2\\cf0 \\cf0\\ql{\\fs36\\f2 {\\ltrch Hello}\\li0\\ri0\\sa0\\sb0\\fi0\\ql\\par}
}
}`);
        addFormattedParagraph("As can be seen in the \"Hello\" example above, rich text isn't very human readable on its own. To modify it, one is advised to use the [text pointer](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.textpointer?view=windowsdesktop-8.0) and [text range](https://learn.microsoft.com/en-us/dotnet/api/system.windows.documents.textrange?view=windowsdesktop-8.0) classes for accessing the desired properties. For most things, like bold and italic styling, font size and color, this is as simple as described above, but for other things, like underlining text, getting the desired behaviour is a lot less straightforward. Luckily, the amount of things one could possibly want to change on a piece of text is finite, so after figuring out the peculiarities (and writing some very nice generic code to run everything in the background), that part could be considered to be done. ");

        addSubHeader("Manipulating images with pointers");
        addFormattedParagraph("There were multiple aspects requiring image manipulation, all of which I took over, once again owing to my experience from university. What I hadn't learned in university however, was having to use pointers to directly manipulate memory to do the things I want. To manipulate the pixels of a bitmap in WPF, one must get its [BackBuffer](https://learn.microsoft.com/en-us/dotnet/api/system.windows.media.imaging.writeablebitmap.backbuffer?view=windowsdesktop-8.0) and read or write bytes directly. ");
        addCodeBlock(`try {
    bitmap.Lock();
    unsafe {
        for (int y = 0; y < bitmap.PixelHeight; y++) {
            var rowPointer = bitmap.BackBuffer + (y * bitmap.BackBufferStride);
            for (int x = 0; x < bitmap.PixelWidth; x++) {
                // assuming this is a 24bpp color image
                var r = *(byte*)(rowPointer + (3 * x));
                var g = *(byte*)(rowPointer + (3 * x) + 1);
                var b = *(byte*)(rowPointer + (3 * x) + 2);
                // do something here
            }
        }
    }
    bitmap.AddDirtyRect(new System.Windows.Int32Rect(0, 0, target.PixelWidth, target.PixelHeight));
} finally {
    bitmap.Unlock();
}`);
        addFormattedParagraph("I wrote several algorithms for text removal. When using the automatic page-processing, we get a black and white text-mask from the text detector, but the mask can also be drawn manually. For maximum efficiency, this mask is actually a binary image, which unfortunately also means that it has 0.125 bytes per pixel, since each byte contains the values for eight pixels. Getting these pixel values also required some bitshifting and binary operators in addition to the pointers, but once again, this wasn't my first time writing such code, so except for the occasional off-by-one error it was mainly a mental exercise. ");
        addFormattedParagraph("In the end, I had greatly simplified the process of writing code for manipulating images, so when we decided that the 1-pixel dilation of the text mask we got from the text detector wasn't quite enough, it only took me a few minutes to cook up my own dilation code. ");
        addCodeBlock(`public static void Dilate (WriteableBitmap bitmap, int amount) {
    if (amount < 1) {
        return;
    }
    VerifyIsBinaryAndThrowIfNot(bitmap);
    var brush = new Brush((2 * amount) + 1);
    var mask = InpaintingUtils.BinaryMaskToBoolArray(bitmap, out _);
    var w = bitmap.PixelWidth;
    var h = bitmap.PixelHeight;
    try {
        bitmap.Lock();
        for (int y = 0; y < h; y++) {
            for (int x = 0; x < w; x++) {
                var pos = (y * w) + x;
                if (mask[pos]) {
                    brush.SetPixelsAtPositionWithoutApplyingDirty(bitmap, x, y, true, out _);
                }
            }
        }
        bitmap.AddDirtyRect(new Int32Rect(0, 0, w, h));
    } finally {
        bitmap.Unlock();
    }
}`);

        addSubHeader("Ending the project");
        addFormattedParagraph("As the two-month period drew to a close, we had not just reached the set goal but exceeded what was expected of us. We had spent the preceding days fixing various bugs and polishing the prototype as much as possible, but unfortunately, there was no funding at the time to continue working on it. ");
    }
});