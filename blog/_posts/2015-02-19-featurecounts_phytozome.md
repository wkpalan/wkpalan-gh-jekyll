---
layout: post
title:  "Using featureCounts with Phytozome gff3"
date:   2015-2-19
description: "A simple way to using featureCounts with Phytozome gff3 file. There are several quirks with the gff3 from phytozome"
tags: [qTeller, FPKM, download data]
---


<p>
	I have been working with genomes of photosynthetic in a number of different projects from the start of my graduate studies. We those few of us who are interested and invested in plant genomics and bioinformatics know what a valuable resource Phytozome is. <a href="http://phytozome.jgi.doe.gov/pz/portal.html"><strong>Phytozome</strong></a> is a resource maintained by the <strong title="Joint Genome Institute"><a href="http://jgi.doe.gov/">JGI</a></strong>. It contains data from 47 different species and 50 genome assemblies (Some species have more than one genome assembly). For some of the species such as <i>Chlamydomonas</i>, genome assemblies are exclusively released through Phytozome.
</p>
<p>
When I was working on a project with<i>Chlamydomonas reinhardtii</i> genome, I needed to align some RNA-seq data to the genome and count the number of reads that were aligned to each <strong>transcript</strong>. The newer version of Phytozome (v10.1), is especially great and fast for downloading the essential files for RNA-seq analysis.
	<ul>
		<li>The genome sequence to align the reads to</li>
		<li>The GFF3 file which allows us to identify the transcripts and their components</li>
	</ul>
</p>
<p>
I downloaded the genome sequence and aligned the reads use GSNAP, which is an aligner of personal preference, because of previous experience in using it and optimizing it for different projects. This part was quick and painless.
</p>
<p>
The next step was to count the number of reads that are aligned to each transcript. This is where things get a little tricky. There are a couple of programs out there to count the number of reads aligned to each transcript. <a href="http://www-huber.embl.de/HTSeq/doc/overview.html">HTSeq</a> which is based on Python, and <a href="http://bioinf.wehi.edu.au/featureCounts/">featureCounts</a> which is part of the <a href="http://subread.sourceforge.net/">subread</a> aligner package. There might be more, but I have not used them. I have used HTSeq for a couple of past projects, and it works well, but it is relatively slow. The large number of files I had for this project necessitated that I use a program that is fast, an2d featureCounts package fit the bill for that. featureCounts is written in C and also has the capability to multithread read counting. It can also summarize multiple bam files at the same time.
</p>
<p>
When I tried to use the GFF3 file I downloaded from Phytozome, I ran into some issues. Both the read counting programs use a very simple aggregation method to count the number of reads mapped to a gene. A small example of the contents of a GFF3 file is given below.
</p>
<pre>
##gff-version 3
##annot-version v5.52
chr_1	phytozomev10	gene	18766	20237	0	+	0	ID=Cre01.g000017.v5.5;Name=Cre01.g000017
chr_1	phytozomev10	mRNA	18766	20237	0	+	0	ID=Cre01.g000017.t1.1.v5.5;Name=Cre01.g000017.t1.1;pacid=30789166;longest=1;Parent=Cre01.g000017.v5.5
chr_1	phytozomev10	five_prime_UTR	18766	19162	0	+	0	ID=Cre01.g000017.t1.1.v5.5.five_prime_UTR.1;Parent=Cre01.g000017.t1.1.v5.5;pacid=30789166
chr_1	phytozomev10	CDS	19163	19178	0	+	0	ID=Cre01.g000017.t1.1.v5.5.CDS.1;Parent=Cre01.g000017.t1.1.v5.5;pacid=30789166
chr_1	phytozomev10	CDS	19329	19948	0	+	2	ID=Cre01.g000017.t1.1.v5.5.CDS.2;Parent=Cre01.g000017.t1.1.v5.5;pacid=30789166
chr_1	phytozomev10	three_prime_UTR	19949	20237	0	+	0	ID=Cre01.g000017.t1.1.v5.5.three_prime_UTR.1;Parent=Cre01.g000017.t1.1.v5.5;pacid=30789166
</pre>
<p>
For each gene there are multiple lines indicating the presence of the following features. GFF3 allows only one feature per line.
</p>
<ul>
	<li>transcripts (mRNA)</li>
	<li>Untranslated regions (five_prime_UTR,three_prime_UTR)</li>
	<li>Coding Sequences (CDS)</li>
