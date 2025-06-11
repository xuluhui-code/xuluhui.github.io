import { a as getSortedPosts, s as siteConfig } from './content-utils_onHVu7ur.mjs';
import rss from '@astrojs/rss';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const parser = new MarkdownIt();
async function GET(context) {
  const blog = await getSortedPosts();
  return rss({
    title: siteConfig.title,
    description: siteConfig.subtitle,
    site: context.site ?? "https://fuwari.vercel.app",
    items: blog.map((post) => {
      const content = typeof post.body === "string" ? post.body : String(post.body || "");
      return {
        title: post.data.title,
        pubDate: post.data.published,
        description: post.data.description || "",
        link: `/posts/${post.slug}/`,
        content: sanitizeHtml(parser.render(content), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"])
        })
      };
    }),
    customData: `<language>${siteConfig.lang}</language>`
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
