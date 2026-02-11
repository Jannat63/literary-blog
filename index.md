---
layout: layout.njk
title: Home
---

<div class="hero">
  <h1>Where Words Breathe Quietly.</h1>
  <p>A curated collection of poems, stories, and reflections written with calm and clarity.</p>
</div>

<div class="grid">
{% for poem in collections.poems | reverse | slice(0,3) %}
  <div class="card">
    <h2>
      <a href="{{ poem.url }}">{{ poem.data.title }}</a>
    </h2>
    <p>{{ poem.templateContent | striptags | truncate(120) }}</p>
  </div>
{% endfor %}
</div>
