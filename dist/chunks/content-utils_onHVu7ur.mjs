import { escape } from 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { removeBase, isRemotePath, prependForwardSlash } from '@astrojs/internal-helpers/path';
import { A as AstroError, U as UnknownContentCollectionError, c as createComponent, R as RenderUndefinedEntryError, u as unescapeHTML, r as renderTemplate, i as AstroUserError, j as renderUniqueStylesheet, k as renderScriptElement, l as createHeadAndContent, a as renderComponent } from './astro/server_BWQ42mf1.mjs';
import 'kleur/colors';
import * as devalue from 'devalue';

var LinkPreset = /* @__PURE__ */ ((LinkPreset2) => {
  LinkPreset2[LinkPreset2["Home"] = 0] = "Home";
  LinkPreset2[LinkPreset2["Archive"] = 1] = "Archive";
  LinkPreset2[LinkPreset2["About"] = 2] = "About";
  return LinkPreset2;
})(LinkPreset || {});

const config$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	LinkPreset
}, Symbol.toStringTag, { value: 'Module' }));

const siteConfig = {
  title: "xuluhui's blog",
  subtitle: "C++ notes",
  lang: "zh_CN",
  // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
  themeColor: {
    hue: 250},
  banner: {
    enable: true,
    src: "https://i.postimg.cc/T132TDMc/1.jpg",
    // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: "center",
    // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: false}
  },
  toc: {
    // Display the table of contents on the right side of the post
    depth: 2
    // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [
    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
    // icon: 'simple-icons:codementor',
  ]
};
const navBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: "GitHub",
      url: "https://github.com/xuluhui-code/fuwari",
      // Internal links should not include the base path, as it is automatically added
      external: true
      // Show an external link icon and will open in a new tab
    }
  ]
};
const profileConfig = {
  avatar: "https://i.postimg.cc/Mp3Q7VWm/image.jpg",
  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: "xuluhui",
  bio: "这是xuluhui蒟蒻的部落格.",
  links: [
    // {
    // 	name: "Twitter",
    // 	icon: "fa6-brands:twitter", // Visit https://icones.js.org/ for icon codes
    // 	// You will need to install the corresponding icon set if it's not already included
    // 	// `pnpm add @iconify-json/<icon-set-name>`
    // 	url: "https://twitter.com",
    // },
    // {
    // 	name: "Steam",
    // 	icon: "fa6-brands:steam",
    // 	url: "https://store.steampowered.com",
    // },
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/xuluhui-code"
    },
    {
      name: "Luogu",
      icon: "simple-icons:codecrafters",
      url: "https://www.luogu.com.cn/user/1260214"
    },
    {
      name: "codeforces",
      icon: "simple-icons:codeforces",
      url: "https://codeforces.com/profile/xuluhui"
    }
  ]
};
const licenseConfig = {
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
};

const config = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	licenseConfig,
	navBarConfig,
	profileConfig,
	siteConfig
}, Symbol.toStringTag, { value: 'Module' }));

var I18nKey = /* @__PURE__ */ ((I18nKey2) => {
  I18nKey2["home"] = "home";
  I18nKey2["about"] = "about";
  I18nKey2["archive"] = "archive";
  I18nKey2["search"] = "search";
  I18nKey2["tags"] = "tags";
  I18nKey2["categories"] = "categories";
  I18nKey2["recentPosts"] = "recentPosts";
  I18nKey2["comments"] = "comments";
  I18nKey2["untitled"] = "untitled";
  I18nKey2["uncategorized"] = "uncategorized";
  I18nKey2["noTags"] = "noTags";
  I18nKey2["wordCount"] = "wordCount";
  I18nKey2["wordsCount"] = "wordsCount";
  I18nKey2["minuteCount"] = "minuteCount";
  I18nKey2["minutesCount"] = "minutesCount";
  I18nKey2["postCount"] = "postCount";
  I18nKey2["postsCount"] = "postsCount";
  I18nKey2["themeColor"] = "themeColor";
  I18nKey2["lightMode"] = "lightMode";
  I18nKey2["darkMode"] = "darkMode";
  I18nKey2["systemMode"] = "systemMode";
  I18nKey2["more"] = "more";
  I18nKey2["author"] = "author";
  I18nKey2["publishedAt"] = "publishedAt";
  I18nKey2["license"] = "license";
  return I18nKey2;
})(I18nKey || {});

