---
layout: post
title:  "Fastq Quality Chart"
date:   2020-09-12
categories: blogs
description: "A simple tool to plot quality scores of a single fastq line"
tags: [fastq, quality value, plots]
---

### Single Line Fastq Quality Chart


  <p style="height:0;">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="https://www.gstatic.com/charts/loader.js"></script>
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
  <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
  <script src="/assets/scripts/fastq_quality.js"></script>

  <strong>
    This tool lets you quickly draw a plot of the quality of the a single fastq record that is pasted in the text area.
  </strong>

  <div class="mdl-grid">

  <div class="mdl-cell--8-col">
  <form>
  <label for="fastq_txt"> Input text</label><br/>
  <textarea id="fastq_txt" cols="100" rows="10">
@test1
GAATTACGAGGTGCTGGCCCAGGGCGGGCAGCGGCCCTGCCTCCTACCCTTGCGCCTCATGACCAGCTTGTTGAAGAGATCCGACATCAAGTGCCCACCTTGGCTCGTGGCTCCTGTCTCTTATACACATCTGACGCTGCCGACGAT
+
AAAAAEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE6EEEEEEEEEAEEAEEEEEEEEEEEEEEEEEEEAEEEEEEEEEEEEEEEEA/EEEEEEEEEEEEEEEE<EEEEAEEAEEEAEEEEEEE<EEEEEEEE/EEEA
  </textarea>
  <br/>
  <button id="draw_plot_btn" type="button">Draw Plot</button>
  </form>
  </div>
  <div class="mdl-layout-spacer"></div>
  
  <div id="chart_div" class="mdl-cell--6-col">
  </div>

  <div id="ascii_code_div" class="mdl-cell--6-col">
    The quality value of the corresponding record is given in the table below for your convenience of sorting the bases and sorting based on quality.
    <table id="ascii_code" class="display">
         <thead>
           <tr>
             <th>Pos</th>
             <th>Qual</th>
            </tr>
          </thead>
        </table>
      </div>
      
      

  </div>