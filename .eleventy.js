const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addFilter("dateISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  eleventyConfig.addFilter("first", (arr, n) => arr.slice(0, n));

  eleventyConfig.addCollection("poems", function(collectionApi) {
    return collectionApi.getFilteredByTag("poems").sort((a, b) => a.date - b.date);
  });

  eleventyConfig.addCollection("stories", function(collectionApi) {
    return collectionApi.getFilteredByTag("stories").sort((a, b) => a.date - b.date);
  });

  eleventyConfig.addCollection("books", function(collectionApi) {
    return collectionApi.getFilteredByTag("books").sort((a, b) => a.date - b.date);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
