import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderComponent, r as renderTemplate } from './astro/server_BWQ42mf1.mjs';
import 'kleur/colors';
import { a as $$Icon } from './MainGridLayout_Cinn_tsx.mjs';
import { i as i18n, p as profileConfig, l as licenseConfig, I as I18nKey } from './content-utils_onHVu7ur.mjs';
import { formatDateToYYYYMMDD } from './date-utils_OyTxlY41.mjs';

const $$Astro = createAstro("https://xuluhui-code.github.io/xuluhui-code.github.io/");
const $$License = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$License;
  const { title, pubDate } = Astro2.props;
  const className = Astro2.props.class;
  const profileConf = profileConfig;
  const licenseConf = licenseConfig;
  const postUrl = decodeURIComponent(Astro2.url.toString());
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`relative transition overflow-hidden bg-[var(--license-block-bg)] py-5 px-6 ${className}`, "class")}> <div class="transition font-bold text-black/75 dark:text-white/75"> ${title} </div> <a${addAttribute(postUrl, "href")} class="link text-[var(--primary)]"> ${postUrl} </a> <div class="flex gap-6 mt-2"> <div> <div class="transition text-black/30 dark:text-white/30 text-sm">${i18n(I18nKey.author)}</div> <div class="transition text-black/75 dark:text-white/75 line-clamp-2">${profileConf.name}</div> </div> <div> <div class="transition text-black/30 dark:text-white/30 text-sm">${i18n(I18nKey.publishedAt)}</div> <div class="transition text-black/75 dark:text-white/75 line-clamp-2">${formatDateToYYYYMMDD(pubDate)}</div> </div> <div> <div class="transition text-black/30 dark:text-white/30 text-sm">${i18n(I18nKey.license)}</div> <a${addAttribute(licenseConf.url, "href")} target="_blank" class="link text-[var(--primary)] line-clamp-2">${licenseConf.name}</a> </div> </div> ${renderComponent($$result, "Icon", $$Icon, { "name": "fa6-brands:creative-commons", "class": "transition text-[15rem] absolute pointer-events-none right-6 top-1/2 -translate-y-1/2 text-black/5 dark:text-white/5" })} </div>`;
}, "/workspaces/xuluhui.github.io/src/components/misc/License.astro", void 0);

export { $$License as default };