const i18nKey = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: I18nKey
}, Symbol.toStringTag, { value: 'Module' }));

const en = {
  [I18nKey.home]: "Home",
  [I18nKey.about]: "About",
  [I18nKey.archive]: "Archive",
  [I18nKey.search]: "Search",
  [I18nKey.tags]: "Tags",
  [I18nKey.categories]: "Categories",
  [I18nKey.recentPosts]: "Recent Posts",
  [I18nKey.comments]: "Comments",
  [I18nKey.untitled]: "Untitled",
  [I18nKey.uncategorized]: "Uncategorized",
  [I18nKey.noTags]: "No Tags",
  [I18nKey.wordCount]: "word",
  [I18nKey.wordsCount]: "words",
  [I18nKey.minuteCount]: "minute",
  [I18nKey.minutesCount]: "minutes",
  [I18nKey.postCount]: "post",
  [I18nKey.postsCount]: "posts",
  [I18nKey.themeColor]: "Theme Color",
  [I18nKey.lightMode]: "Light",
  [I18nKey.darkMode]: "Dark",
  [I18nKey.systemMode]: "System",
  [I18nKey.more]: "More",
  [I18nKey.author]: "Author",
  [I18nKey.publishedAt]: "Published at",
  [I18nKey.license]: "License"
};

const en$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	en
}, Symbol.toStringTag, { value: 'Module' }));

const es = {
  [I18nKey.home]: "Inicio",
  [I18nKey.about]: "Sobre mí",
  [I18nKey.archive]: "Archivo",
  [I18nKey.search]: "Buscar",
  [I18nKey.tags]: "Etiquetas",
  [I18nKey.categories]: "Categorías",
  [I18nKey.recentPosts]: "Publicaciones recientes",
  [I18nKey.comments]: "Comentarios",
  [I18nKey.untitled]: "Sin título",
  [I18nKey.uncategorized]: "Sin categoría",
  [I18nKey.noTags]: "Sin etiquetas",
  [I18nKey.wordCount]: "palabra",
  [I18nKey.wordsCount]: "palabras",
  [I18nKey.minuteCount]: "minuto",
  [I18nKey.minutesCount]: "minutos",
  [I18nKey.postCount]: "publicación",
  [I18nKey.postsCount]: "publicaciones",
  [I18nKey.themeColor]: "Color del tema",
  [I18nKey.lightMode]: "Claro",
  [I18nKey.darkMode]: "Oscuro",
  [I18nKey.systemMode]: "Sistema",
  [I18nKey.more]: "Más",
  [I18nKey.author]: "Autor",
  [I18nKey.publishedAt]: "Publicado el",
  [I18nKey.license]: "Licencia"
};

const es$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	es
}, Symbol.toStringTag, { value: 'Module' }));

const ja = {
  [I18nKey.home]: "Home",
  [I18nKey.about]: "About",
  [I18nKey.archive]: "Archive",
  [I18nKey.search]: "検索",
  [I18nKey.tags]: "タグ",
  [I18nKey.categories]: "カテゴリ",
  [I18nKey.recentPosts]: "最近の投稿",
  [I18nKey.comments]: "コメント",
  [I18nKey.untitled]: "タイトルなし",
  [I18nKey.uncategorized]: "カテゴリなし",
  [I18nKey.noTags]: "タグなし",
  [I18nKey.wordCount]: "文字",
  [I18nKey.wordsCount]: "文字",
  [I18nKey.minuteCount]: "分",
  [I18nKey.minutesCount]: "分",
  [I18nKey.postCount]: "件の投稿",
  [I18nKey.postsCount]: "件の投稿",
  [I18nKey.themeColor]: "テーマカラー",
  [I18nKey.lightMode]: "ライト",
  [I18nKey.darkMode]: "ダーク",
  [I18nKey.systemMode]: "システム",
  [I18nKey.more]: "もっと",
  [I18nKey.author]: "作者",
  [I18nKey.publishedAt]: "公開日",
  [I18nKey.license]: "ライセンス"
};

