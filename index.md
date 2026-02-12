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

<section class="latest">
  <div class="container">

    <h2 class="section-title">Latest Writings</h2>

    {% assign posts = collections.poems | reverse %}

    <!-- Featured Post -->
    {% for post in posts limit:1 %}
    <div class="featured-post">
      <div class="featured-image"></div>
      <div class="featured-content">
        <span class="category-tag">Poem</span>
        <h2>
          <a href="{{ post.url }}">{{ post.data.title }}</a>
        </h2>
        <p class="meta">
          {{ post.date | date: "%B %d, %Y" }} · 3 min read
        </p>
        <p class="excerpt">
          {{ post.templateContent | truncate: 180 }}
        </p>
        <a class="read-more" href="{{ post.url }}">Read Full Story →</a>
      </div>
    </div>
    {% endfor %}

    <!-- Grid Posts -->
    <div class="post-grid">
      {% for post in posts offset:1 limit:3 %}
      <div class="post-card">
        <div class="card-image"></div>
        <span class="category-tag small">Poem</span>
        <h3>
          <a href="{{ post.url }}">{{ post.data.title }}</a>
        </h3>
        <p class="meta">
          {{ post.date | date: "%B %d, %Y" }} · 2 min read
        </p>
        <p class="excerpt">
          {{ post.templateContent | truncate: 120 }}
        </p>
        <a class="read-more" href="{{ post.url }}">Read More →</a>
      </div>
      {% endfor %}
    </div>

  </div>
</section>

