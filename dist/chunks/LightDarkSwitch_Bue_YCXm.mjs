import { p as push, a as attr_class, e as escape_html, b as pop } from './_@astro-renderers_C0keON3Y.mjs';
import { L as LIGHT_MODE, D as DARK_MODE, A as AUTO_MODE } from './MainGridLayout_Cinn_tsx.mjs';
import { i as i18n, I as I18nKey } from './content-utils_onHVu7ur.mjs';
import { I as Icon } from './Icon_DHOry1fd.mjs';

function LightDarkSwitch($$payload, $$props) {
	push();
	let mode = AUTO_MODE;

	$$payload.out += `<div class="relative z-50" role="menu" tabindex="-1"><button aria-label="Light/Dark Mode" role="menuitem" class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" id="scheme-switch"><div${attr_class('absolute', undefined, { 'opacity-0': mode !== LIGHT_MODE })}>`;

	Icon($$payload, {
		icon: 'material-symbols:wb-sunny-outline-rounded',
		class: 'text-[1.25rem]'
	});

	$$payload.out += `<!----></div> <div${attr_class('absolute', undefined, { 'opacity-0': mode !== DARK_MODE })}>`;

	Icon($$payload, {
		icon: 'material-symbols:dark-mode-outline-rounded',
		class: 'text-[1.25rem]'
	});

	$$payload.out += `<!----></div> <div${attr_class('absolute', undefined, { 'opacity-0': mode !== AUTO_MODE })}>`;

	Icon($$payload, {
		icon: 'material-symbols:radio-button-partial-outline',
		class: 'text-[1.25rem]'
	});

	$$payload.out += `<!----></div></button> <div id="light-dark-panel" class="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5"><div class="card-base float-panel p-2"><button${attr_class('flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5', undefined, { 'current-theme-btn': mode === LIGHT_MODE })}>`;

	Icon($$payload, {
		icon: 'material-symbols:wb-sunny-outline-rounded',
		class: 'text-[1.25rem] mr-3'
	});

	$$payload.out += `<!----> ${escape_html(i18n(I18nKey.lightMode))}</button> <button${attr_class('flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5', undefined, { 'current-theme-btn': mode === DARK_MODE })}>`;

	Icon($$payload, {
		icon: 'material-symbols:dark-mode-outline-rounded',
		class: 'text-[1.25rem] mr-3'
	});

	$$payload.out += `<!----> ${escape_html(i18n(I18nKey.darkMode))}</button> <button${attr_class('flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95', undefined, { 'current-theme-btn': mode === AUTO_MODE })}>`;

	Icon($$payload, {
		icon: 'material-symbols:radio-button-partial-outline',
		class: 'text-[1.25rem] mr-3'
	});

	$$payload.out += `<!----> ${escape_html(i18n(I18nKey.systemMode))}</button></div></div></div>`;
	pop();
}

export { LightDarkSwitch as default };
