import { defineConfig } from 'vuepress/config';

export default defineConfig({
	title: 'Kotori Doc',
	description: 'ChatBot Framework Base For TypeScript And NodeJS',
	themeConfig: {
		// logo: '/kotori.png',
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Guide', link: '/guide/' },
			{ text: 'Modules', link: '/modules/' },
			{ text: 'Develop', link: '/develop/' },
			{ text: 'Api', link: '/api/' },
		],
		lastUpdated: 'Last Updated',
		repo: 'biyuehu/kotori-bot',
		repoLabel: 'Github',
		docsDir: 'docs',
		docsBranch: 'docs',
		editLinks: true,
		editLinkText: '帮助我们改善此页面！',
	},
	markdown: {
		lineNumbers: true,
	},
});