const ja$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ja
}, Symbol.toStringTag, { value: 'Module' }));

const ko = {
  [I18nKey.home]: "홈",
  [I18nKey.about]: "소개",
  [I18nKey.archive]: "아카이브",
  [I18nKey.search]: "검색",
  [I18nKey.tags]: "태그",
  [I18nKey.categories]: "카테고리",
  [I18nKey.recentPosts]: "최근 게시물",
  [I18nKey.comments]: "댓글",
  [I18nKey.untitled]: "제목 없음",
  [I18nKey.uncategorized]: "분류되지 않음",
  [I18nKey.noTags]: "태그 없음",
  [I18nKey.wordCount]: "단어",
  [I18nKey.wordsCount]: "단어",
  [I18nKey.minuteCount]: "분",
  [I18nKey.minutesCount]: "분",
  [I18nKey.postCount]: "게시물",
  [I18nKey.postsCount]: "게시물",
  [I18nKey.themeColor]: "테마 색상",
  [I18nKey.lightMode]: "밝은 모드",
  [I18nKey.darkMode]: "어두운 모드",
  [I18nKey.systemMode]: "시스템 모드",
  [I18nKey.more]: "더 보기",
  [I18nKey.author]: "저자",
  [I18nKey.publishedAt]: "게시일",
  [I18nKey.license]: "라이선스"
};

const ko$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ko
}, Symbol.toStringTag, { value: 'Module' }));

const th = {
  [I18nKey.home]: "หน้าแรก",
  [I18nKey.about]: "เกี่ยวกับ",
  [I18nKey.archive]: "คลัง",
  [I18nKey.search]: "ค้นหา",
  [I18nKey.tags]: "ป้ายกำกับ",
  [I18nKey.categories]: "หมวดหมู่",
  [I18nKey.recentPosts]: "โพสต์ล่าสุด",
  [I18nKey.comments]: "ความคิดเห็น",
  [I18nKey.untitled]: "ไม่ได้ตั้งชื่อ",
  [I18nKey.uncategorized]: "ไม่ได้จัดหมวดหมู่",
  [I18nKey.noTags]: "ไม่มีป้ายกำกับ",
  [I18nKey.wordCount]: "คำ",
  [I18nKey.wordsCount]: "คำ",
  [I18nKey.minuteCount]: "นาที",
  [I18nKey.minutesCount]: "นาที",
  [I18nKey.postCount]: "โพสต์",
  [I18nKey.postsCount]: "โพสต์",
  [I18nKey.themeColor]: "สีของธีม",
  [I18nKey.lightMode]: "สว่าง",
  [I18nKey.darkMode]: "มืด",
  [I18nKey.systemMode]: "ตามระบบ",
  [I18nKey.more]: "ดูเพิ่ม",
  [I18nKey.author]: "ผู้เขียน",
  [I18nKey.publishedAt]: "เผยแพร่เมื่อ",
  [I18nKey.license]: "สัญญาอนุญาต"
};

const th$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	th
}, Symbol.toStringTag, { value: 'Module' }));

const zh_CN = {
  [I18nKey.home]: "主页",
  [I18nKey.about]: "关于",
  [I18nKey.archive]: "归档",
  [I18nKey.search]: "搜索",
  [I18nKey.tags]: "标签",
  [I18nKey.categories]: "分类",
  [I18nKey.recentPosts]: "最新文章",
  [I18nKey.comments]: "评论",
  [I18nKey.untitled]: "无标题",
  [I18nKey.uncategorized]: "未分类",
  [I18nKey.noTags]: "无标签",
  [I18nKey.wordCount]: "字",
  [I18nKey.wordsCount]: "字",
  [I18nKey.minuteCount]: "分钟",
  [I18nKey.minutesCount]: "分钟",
  [I18nKey.postCount]: "篇文章",
  [I18nKey.postsCount]: "篇文章",
  [I18nKey.themeColor]: "主题色",
  [I18nKey.lightMode]: "亮色",
  [I18nKey.darkMode]: "暗色",
  [I18nKey.systemMode]: "跟随系统",
  [I18nKey.more]: "更多",
  [I18nKey.author]: "作者",
  [I18nKey.publishedAt]: "发布于",
  [I18nKey.license]: "许可协议"
};

