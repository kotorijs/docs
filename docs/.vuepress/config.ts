import { defineConfig } from 'vuepress/config';

export default defineConfig({
	title: 'Kotori Doc',
	description: 'ChatBot Framework Base For TypeScript And NodeJS',
	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{
				text: 'Guide',
				link: '/guide/',
				items: [
					{
						text: '简介',
						link: '/guide/',
					},
					{
						text: '快速开始',
						link: '/guide/start',
					},
					{
						text: 'BOT使用',
						link: '/guide/usage',
					},
				],
			},
			{ text: 'Modules', link: '/modules/' },
			{ text: 'Develop', link: '/develop/' },
			{ text: 'Api', link: '/api/' },
		],
		sidebar: {
			'/guide/': [
				{
					title: '指南',
					// collapsable: false, // 可选的, 默认值是 true,
					// sidebarDepth: 1, // 可选的, 默认值是 1
					children: [
						{
							title: '介绍',
							path: '/guide/',
						},
						{
							title: '快速开始',
							path: '/guide/start',
						},
						{
							title: '模块安装',
							path: '/guide/modules',
						},
						{
							title: 'BOT使用',
							path: '/guide/usage',
						},
					],
				},
			],
		},
		lastUpdated: 'Last Updated',
		repo: 'biyuehu/kotori-bot',
		repoLabel: 'Github',
		docsDir: 'docs',
		docsBranch: 'docs',
		editLinks: true,
		editLinkText: 'Edit page',
	},
	markdown: {
		lineNumbers: true,
	},
});
