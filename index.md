---
layout: layout.njk
title: Home
---

<section class="hero container">
  <div class="hero-text">
    <h2>A Quiet Space for Words & Thoughts</h2>
    <p>
      I write poetry, stories, and reflections inspired by life, silence,
      and the beauty hidden in everyday moments.
    </p>
    <a href="/poems/" class="btn">Read My Poems</a>
  </div>

  <div class="hero-image">
    <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba" alt="Writing desk">
  </div>
</section>


<section class="latest container">
  <h2 class="section-title">Latest Posts</h2>

  <div class="post-grid">
    {% for post in collections.poems | reverse | slice: 0,6 %}
      <div class="post-card">
        <h3>
          <a href="{{ post.url }}">{{ post.data.title }}</a>
        </h3>
        <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
        <p class="excerpt">
          {{ post.templateContent | truncate: 140 }}
        </p>
        <a href="{{ post.url }}" class="read-more">Read More →</a>
      </div>
    {% endfor %}
  </div>
</section>
