const demoBanner = new Proxy({"src":"/_astro/demo-banner.WD4SMgz_.png","width":1920,"height":1369,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/workspaces/xuluhui.github.io/src/assets/images/demo-banner.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/workspaces/xuluhui.github.io/src/assets/images/demo-banner.png");
							return target[name];
						}
					});

export { demoBanner as default };
