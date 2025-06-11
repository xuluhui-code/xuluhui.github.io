import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_BWQ42mf1.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///workspaces/xuluhui.github.io/","cacheDir":"file:///workspaces/xuluhui.github.io/node_modules/.astro/","outDir":"file:///workspaces/xuluhui.github.io/dist/","srcDir":"file:///workspaces/xuluhui.github.io/src/","publicDir":"file:///workspaces/xuluhui.github.io/public/","buildClientDir":"file:///workspaces/xuluhui.github.io/dist/client/","buildServerDir":"file:///workspaces/xuluhui.github.io/dist/server/","adapterName":"","routes":[{"file":"file:///workspaces/xuluhui.github.io/dist/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///workspaces/xuluhui.github.io/dist/archive/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/archive","isIndex":false,"type":"page","pattern":"^\\/archive\\/$","segments":[[{"content":"archive","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/archive.astro","pathname":"/archive","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///workspaces/xuluhui.github.io/dist/robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///workspaces/xuluhui.github.io/dist/rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}}],"site":"https://xuluhui-code.github.io/xuluhui-code.github.io/","base":"/","trailingSlash":"always","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/content/config.ts",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/components/misc/ImageWrapper.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/components/PostCard.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/components/PostPage.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/pages/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/components/widget/Profile.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/components/widget/SideBar.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/layouts/MainGridLayout.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/pages/archive.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/archive@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/utils/content-utils.ts",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/components/widget/Categories.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/components/widget/Tags.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/xuluhui.github.io/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/archive@_@astro":"pages/archive.astro.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"pages/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/[...page]@_@astro":"pages/_---page_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","/workspaces/xuluhui.github.io/src/plugins/remark-reading-time.mjs":"chunks/remark-reading-time_Curle1zU.mjs","/workspaces/xuluhui.github.io/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/workspaces/xuluhui.github.io/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","/workspaces/xuluhui.github.io/src/assets/images/avatar.jpg":"chunks/avatar_bxea_H9r.mjs","/workspaces/xuluhui.github.io/src/assets/images/demo-avatar.png":"chunks/demo-avatar_BRVsl6Qn.mjs","/workspaces/xuluhui.github.io/src/assets/images/demo-banner.png":"chunks/demo-banner_BO8p2rrv.mjs","/workspaces/xuluhui.github.io/src/assets/images/luogu-logo.png":"chunks/luogu-logo_DdfrZN1h.mjs","/workspaces/xuluhui.github.io/src/components/GlobalStyles.astro":"chunks/GlobalStyles_j1xxp5K1.mjs","/workspaces/xuluhui.github.io/src/components/LightDarkSwitch.svelte":"_astro/LightDarkSwitch.B3jvgqtZ.js","/workspaces/xuluhui.github.io/src/components/Search.svelte":"_astro/Search.DmKX5Reg.js","/workspaces/xuluhui.github.io/src/components/misc/Markdown.astro":"chunks/Markdown_iTYFso1F.mjs","/workspaces/xuluhui.github.io/src/components/misc/License.astro":"chunks/License_DsyBwm9i.mjs","/workspaces/xuluhui.github.io/src/components/PostMeta.astro":"chunks/PostMeta_C5LsBScU.mjs","/workspaces/xuluhui.github.io/src/utils/date-utils.ts":"chunks/date-utils_OyTxlY41.mjs","/workspaces/xuluhui.github.io/src/components/PostPage.astro":"chunks/PostPage_CrmmlsIZ.mjs","/workspaces/xuluhui.github.io/src/components/control/Pagination.astro":"chunks/Pagination_D-CnONKC.mjs","/workspaces/xuluhui.github.io/src/components/PostCard.astro":"chunks/PostCard_BkUoBsBF.mjs","/workspaces/xuluhui.github.io/src/components/widget/DisplaySettings.svelte":"_astro/DisplaySettings.DXpvfZ_-.js","/workspaces/xuluhui.github.io/src/utils/setting-utils.ts":"chunks/setting-utils_BHOn1Fvf.mjs","/workspaces/xuluhui.github.io/src/content/config.ts":"chunks/config_D00jkdZf.mjs","/workspaces/xuluhui.github.io/src/content/posts/DP_impove.md":"chunks/DP_impove_ClxfjBXA.mjs","/workspaces/xuluhui.github.io/src/content/posts/SGT.md":"chunks/SGT_CtqIBoqj.mjs","/workspaces/xuluhui.github.io/src/content/posts/Tree.md":"chunks/Tree_CJP4WSF_.mjs","/workspaces/xuluhui.github.io/src/content/posts/draft.md":"chunks/draft_B7ue0Fco.mjs","/workspaces/xuluhui.github.io/src/content/posts/expressive-code.md":"chunks/expressive-code_BcZjs2Bs.mjs","/workspaces/xuluhui.github.io/src/content/posts/guide/cover.jpeg":"chunks/cover_BJEOAxpS.mjs","/workspaces/xuluhui.github.io/src/content/posts/guide/index.md":"chunks/index_7VbY4P2h.mjs","/workspaces/xuluhui.github.io/src/content/posts/markdown-extended.md":"chunks/markdown-extended_vvyLl2sv.mjs","/workspaces/xuluhui.github.io/src/content/posts/markdown.md":"chunks/markdown_D9YpFkId.mjs","/workspaces/xuluhui.github.io/src/content/posts/test.md":"chunks/test_DaekW1Sq.mjs","/workspaces/xuluhui.github.io/src/content/posts/video.md":"chunks/video_uC3AbN-V.mjs","/workspaces/xuluhui.github.io/src/content/spec/about.md":"chunks/about_zYNZNaTT.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_B-8G9m-h.mjs","/workspaces/xuluhui.github.io/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DQi6nra_.mjs","/workspaces/xuluhui.github.io/src/components/ArchivePanel.svelte":"chunks/ArchivePanel_BxYi33Pa.mjs","\u0000@astrojs-manifest":"manifest_BbNsPxY5.mjs","@components/ArchivePanel.svelte":"_astro/ArchivePanel.zyAcKwZi.js","/workspaces/xuluhui.github.io/src/components/misc/Markdown.astro?astro&type=script&index=0&lang.ts":"_astro/Markdown.astro_astro_type_script_index_0_lang.rK-xmpPD.js","/workspaces/xuluhui.github.io/src/components/widget/TOC.astro?astro&type=script&index=0&lang.ts":"_astro/TOC.astro_astro_type_script_index_0_lang.DDOZ1KDD.js","/workspaces/xuluhui.github.io/src/components/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.Crn57otv.js","/workspaces/xuluhui.github.io/src/components/widget/WidgetLayout.astro?astro&type=script&index=0&lang.ts":"_astro/WidgetLayout.astro_astro_type_script_index_0_lang.CJHtMuY3.js","/workspaces/xuluhui.github.io/node_modules/photoswipe/dist/photoswipe.esm.js":"_astro/photoswipe.esm.CKV1Bsxh.js","/workspaces/xuluhui.github.io/node_modules/@swup/astro/dist/client/SwupPreloadPlugin.js":"_astro/SwupPreloadPlugin.CiyJa6X8.js","/workspaces/xuluhui.github.io/node_modules/@swup/astro/dist/client/SwupHeadPlugin.js":"_astro/SwupHeadPlugin.d6nb3Z__.js","/workspaces/xuluhui.github.io/node_modules/@swup/astro/dist/client/SwupScriptsPlugin.js":"_astro/SwupScriptsPlugin.CRD5-C2F.js","@astrojs/svelte/client.js":"_astro/client.svelte.BeY8PDJn.js","/workspaces/xuluhui.github.io/node_modules/@swup/astro/dist/client/SwupA11yPlugin.js":"_astro/SwupA11yPlugin.B0fTfpSW.js","/workspaces/xuluhui.github.io/node_modules/@swup/astro/dist/client/SwupScrollPlugin.js":"_astro/SwupScrollPlugin.t9jexBOd.js","/workspaces/xuluhui.github.io/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DAHrxWCB.js","/workspaces/xuluhui.github.io/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.XUwjF11g.js","astro:scripts/page.js":"_astro/page.jj7xkuA2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/workspaces/xuluhui.github.io/src/components/misc/Markdown.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"click\",function(s){const t=s.target;if(t&&t.classList.contains(\"copy-btn\")){const c=t.closest(\"pre\")?.querySelector(\"code\"),i=Array.from(c?.querySelectorAll(\".code:not(summary *)\")??[]).map(e=>e.textContent).map(e=>e===`\n`?\"\":e).join(`\n`);navigator.clipboard.writeText(i);const o=t.getAttribute(\"data-timeout-id\");o&&clearTimeout(parseInt(o)),t.classList.add(\"success\");const n=setTimeout(()=>{t.classList.remove(\"success\")},1e3);t.setAttribute(\"data-timeout-id\",n.toString())}});"],["/workspaces/xuluhui.github.io/src/components/widget/TOC.astro?astro&type=script&index=0&lang.ts","class l extends HTMLElement{tocEl=null;visibleClass=\"visible\";observer;anchorNavTarget=null;headingIdxMap=new Map;headings=[];sections=[];tocEntries=[];active=[];activeIndicator=null;constructor(){super(),this.observer=new IntersectionObserver(this.markVisibleSection,{threshold:0})}markVisibleSection=t=>{t.forEach(e=>{const i=e.target.children[0]?.getAttribute(\"id\"),s=i?this.headingIdxMap.get(i):void 0;s!=null&&(this.active[s]=e.isIntersecting),e.isIntersecting&&this.anchorNavTarget==e.target.firstChild&&(this.anchorNavTarget=null)}),this.active.includes(!0)||this.fallback(),this.update()};toggleActiveHeading=()=>{let t=this.active.length-1,e=this.active.length-1,i=0;for(;t>=0&&!this.active[t];)this.tocEntries[t].classList.remove(this.visibleClass),t--;for(;t>=0&&this.active[t];)this.tocEntries[t].classList.add(this.visibleClass),e=Math.min(e,t),i=Math.max(i,t),t--;for(;t>=0;)this.tocEntries[t].classList.remove(this.visibleClass),t--;let s=this.tocEl?.getBoundingClientRect().top||0,n=this.tocEl?.scrollTop||0,o=this.tocEntries[e].getBoundingClientRect().top-s+n,c=this.tocEntries[i].getBoundingClientRect().bottom-s+n;this.activeIndicator?.setAttribute(\"style\",`top: ${o}px; height: ${c-o}px`)};scrollToActiveHeading=()=>{if(this.anchorNavTarget||!this.tocEl)return;const t=document.querySelectorAll(`#toc .${this.visibleClass}`);if(!t.length)return;const e=t[0],i=t[t.length-1],s=this.tocEl.clientHeight;let n;i.getBoundingClientRect().bottom-e.getBoundingClientRect().top<.9*s?n=e.offsetTop-32:n=i.offsetTop-s*.8,this.tocEl.scrollTo({top:n,left:0,behavior:\"smooth\"})};update=()=>{requestAnimationFrame(()=>{this.toggleActiveHeading(),this.scrollToActiveHeading()})};fallback=()=>{if(this.sections.length)for(let t=0;t<this.sections.length;t++){let e=this.sections[t].getBoundingClientRect().top,i=this.sections[t].getBoundingClientRect().bottom;if(this.isInRange(e,0,window.innerHeight)||this.isInRange(i,0,window.innerHeight)||e<0&&i>window.innerHeight)this.markActiveHeading(t);else if(e>window.innerHeight)break}};markActiveHeading=t=>{this.active[t]=!0};handleAnchorClick=t=>{const e=t.composedPath().find(i=>i instanceof HTMLAnchorElement);if(e){const i=decodeURIComponent(e.hash?.substring(1)),s=this.headingIdxMap.get(i);s!==void 0?this.anchorNavTarget=this.headings[s]:this.anchorNavTarget=null}};isInRange(t,e,i){return e<t&&t<i}connectedCallback(){const t=document.querySelector(\".prose\");t?t.addEventListener(\"animationend\",()=>{this.init()},{once:!0}):console.debug(\"Animation element not found\")}init(){if(this.tocEl=document.getElementById(\"toc-inner-wrapper\"),!!this.tocEl&&(this.tocEl.addEventListener(\"click\",this.handleAnchorClick,{capture:!0}),this.activeIndicator=document.getElementById(\"active-indicator\"),this.tocEntries=Array.from(document.querySelectorAll(\"#toc a[href^='#']\")),this.tocEntries.length!==0)){this.sections=new Array(this.tocEntries.length),this.headings=new Array(this.tocEntries.length);for(let t=0;t<this.tocEntries.length;t++){const e=decodeURIComponent(this.tocEntries[t].hash?.substring(1)),i=document.getElementById(e),s=i?.parentElement;i instanceof HTMLElement&&s instanceof HTMLElement&&(this.headings[t]=i,this.sections[t]=s,this.headingIdxMap.set(e,t))}this.active=new Array(this.tocEntries.length).fill(!1),this.sections.forEach(t=>this.observer.observe(t)),this.fallback(),this.update()}}disconnectedCallback(){this.sections.forEach(t=>this.observer.unobserve(t)),this.observer.disconnect(),this.tocEl?.removeEventListener(\"click\",this.handleAnchorClick)}}customElements.get(\"table-of-contents\")||customElements.define(\"table-of-contents\",l);"],["/workspaces/xuluhui.github.io/src/components/Navbar.astro?astro&type=script&index=0&lang.ts","function c(){localStorage.theme===\"dark\"?(document.documentElement.classList.remove(\"dark\"),localStorage.theme=\"light\"):(document.documentElement.classList.add(\"dark\"),localStorage.theme=\"dark\")}function o(){let t=document.getElementById(\"scheme-switch\");t&&(t.onclick=function(){c()});let n=document.getElementById(\"display-settings-switch\");n&&(n.onclick=function(){let e=document.getElementById(\"display-setting\");e&&e.classList.toggle(\"float-panel-closed\")});let l=document.getElementById(\"nav-menu-switch\");l&&(l.onclick=function(){let e=document.getElementById(\"nav-menu-panel\");e&&e.classList.toggle(\"float-panel-closed\")})}o();"],["/workspaces/xuluhui.github.io/src/components/widget/WidgetLayout.astro?astro&type=script&index=0&lang.ts","class d extends HTMLElement{constructor(){if(super(),this.dataset.isCollapsed!==\"true\")return;const e=this.dataset.id,t=this.querySelector(\".expand-btn\"),s=this.querySelector(`#${e}`);t.addEventListener(\"click\",()=>{s.classList.remove(\"collapsed\"),t.classList.add(\"hidden\")})}}customElements.get(\"widget-layout\")||customElements.define(\"widget-layout\",d);"]],"assets":["/_astro/page.jj7xkuA2.js","/file:///workspaces/xuluhui.github.io/dist/about/index.html","/file:///workspaces/xuluhui.github.io/dist/archive/index.html","/file:///workspaces/xuluhui.github.io/dist/robots.txt","/file:///workspaces/xuluhui.github.io/dist/rss.xml"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"5KsyI8A6I8rJT2NsFtbODgfnp2FhvChsiJDOdfbFRFc="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