</ul>

A notable omission is the absence of <strong>exon</strong>, which is an different feature type than the features that were mentioned above.  Both the read counting programs primarily use exons as the desired feature type for read counting. GFF3 from Phytozome is follows the rules mentioned at <a href="http://www.sequenceontology.org/gff3.shtml" >sequenceontology.org</a>, but does not make read counting straightforward with downloaded Phytozome GFF3 file. The GFF3 format is not directly supported by the read counting programs, so we need to add the exon attribute to the Phytozome gff3 file to get the read counting done easily. We can easily add the exons to the phytozome gff3 using the gffread program from cufflinks package. This adds the exon attribute missing from the Phytozome gff3. Below is an example after coverting the file through gffread.
<pre>
# gffread chlamy_v5-5.gff3 -o chlamy_v5-5.fc.gff3 -O
##gff-version 3
chr_1	phytozomev10	gene	18766	20237	.	+	.	ID=Cre01.g000017.v5.5;geneID=Cre01.g000017.v5.5;gene_name=Cre01.g000017
chr_1	phytozomev10	mRNA	18766	20237	.	+	.	ID=Cre01.g000017.t1.1.v5.5;Parent=Cre01.g000017.v5.5;geneID=Cre01.g000017.v5.5;gene_name=Cre01.g000017
chr_1	phytozomev10	exon	18766	19178	.	+	.	Parent=Cre01.g000017.t1.1.v5.5
chr_1	phytozomev10	exon	19329	20237	.	+	.	Parent=Cre01.g000017.t1.1.v5.5
chr_1	phytozomev10	CDS	19163	19178	.	+	0	Parent=Cre01.g000017.t1.1.v5.5
chr_1	phytozomev10	CDS	19329	19948	.	+	2	Parent=Cre01.g000017.t1.1.v5.5
</pre>

<p>
	Here we can see that exon attributes have been added and these have coordinates which overlap the closest UTRs and CDS regions together. This makes it easier to count the number of reads using HTSeq and featureCounts. The commands are given below.
</p>

```bash
#Convert the Phytozome gff3 to featureCounts compatible gff3 -o parameter defines the output file, and -O parameter tells the program to output non transcript feature types.
gffread sample.gff3 -o sample.fc.gff3 -O

#count the reads aligned to each transcript "-g Parent" parameter is essential to aggregate the read count per transcript otherwise program will stop with an error
featureCounts -a sample.gff3 -o sample.counts -g Parent  sample.bam
```

<h3>Update</h3>
<p>
	I have found this to be slightly incorrect when working with multiple transcripts for a gene which have overlapping introns. Then featureCounts does not count the reads correctly and assigns exons shared by multiple transcripts as ambiguous. You can use the -O option to allow fragements/reads aligned to overlapping meta-features to be counted correctly.
</p>

```bash
#count the reads aligned to each transcript "-g Parent" parameter is essential to aggregate the read count per transcript otherwise program will stop with an error
featureCounts -a sample.gff3 -O -o sample.counts -g Parent  sample.bam
````

<p>
	The gff3 output (e.g. sample.fc.gff3) can be used directly by either program mentioned above for read counting. The flip side is that the read count will be done per transcript instead of counting the reads per gene. The proportion of genes which have more than one transcript vary from species to species. For example this number in latest Chlamydomonas genome release is ~8 %. Depending on the level of accuracy and the question asked there can be multiple ways to summarize the counts per gene. We will explore these different avenues in forthcoming posts.
</p>
