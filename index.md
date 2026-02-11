---
layout: layout.njk
title: Home
---

<div class="hero">
  <h1>Where Words Breathe Quietly.</h1>
  <p>A curated collection of poems, stories, and reflections written with calm and clarity.</p>
</div>

<div class="grid">
{% for poem in collections.poems %}
  <div class="card">
    <h2>
      <a href="{{ poem.url }}">{{ poem.data.title }}</a>
    </h2>
    <p>{{ poem.data.title }}</p>
  </div>
{% endfor %}
</div>
