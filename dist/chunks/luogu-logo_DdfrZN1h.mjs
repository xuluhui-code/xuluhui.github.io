const luoguLogo = new Proxy({"src":"/_astro/luogu-logo.C3iVH8xo.png","width":138,"height":200,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/workspaces/xuluhui.github.io/src/assets/images/luogu-logo.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/workspaces/xuluhui.github.io/src/assets/images/luogu-logo.png");
							return target[name];
						}
					});

export { luoguLogo as default };
