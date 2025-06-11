const avatar = new Proxy({"src":"/_astro/avatar.BYyZCjAC.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/workspaces/xuluhui.github.io/src/assets/images/avatar.jpg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/workspaces/xuluhui.github.io/src/assets/images/avatar.jpg");
							return target[name];
						}
					});

export { avatar as default };
