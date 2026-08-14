---
layout: default
title: Publications
permalink: /publications/
---

## Publications

<div class="mdl-grid">
	{% bibliography --query @article|@mastersthesis|@phdthesis|@unpublished %}
</div>

## Patents

<div class="mdl-grid">
	{% bibliography --query @misc[type=patent]|@patent %}
</div>

