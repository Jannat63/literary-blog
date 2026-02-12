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


<section class="editorial">
  <div class="editorial-grid">

    {% assign posts = collections.poems | reverse %}

    <!-- FEATURED -->
    {% for post in posts limit:1 %}
    <div class="featured">
      <div class="overlay">
        <span class="category">Poem</span>
        <h2>
          <a href="{{ post.url }}">{{ post.data.title }}</a>
        </h2>
        <p class="meta">
          {{ post.date | date: "%B %d, %Y" }} · 3 min read
        </p>
        <a class="btn" href="{{ post.url }}">Read Story →</a>
      </div>
    </div>
    {% endfor %}

    <!-- SMALL POSTS -->
    <div class="side-posts">
      {% for post in posts offset:1 limit:4 %}
      <div class="card">
        <div class="card-image"></div>
        <div class="card-content">
          <span class="category small">Poem</span>
          <h3>
            <a href="{{ post.url }}">{{ post.data.title }}</a>
          </h3>
          <p class="meta">
            {{ post.date | date: "%B %d, %Y" }}
          </p>
          <a class="read-link" href="{{ post.url }}">Read →</a>
        </div>
      </div>
      {% endfor %}
    </div>

  </div>
</section>

