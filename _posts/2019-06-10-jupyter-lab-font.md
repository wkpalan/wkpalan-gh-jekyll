---
layout: post
title:  "Changing Jupyter Lab Font Size"
date:   2019-06-10
categories: blogs
tags: [jupyter lab, font size, font-size, jupyter lab settings]
description: "Setting to change the font size for Jupyter Lab"
---

### Changing Jupyter Lab Font Size

I have been recently using [Jupyter Lab](https://jupyterlab.readthedocs.io/en/stable/) for my various data science and bioinformatics analysis on the lab servers. It has been really useful to prototype a number of components that I have been developing for the [**GOMAP**](https://gomap-singularity.readthedocs.io/en/v1.3/) pipeline. I have been working on the move and inbetween chunks of my time after work on a 13" laptop. The high dpi on a small screen has made it difficult to edit the code at times. You can see an example of what it looks like below.

<img src="/assets/imgs/jupyter-lab-default-font.png/" style="width:800px">

I wish I had not gone down the google rabbit hole and actually checked where the settings were, but I spent a bunch of time reading old documentation and [github](https://www.github.com) issues to figure out how to change it. Even contemplated using a custom theme, but the settings are pretty easy to figure out, once you open the Advanced Settings Editor shown below.

<img src="/assets/imgs/jupyter-lab-settings.png/" style="width:800px">

There are two places that you would need to change to make the font same in all editor windows (Text Editor) and cells (Code Cell and Markdown Cell) in the Notebook. 

<img src="/assets/imgs/jupyter-lab-settings-editor.png/" style="width:800px">

Setting the custom font size in the **User Overrides** would enable the font size increase or decrease if you prefer. I wanted to increase the size so I pasted the following in the box for Notebook

    {    
        "codeCellConfig": {
            "fontSize": 16
        },
        "markdownCellConfig": {
            "fontSize": 16
        }
    }

I edited the content already in the *Text Editor* **User Override** to set the font size for the text editor. 

    {
        // Text Editor
        // @jupyterlab/fileeditor-extension:plugin
        // Text editor settings.
        // ***************************************

        // Editor Configuration
        // The configuration for all text editors.
        // If `fontFamily`, `fontSize` or `lineHeight` are `null`, values from
        // current theme are used.
        "editorConfig": {
        "fontFamily": null,
        "fontSize": 16,
        "lineHeight": null,
        "lineNumbers": true,
        "lineWrap": "on",
        "wordWrapColumn": 80,
        "readOnly": false,
        "tabSize": 4,
        "insertSpaces": false,
        "matchBrackets": true,
        "autoClosingBrackets": true
        }
    }

I played with the numbers till it was comfortable to work with. It's a *CSS* setting and the change is immediate, without even refreshing Notebook. It has been very useful for screen sharing calls to overcomes quality issues of the call when showing code or text on the screen.

<img src="/assets/imgs/jupyter-lab-font-16.png" style="width:800px">

Jupyter Lab has been an amazing tool to work and produce reproducible code for prototyping simple tools and worklows and share them quick. Thanks to the team that has put all the effort into making this tool available for the masses like me.