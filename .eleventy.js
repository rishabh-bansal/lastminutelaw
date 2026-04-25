module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // Create subject pages from data
  eleventyConfig.addCollection("subjectPages", function(collectionApi) {
    const subjects = require("./_data/subjects.json");
    return Object.entries(subjects).map(([slug, data]) => ({
      slug,
      ...data
    }));
  });

  // Create individual paper pages from data
  eleventyConfig.addCollection("paperPages", function(collectionApi) {
    const papers = require("./_data/papers.json");
    const subjects = require("./_data/subjects.json");
    const pages = [];
    for (const [code, years] of Object.entries(papers)) {
      const subject = Object.values(subjects).find(s => s.code === code);
      if (!subject) continue;
      for (const [year, questions] of Object.entries(years)) {
        pages.push({
          code,
          year,
          questions,
          subject,
          slug: subject.id
        });
      }
    }
    return pages;
  });

  // Helper filters
  eleventyConfig.addFilter("json", (val) => JSON.stringify(val));
  eleventyConfig.addFilter("padStart", (val, len, char) => String(val).padStart(len || 2, char || '0'));
  eleventyConfig.addFilter("repeat", (str, n) => str.repeat(Math.max(0, n)));
  eleventyConfig.addFilter("min", (a, b) => Math.min(a, b));
  eleventyConfig.addFilter("max", (a, b) => Math.max(a, b));
  eleventyConfig.addFilter("sortByRepeats", (arr) => [...arr].sort((a, b) => b.repeats - a.repeats));
  eleventyConfig.addFilter("predictionLabel", (pct) => pct >= 85 ? 'HIGH' : pct >= 60 ? 'MEDIUM' : 'LOW');
  eleventyConfig.addFilter("difficultyDots", (d) => {
    const filled = Math.min(d, 5);
    const empty = Math.max(0, 5 - d);
    return '●'.repeat(filled) + '○'.repeat(empty);
  });

  eleventyConfig.addFilter("startsWith", (str, prefix) => typeof str === 'string' && str.startsWith(prefix));
  eleventyConfig.addFilter("replaceAll", (str, find, rep) => typeof str === 'string' ? str.split(find).join(rep || '') : str);
  eleventyConfig.addFilter("trimStr", (str) => typeof str === 'string' ? str.trim() : str);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "../_includes",
      data: "../_data"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk"
  };
};