const zh_CN$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	zh_CN
}, Symbol.toStringTag, { value: 'Module' }));

const zh_TW = {
  [I18nKey.home]: "首頁",
  [I18nKey.about]: "關於",
  [I18nKey.archive]: "彙整",
  [I18nKey.search]: "搜尋",
  [I18nKey.tags]: "標籤",
  [I18nKey.categories]: "分類",
  [I18nKey.recentPosts]: "最新文章",
  [I18nKey.comments]: "評論",
  [I18nKey.untitled]: "無標題",
  [I18nKey.uncategorized]: "未分類",
  [I18nKey.noTags]: "無標籤",
  [I18nKey.wordCount]: "字",
  [I18nKey.wordsCount]: "字",
  [I18nKey.minuteCount]: "分鐘",
  [I18nKey.minutesCount]: "分鐘",
  [I18nKey.postCount]: "篇文章",
  [I18nKey.postsCount]: "篇文章",
  [I18nKey.themeColor]: "主題色",
  [I18nKey.lightMode]: "亮色",
  [I18nKey.darkMode]: "暗色",
  [I18nKey.systemMode]: "跟隨系統",
  [I18nKey.more]: "更多",
  [I18nKey.author]: "作者",
  [I18nKey.publishedAt]: "發佈於",
  [I18nKey.license]: "許可協議"
};

const zh_TW$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	zh_TW
}, Symbol.toStringTag, { value: 'Module' }));

const defaultTranslation = en;
const map = {
  es,
  en,
  en_us: en,
  en_gb: en,
  en_au: en,
  zh_cn: zh_CN,
  zh_tw: zh_TW,
  ja,
  ja_jp: ja,
  ko,
  ko_kr: ko,
  th,
  th_th: th
};
function getTranslation(lang) {
  return map[lang.toLowerCase()] || defaultTranslation;
}
function i18n(key) {
  const lang = siteConfig.lang;
  return getTranslation(lang)[key];
}

const translation = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getTranslation,
	i18n
}, Symbol.toStringTag, { value: 'Module' }));

function pathsEqual(path1, path2) {
  const normalizedPath1 = path1.replace(/^\/|\/$/g, "").toLowerCase();
  const normalizedPath2 = path2.replace(/^\/|\/$/g, "").toLowerCase();
  return normalizedPath1 === normalizedPath2;
}
function joinUrl(...parts) {
  const joined = parts.join("/");
  return joined.replace(/\/+/g, "/");
}
function getPostUrlBySlug(slug) {
  return url(`/posts/${slug}/`);
}
function getTagUrl(tag) {
  if (!tag) return url("/archive/");
  return url(`/archive/?tag=${encodeURIComponent(tag.trim())}`);
}
function getCategoryUrl(category) {
  if (!category || category.trim() === "" || category.trim().toLowerCase() === i18n(I18nKey.uncategorized).toLowerCase())
    return url("/archive/?uncategorized=true");
  return url(`/archive/?category=${encodeURIComponent(category.trim())}`);
}
function getDir(path) {
  const lastSlashIndex = path.lastIndexOf("/");
  if (lastSlashIndex < 0) {
    return "/";
  }
  return path.substring(0, lastSlashIndex + 1);
}
function url(path) {
  return joinUrl("", "/", path);
}

const urlUtils = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getCategoryUrl,
	getDir,
	getPostUrlBySlug,
	getTagUrl,
	pathsEqual,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";
