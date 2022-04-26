# Creating and Submitting a MicroBlocks Activity

We welcome high-quality activity submissions from the MicroBlocks community.

To submit an activity, please prepare a .zip file containing:

* the [Markdown](https://www.markdownguide.org/basic-syntax/) file for your activity (`index.md`)
* all images referenced by the Markdown file
* a thumbnail image for the activity (`thumbnail.jpg`)
* a metatdata JSON file for the activity (`metadata.json`)
* any additional files such as `teachers-guide.md` or `activity-card.pdf`

Send the zip file to:

`interest (at) microblocks (dot) fun`

We may reject activities that we feel are not a good match for the MicroBlocks community, do not follow our formatting or presentation conventions, duplicate existing activites, or for other reasons. Feel free to check with us via email before writing a new activity.

All MicroBlocks activities are shared under the Creative Commons Attribution-ShareAlike 4.0 International license.

## Markdown Formatting

The activity Markdown file should be named `index.md`.

Here is how to format the Markdown.

### Titles

Titles should use level 3 headings (i.e. `### Introduction`).

Sections should use level 4 headings (i.e. `#### Step 1`).

You can also use headings levels 5 and up.

**Note:** Do not use heading levels 1 and 2. Those levels are reserved for other content on the activities page.

### Images

Use simple file names (e.g. `![An Image](image.png)`) for your images and include the image files in the same folder as your Markdown file. It is best to avoid linking to images on other sites since those links could break in the future.

If an image needs a caption, add a Markdown title attribute in double quotes like this:

`![An Image](image.png "This is the caption and will show up as a caption")`

Non-script images can be scaled to a specific width like this:

`![](greenCircle.jpg =60x*)`

### Draggable Script Images

Script images created with the **save picture of script** or **save a picture of all scripts** commands in the MicroBlocks editor can be dragged to MicroBlocks running in a browser window to add them to a MicroBlocks project. That makes it easier for users to recreate the scripts when exploring the activity.

Script images should be saved at **printable (200%)** scale.

To use that scale, select **show advanced blocks** in the MicroBlocks gear menu, then right-click on the scripting area and select **set exported script scale**. The images will appear much too large in normal Markdown viewers but will be scaled down to the correct size when deployed on the website. Using printable resolution allows the scripts to look sharp and clear when printed.

### Notes, Tips and Warnings

Our markdown parser was extended to render three types of notices. Here's how to use them:

```
[[fact]]
Write your fact here
[[/fact]]

[[note]]
Write your generic note or tip here
[[/note]]

[[safety]]
#### SAFETY NOTE
### Be careful with the batteries
Write your safety note here
[[/safety]]
```

You can optionally add level 3 and 4 headings to your notices as shown in the safety note above. Level 4 is for the notice type (e.g. SAFETY NOTE), while level 3 is for the notice title (e.g. Be careful with the batteries).

Since these are custom extensions, they won't be recognized by your Markdown viewer, but they will render correctly when your markdown is deployed on the website.

Avoid other Markdown extensions and the use of HTML in the Markdown file.

## Activity Thumbnail

The activity thumbnail communicates visually what your activity is about.

The image should be in JPEG format with a 16:9 aspect ratio with a minimum size of 640x360 pixels.

The file should be named `thumbnail.jpg`.

## Teacher's Guide

If your activity includes a teacher's guide, write it in Markdown, using the formatting conventions above, and include it in the activity folder.

The file should be named `teachers-guide.md`.

## Activity Card

If your activity includes a student-facing activity card designed to be printed, please include the PDF file. Activity cards are typically created using Google Slides, which allows one to do precise page layout.

The file should be named `activity-card.pdf`.

**Optional activity card source:** If you want others to be able to translate or remix your activity card, please provide a URL to the source file in the metadata file, ideally a link to a Google Slides document.

## Activity Metadata

The metadata is used by the activities filtering system.

The file should be in [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) format with the following fields:

* **title:** The title of your activity, in the language the activity is written in.
* **author:** The name of the author or organization that created the activity.
* **level:** Whether the activity is for beginners (1) or for experienced users (2).
* **time:** A list containing a lower and upper estimate of how much time it will take the average student to complete the activity. For exmaple [ 60, 90] means 60 to 90 minutes.
* **boards:** A list of board(s) the activity is meant for.
* **components:** (optional) A list of external components the activity requires such as servos, LEDs, NeoPixels, etc.
* **topics:** (optional) A list of topics the activity covers, such as art, music, history, cryptography, etc.
* **card-slides-url** (optional) A link to the source file for the PDF activity card.

To create your metadata file, you can download and edit [this template](sample-metadata.json).

The file should be named `meta.json`.
