'use strict';

registerPage("bachelorProject", {
    title: "My Bachelor Project",
    miniDescription: "A Unity application for learning the basics of computer graphics interactively",
    year: 2020,
    numberInYear: 1,
    subfolderName: "bachelorProject",
    backgroundImageName: "bachelorProject_thumbnail.png",
    createElements: () => {
        addVideo(
            {fileName: "Overview Cgbasics-1.webm", altText: "Overview showing some of the features of my program"},
            "A Video showing some of the features of the application"
        );
        addFormattedParagraph("After my [internship at Rain](#mesmer), I only had to write my thesis to finish my bachelor's degree. Owing to the extensive experience I had gathered doing UI programming and my interest in computer graphics in general, I decided to create an application teaching some of the fundamentals of computer graphics. ");

        addProjectInfo({
            "Project Type": "Unity Application",
            "Team Size": "Solo",
            "Project Duration": "November 2019 - March 2020",
            "Project Purpose": "University - Bachelor Thesis",
            "Key Aspects": [
                "Unity UI",
                "Computer Graphics",
                "Text Parsing",
                "Education"
            ],
            "Tech Used": [
                "Unity 2018.4.24f1"
            ],
            "Repository": "[CGBasics \\(github.com\\)](https://github.com/maxlinke/CGBasics)",
        });

        addSubHeader("Inspiration");
        addImage(
            {fileName: "cam_trans_demo.png", altText: "A screenshot WebGL-app showing camera transformations" },
            "The web-app that inspired me to make my own improved version in Unity"
        );
        addFormattedParagraph("During my bachelor, a professor had used [an interactive WebGL-application](https://cs1230.graphics/demos/camera/) to visually show the various matrix transformations required to render an object. While neat, it doesn't go into detail as to what is actually happening. This is what I wanted to address with my application, not just showing that the transformation from object-space to clip-space consists of distinct steps, but also the maths behind all of it. ");

        addSubHeader("A Unity-app that's 90% UI");
        addImage(
            { fileName: "uimatrix_5_instance.png", altText: "A matrix-gameobject" },
            "An initialized matrix-instance during runtime"
        );
        addFormattedParagraph("To new users, using [RectTransforms](https://docs.unity3d.com/ScriptReference/RectTransform.html) to properly position UI-elements is a challenge. However, after doing much of the UI for [Mesmer](#mesmer), I had acquired knowledge and confidence, letting me work without much trouble. The layout is done without any Layout Groups, as they weigh quite heavily on the runtime performance, and are evidently not needed. The matrix-prefab is quite barren actually, with most of the buttons, labels and input fields being created as required at runtime. ");
        addFormattedParagraph("The program has more UI than just those matrices however, and all that's done at runtime as well. I even made icons for the many buttons controlling various aspects of the program, be it switchting between OpenGL- and DirectX-style matrices, drawing the models in wireframe and a whole host of other options. ");

        addSubHeader("Allowing for custom matrices");
        addImage(
            { fileName: "app_matrixscreen_fieldeditor.png", altText: "The expression behind a field of a matrix" },
            "The expression behind a field of a matrix"
        );
        addFormattedParagraph("The matrices aren't actually just elaborate visualizations of Matrix4x4-instances, no, each field contains an expression that is evaluated each frame to construct the actual matrix that is then passed on to render the views. To make that work, I had to write a parser taking in text and either putting out a number or an error. ");
        addFormattedParagraph("Numbers and operators as well as functions and variables are all valid arguments in expressions behind matrix fields. To reduce the guesswork on behalf of the users, all functions and variables are listed and can be added into the expression via a click. Since clicking a button shifts focus away from the input field above, replacing the selection was somewhat tricky to implement, but worth it, as that is the expected user-experience. One last-minute addition was the function \"time()\", which allows for animated matrices, as opposed to those which only change upon the user changing variables or moving the camera. ");

        addSubHeader("Comparing lighting algorithms");
        addImage(
            { fileName: "brdf_brown_full.png", altText: "A slide showing visualizations of BRDF intensities" },
            "The inspiration for the intensity-graph, unfortunately the slide is no longer available online"
        );
        addFormattedParagraph("While understanding the matrix operations involved in rendering objects is cool, I really enjoy writing shaders to achieve interesting results. Technically, lighting is one such effect, as it's all just approximations of what real light actually does with real materials. Take for instance just the diffuse component, lambertian lighting is not wrong, it accurately describes the intensity of light reflected evenly in all directions given the light vector and the surface normal, but completely leaves out surface roughness. The [Oren-Nayar Model](https://en.wikipedia.org/wiki/Oren%E2%80%93Nayar_reflectance_model) on the other hand does take roughness into account and looks completely different. In addition to just showing the forumulas and rendering an object with the selected lighting models, I also added a graph visualizing the light distribution as a radial plot. Once again, this was inspired by something I saw in a lecture at university, but the source isn't available online anymore. ");
        addImages([
                {fileName: "intensity_graph.png", thumbnailName: "intensity_graph_s.png", altText: "Intensity graph showing intensity based on lighting angle, surface normal (both shown) and view direction (radial coordinate of graph)" },
                {fileName: "intensity_render.png", thumbnailName: "intensity_render_s.png", altText: "The same distribution as in the graph, but visible on an actual rendered object" },
            ],
            "A circular base distribution from lambertian diffuse lighting and a clipping phong-highlight"
        );
        addFormattedParagraph("The graph is actually implemented as an image-effect shader, using the same functions as the shader rendering the object, so they can be compared one to one. It evauluates the lighting function per pixel, thus always generating a perfectly detailed graph. The circles can be used as a refence for the intensity. Everything beyond the first thick line would be clipped as pure white, but the graph shows the true values. The indicators for the surface normal and light direction (taken from the viewport) are drawn as UI-element overlays. ");

        addSubHeader("Making a WebGL-Version");
        addImage(
            { fileName: "app_webgl_orig_3.png", altText: "A broken intensity graph and viewport in WebGL" },
            "Both the intensity graph and viewport are broken in WebGL"
        );
        addFormattedParagraph("The default export-option of Unity is of course an executable, but due to its multi-platform nature, one can also have Unity create a WebGL-build. Unfortunately, since the rendering in this application deviates very heavily from Unity's builtin renderer and uses a lot of shader effects, this wasn't without issues. I did manage to make at least the matrix screen work and you can try it out right now in [this online demo](https://maxlinke.github.io/matrices.html), but the lighting screen just refused to work. With WebGL-builds taking several minutes and offering very little insight into what is actually broken, I decided to cut my losses and leave it as is. I used a nice [WebGL-template](https://github.com/greggman/better-unity-webgl-template) to get a fullscreen application working out of the box as opposed to the standard small web player.");
    }
});