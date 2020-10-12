---
layout: post
title:  "qTeller Data Download Tool"
date:   2015-2-23
tags: [qTeller, FPKM, download data]
description: "A simple bookmarklet that lets you download the data for qTeller exoression graph"
---

<script src="/assets/scripts/qteller.js"></script> 

**[https://qteller.maizegdb.org/](qTeller)** maintained by <a href="http://nature.berkeley.edu/freelinglab/" title="Freeling Lab" target="">Freeling Lab</a> is an excellent resource to take a quick look at some of the public expression datasets available for some plant species. It hosts gene expression datasets for five plant species, namely *Arabidopsis*, rice, maize, <i>Sorghum</i>, and moss. I use this tool often to take a quick look at the exspression of a gene or a set of genes to confirm or clarify the expression patterns.


Sometimes it is necessary to compare gene expression patterns of multiple genes, and there is no easy way to do that with qTeller. There is an option to download the gene expression data for the genes in a certain interval, but not all the genes I am interested in fall in the same interval. Sometimes the dataset I am interested in is not available to download with the interval tool. I have written a small [http://en.wikipedia.org/wiki/JavaScript](JavaScript) bookmarklet to aid with downloading the raw data of the graphs in the *Visualize Gene Expression* tool in qTeller.

A bookmarklet is a link which can be saved (dragged and dropped) on your bookmnarks bar (available in Chrome, Firefox, and Safari), and clikcing this bookmark allows you to run a JavaScript function on the page you are on. The data that is used to create the graphs are available on the page itself, and if you are computer savvy then you can parse out the data into csv form on your own. I merely present a more easier way to save the data into a Microsoft Excel or LibreOffice Calc compatible csv file. The downloaded file will contain the following columns, namely experiment,expression level,lower Limit of expression, and upper Limit of expression. These are values that are visible when you mouseover the graph on

#### Drag and drop the red link onto the bookmarks bar

<a href="javascript: var x = document.getElementsByName('points');var x_list = x[0].areas;var outList = [];for (var i = 0; i < x_list.length; i++) { var inStr = x_list[i].onmouseover.toString().split('\n');    var out1 = inStr[1].replace(/.*\('|[');]/gi, '');    var tmp = out1.split(',');    outList.push(tmp);} var data = 'Experiment,Paper,Tissue Prep,Expression,Lower Limit,Upper Limit\n';outList.forEach(function (infoArray, index) { dataString = infoArray.join(',');    data += index < outList.length ? dataString + '\n' : dataString;}); var pom = document.createElement('a');var csvContent = data;var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });var url = URL.createObjectURL(blob);pom.href = url;var y = document.getElementById('datacontainer');var file_title = String(document.title).toLowerCase();file_title += '.csv';file_title = file_title.replace(' ', '_');console.log(file_title);pom.setAttribute('download', file_title);document.body.appendChild(pom);pom.click();document.body.removeChild(pom);console.log(file_title);" title="Drag this onto your bookmarks toolbar to save the bookmarklet" style="padding:0; margin:0;font-size:24px;color:#FF0000;font-weight:1000;text-decoration:none;">qTeller Data</a>

<img style="border:thin solid; width:800px;" src="/assets/imgs/bookmarklet.png" title="A screen capture to showing dragging and dropping the bookmarklet onto chrome"/>

#### Downloading Qteller data using the bookmarklet

Once you navigate to the qTeller *Visualize Expression* page such as [this](https://qteller.maizegdb.org/bar_chart_B73v4.php?name=Zm00001d000002&info=), you can click on the bookmarklet to download the qTeller data as a csv file. The file name will be `qteller_maizegdb.csv`. You can search for a new gene and click the bookmarklet and it will download the data for the currently searched gene.




