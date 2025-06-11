import './_page_.c3ff9ba7_BsMnO5lP.mjs';
import { c as createComponent, a as renderComponent, r as renderTemplate } from './astro/server_BWQ42mf1.mjs';
import 'kleur/colors';
import { a as getSortedPosts, i as i18n, I as I18nKey } from './content-utils_onHVu7ur.mjs';
import { $ as $$MainGridLayout } from './MainGridLayout_Cinn_tsx.mjs';

const $$Archive = createComponent(async ($$result, $$props, $$slots) => {
  const sortedPosts = await getSortedPosts();
  return renderTemplate`${renderComponent($$result, "MainGridLayout", $$MainGridLayout, { "title": i18n(I18nKey.archive) }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ArchivePanel", null, { "sortedPosts": sortedPosts, "client:only": "svelte", "client:component-hydration": "only", "client:component-path": "@components/ArchivePanel.svelte", "client:component-export": "default" })} ` })}`;
}, "/workspaces/xuluhui.github.io/src/pages/archive.astro", void 0);

const $$file = "/workspaces/xuluhui.github.io/src/pages/archive.astro";
const $$url = "/archive/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Archive,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _ };
