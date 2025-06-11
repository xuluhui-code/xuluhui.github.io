import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_BWQ42mf1.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<section><h1 id=\"about\">About<a class=\"anchor\" href=\"#about\"><span class=\"anchor-icon\" data-pagefind-ignore=\"\">#</span></a></h1><!-- This is the demo site for [Fuwari](https://github.com/xuluhui-code/fuwari). --><p>This is the blog for xuluhui.</p><a id=\"GCwcodot-card\" class=\"card-github fetch-waiting no-styling\" href=\"https://github.com/xuluhui-code/fuwari\" target=\"_blank\" repo=\"xuluhui-code/fuwari\"><div class=\"gc-titlebar\"><div class=\"gc-titlebar-left\"><div class=\"gc-owner\"><div id=\"GCwcodot-avatar\" class=\"gc-avatar\"></div><div class=\"gc-user\">xuluhui-code</div></div><div class=\"gc-divider\">/</div><div class=\"gc-repo\">fuwari</div></div><div class=\"github-logo\"></div></div><div id=\"GCwcodot-description\" class=\"gc-description\">Waiting for api.github.com...</div><div class=\"gc-infobar\"><div id=\"GCwcodot-stars\" class=\"gc-stars\">00K</div><div id=\"GCwcodot-forks\" class=\"gc-forks\">0K</div><div id=\"GCwcodot-license\" class=\"gc-license\">0K</div><span id=\"GCwcodot-language\" class=\"gc-language\">Waiting...</span></div><script id=\"GCwcodot-script\" type=\"text/javascript\" defer>\n      fetch('https://api.github.com/repos/xuluhui-code/fuwari', { referrerPolicy: \"no-referrer\" }).then(response => response.json()).then(data => {\n        document.getElementById('GCwcodot-description').innerText = data.description?.replace(/:[a-zA-Z0-9_]+:/g, '') || \"Description not set\";\n        document.getElementById('GCwcodot-language').innerText = data.language;\n        document.getElementById('GCwcodot-forks').innerText = Intl.NumberFormat('en-us', { notation: \"compact\", maximumFractionDigits: 1 }).format(data.forks).replaceAll(\" \", '');\n        document.getElementById('GCwcodot-stars').innerText = Intl.NumberFormat('en-us', { notation: \"compact\", maximumFractionDigits: 1 }).format(data.stargazers_count).replaceAll(\" \", '');\n        const avatarEl = document.getElementById('GCwcodot-avatar');\n        avatarEl.style.backgroundImage = 'url(' + data.owner.avatar_url + ')';\n        avatarEl.style.backgroundColor = 'transparent';\n        document.getElementById('GCwcodot-license').innerText = data.license?.spdx_id || \"no-license\";\n        document.getElementById('GCwcodot-card').classList.remove(\"fetch-waiting\");\n        console.log(\"[GITHUB-CARD] Loaded card for xuluhui-code/fuwari | GCwcodot.\")\n      }).catch(err => {\n        const c = document.getElementById('GCwcodot-card');\n        c?.classList.add(\"fetch-error\");\n        console.warn(\"[GITHUB-CARD] (Error) Loading card for xuluhui-code/fuwari | GCwcodot.\")\n      })\n    </script></a><!-- > ### Sources of images used in this site\n>\n> - [Unsplash](https://unsplash.com/)\n> - [星と少女](https://www.pixiv.net/artworks/108916539) by [Stella](https://www.pixiv.net/users/93273965)\n> - [Rabbit - v1.4 Showcase](https://civitai.com/posts/586908) by [Rabbit_YourMajesty](https://civitai.com/user/Rabbit_YourMajesty) --></section>";

				const frontmatter = {"minutes":1,"words":46,"excerpt":"This is the blog for xuluhui."};
				const file = "/workspaces/xuluhui.github.io/src/content/spec/about.md";
				const url = undefined;

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html())}`;
				});

export { Content, Content as default, file, frontmatter, url };
