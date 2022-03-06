# Submitting a MicroBlocks Activity

We welcome high-quality activity submissions from the MicroBlocks community.

Please email us the [Markdown](https://www.markdownguide.org/basic-syntax/) file containing
your activity, plus the activity meta data and any images or other supporting files at:

`interest (at) microblocks (dot) fun`

We may reject activities that we feel are not a good match for the MicroBlocks community, do not follow our formatting or presentation conventions, duplicate existing activites,
or for other reasons. Feel free to check with us at the above email before writing a new
activity.

## Markdown Formatting

Here is how to format your Markdown files.

### Titles

Titles should use level 3 headings (i.e. `### Introduction`).

Sections should use level 4 headings (i.e. `#### Step 1`).

You can also use headings levels 5 and up.

**Note:** Do not use heading levels 1 and 2. Those are reserved for other content on the activities page.

### Images

Always use relative paths to your images (i.e. `![An Image](image.png)` rather than `![An Image](/some/directory/image.png)`.

If an image needs a caption, add a Markdown title attribute in double quotes like this:

`![An Image](image.png "This is the caption and will show up as a caption")`

### Notes, Tips and Warnings

Our markdown parser can render three types of notices. Here's how to use them:

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

Notice you can also use level 3 and 4 headings inside your notices.
Level 4 is reserved for the notice type (i.e. FUN FACT),
while level 3 is reserved for the notice title (i.e. Dealing With Electricity).

## Teacher's Guide

If your activity includes a teacher's guide, please write it in Markdown as well, using the same formatting conventions used for the activity content.

## Activity Card

If your activity includes a student-facing activity card designed to be printed, please send us the PDF file. Such cards are typically created using Google Slides, which allows one to do precise page layout.

**Optional activity card source:** If you want others to be able to translate your activity card, please provide a URL to the source file, ideally a Google Slides document.

## Activity Metadata

Here is the metadata we need for each activity:

* **Title:** The title of your activity, in the language the activity is written in.
* **Author:** The name of the author, a person or organization.
* **Level:** Whether the activity is for beginners (1) or for experienced users (2).
* **Boards:** Which board(s) the activity is meant for.
* **Components:** Any external components the activity requires such as servos, LEDs, relays, etc.
* **Time:** A lower and upper estimate of how much time it will take the average student to complete the activity, i.e. 60 to 90 minutes.
* **Topics:** A list of topics the activity covers, such as art, music, history, cryptography, etc.

The metadata is used by the activities filtering system.