const CONTENT_LAYER_TYPE = "content_layer";

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position"
];

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_B-8G9m-h.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://xuluhui-code.github.io/xuluhui-code.github.io/", "SSR": true};
function getImporterFilename() {
  const stackLine = new Error().stack?.split("\n")?.[3];
  if (!stackLine) {
    return null;
  }
  const match = /\/(src\/.*?):\d+:\d+/.exec(stackLine);
  return match?.[1] ?? null;
}
function defineCollection(config) {
  if ("loader" in config) {
    if (config.type && config.type !== CONTENT_LAYER_TYPE) {
      throw new AstroUserError(
        `Collections that use the Content Layer API must have a \`loader\` defined and no \`type\` set. Check your collection definitions in ${getImporterFilename() ?? "your content config file"}.`
      );
    }
    config.type = CONTENT_LAYER_TYPE;
  }
  if (!config.type) config.type = "content";
  return config;
}
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport,
  collectionNames
}) {
  return async function getEntry(collectionOrLookupObject, _lookupId) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!_lookupId)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = _lookupId;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const entry2 = store.get(collection, lookupId);
      if (!entry2) {
        console.warn(`Entry ${collection} → ${lookupId} was not found.`);
        return;
      }
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      entry2.data = updateImageReferencesInData(entry2.data, entry2.filePath, imageAssetMap);
      if (entry2.legacyId) {
        return emulateLegacyEntry({ ...entry2, collection });
      }
      return {
        ...entry2,
        collection
      };
    }
    if (!collectionNames.has(collection)) {
      console.warn(
        `The collection ${JSON.stringify(collection)} does not exist. Please ensure it is defined in your content config.`
      );
      return void 0;
    }
    const entryImport = await getEntryImport(collection, lookupId);
    if (typeof entryImport !== "function") return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('./_astro_assets_CitNz01A.mjs').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('./content-modules_Dz-S_Wwv.mjs');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

const collectionNames = new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	collectionNames,
});

async function getSortedPosts() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return data.draft !== true ;
  });
  const sorted = allBlogPosts.sort((a, b) => {
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateA > dateB ? -1 : 1;
  });
  for (let i = 1; i < sorted.length; i++) {
    sorted[i].data.nextSlug = sorted[i - 1].slug;
    sorted[i].data.nextTitle = sorted[i - 1].data.title;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    sorted[i].data.prevSlug = sorted[i + 1].slug;
    sorted[i].data.prevTitle = sorted[i + 1].data.title;
  }
  return sorted;
}
async function getTagList() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return data.draft !== true ;
  });
  const countMap = {};
  allBlogPosts.map((post) => {
    post.data.tags.map((tag) => {
      if (!countMap[tag]) countMap[tag] = 0;
      countMap[tag]++;
    });
  });
  const keys = Object.keys(countMap).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  return keys.map((key) => ({ name: key, count: countMap[key] }));
}
async function getCategoryList() {
  const allBlogPosts = await getCollection("posts", ({ data }) => {
    return data.draft !== true ;
  });
  const count = {};
  allBlogPosts.map((post) => {
    if (!post.data.category) {
      const ucKey = i18n(I18nKey.uncategorized);
      count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
      return;
    }
    const categoryName = typeof post.data.category === "string" ? post.data.category.trim() : String(post.data.category).trim();
    count[categoryName] = count[categoryName] ? count[categoryName] + 1 : 1;
  });
  const lst = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  const ret = [];
  for (const c of lst) {
    ret.push({
      name: c,
      count: count[c],
      url: getCategoryUrl(c)
    });
  }
  return ret;
}

const contentUtils = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getCategoryList,
	getSortedPosts,
	getTagList
}, Symbol.toStringTag, { value: 'Module' }));

export { zh_CN$1 as A, zh_TW$1 as B, translation as C, DEFAULT_OUTPUT_FORMAT as D, urlUtils as E, contentUtils as F, I18nKey as I, LinkPreset as L, VALID_SUPPORTED_FORMATS as V, getSortedPosts as a, getDir as b, getPostUrlBySlug as c, getCategoryUrl as d, getTagUrl as e, defineCollection as f, getEntry as g, getCategoryList as h, i18n as i, getTagList as j, pathsEqual as k, licenseConfig as l, DEFAULT_HASH_PROPS as m, navBarConfig as n, config$1 as o, profileConfig as p, config as q, renderEntry as r, siteConfig as s, i18nKey as t, url as u, en$1 as v, es$1 as w, ja$1 as x, ko$1 as y, th$1 as z };
