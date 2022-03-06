# Writing an Activity

## File System Structure

Copy the "sample" directory, renaming it to something similar to your activity
title, replacing spaces with dashes, and removing other special characters.

## Metadata

Each activity is described by a top-level metadata file named `meta.json`.
The possible fields are:

* **draft:**            Set to true to have the site builder ignore this activity
                        at compile time. Remove this field or set to false to deploy.

* **author:**           Who wrote the activity.
                        For example, "MicroBlocks" for cards created by the MicroBlocks team.

* **level:**            Either `lvl_1` (beginner) or `lvl_2` (experienced).

* **boards:**           An array of board keys for which this activity was designed.
                        The list of board keys is in data/json/boards.json.

* **time:**             Lower and upper boundary for how many minutes it should
                        take to complete the activity, in a JSON array.
                        Example: `[ 90, 120 ]`  becomes `90 to 120 minutes`

* **topics:**           An array of topic keys that match this activity.
                        Topic keys can be found and added at locales/*/global.json.

* **components:**       An array of component keys for external components needed.
                        Component keys can be found and added at data/json/components.json.

* **card-url:**         URL to the activity card, if not hosted localy (see below).

* **card-slides-url:**  URL to the translatable Google Slides source of the activity card, if any.

* **video-url:**        URL to a video for the activity card, if any.

### Locale Metadata

Each locale subfolder for activity has its own `meta.json` file to provide information
specific for that locale. This file has one required field:

* **title:**            The localized title of this activity.

The locale metadata file can also override fields from the top-level `meta.json` file,
such as **card-url** and **card-slides-url**.

## Files

All files needed by an activity (e.g. images, PDF's, libraries,
projects, etc.) are stored the `files` directory for the activity.

### Locale Specific Files

Each locale subfolder may have its own files folder if needed.
Files in a locale's `files` filder override any files with the same names
from the top-level `files` folder for the activity.

### Thumbnail

The thumbnail for your activity should be named `thumbnail.png` and live in the
`files` directory. It should be at least 420 pixels wide and 240 pixels high.

### Activity Card

If you prefer to do so, you can host the activity card as a PDF file in the site
directly, instead of linking to an external URL.

Place activity-card.pdf in the `files` folder. You can have different
localized versions of the activity card in the `files` folders of each
locale, or a global one under the root `files` folder.

### Project File

You can provide a MicroBlocks project file for your activity. This
might contain all the code for the activity, or it might just be
a starting point that students can extend.

Place `project.ubp` in the `files` folder. You can have
different localized versions of the project file under the `files` folders of
each locale, or a global one under the root `files` folder.

### Teacher's Guide

You can provide a Teachers Guide for your activity, formatted in MarkDown.

Place `teachers-guide.md ` in the `files` folder. You can place
localized versions of the teachers guide in the `files` folder of
each locale.

## Locale Directories

Create directories for all the available languages for an activity inside of the `locales`
folder. These should be named after the two-letter ISO-631 code for each locale.

Provided with the sample activity is an `en` folder, for the English locale,
that you can also copy and rename for your other locales.

## Activity Contents

The activity content for each locale is read from the `index.md` file, formatted in MarkDown.
A teachers guide, when provided, is also formatted in Markdown in `teachers-guide.md `.

### Headings

Use the following section headings:

- *H3*: `### Section Title`
- *H4*: `#### Section Subtitle`

Headings *H5* and higher can also be used if needed.

**Note:** Heading H1 and H2 are reserved for other information on the activities page.

### Tips and Facts

Our implementation of MarkDown has an extention that lets us
define _fun facts_, _notes_ and _safety notes_. Here's how to use that feature:

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

The `h4` produces an uppercase coloured small title. The `h3` produces a standard black title.
They can be used individually or combined. When they used together, the `h4` must appear on top,
expressing the nature of the note ('fact', 'safety', etc.).

### Image Captions

Another MarkDown extention transforms image titles into captions, like this:

```
![Image alt text](image.png "Pretty image - CC-BY-SA Somebody")
```

> **Note:** To reference files from this markdown file, you'll need to prefix
> your path with `../`, since all files live in the root directory.
