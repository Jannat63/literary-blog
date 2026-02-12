const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  /* -----------------------------
     Custom Date Filter (FIXES ERROR)
  ------------------------------ */
  eleventyConfig.addFilter("date", function (value, format = "MMMM dd, yyyy") {
    if (!value) return "";
    return DateTime.fromJSDate(value, { zone: "utc" }).toFormat(format);
  });

  /* -----------------------------
     Static / Passthrough Files
  ------------------------------ */
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("style.css");

  /* -----------------------------
     Poems Collection
  ------------------------------ */
  eleventyConfig.addCollection("poems", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/poems/*.md")
      .sort((a, b) => b.date - a.date);
  });

  /* -----------------------------
     Stories Collection
  ------------------------------ */
  eleventyConfig.addCollection("stories", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/stories/*.md")
      .sort((a, b) => b.date - a.date);
  });

  /* -----------------------------
     Books Collection
  ------------------------------ */
  eleventyConfig.addCollection("books", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/books/*.md")
      .sort((a, b) => b.date - a.date);
  });

  /* -----------------------------
     Eleventy Core Config
  ------------------------------ */
  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
