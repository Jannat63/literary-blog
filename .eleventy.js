module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addCollection("poems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/poems/*.md");
  });

  eleventyConfig.addCollection("stories", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/stories/*.md");
  });

  eleventyConfig.addCollection("books", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/books/*.md");
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
