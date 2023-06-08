import { uniqueId } from "lodash";

interface MenuitemsType {
	[x: string]: any;
	id?: string;
	navlabel?: boolean;
	subheader?: string;
	title?: string;
	icon?: any;
	href?: string;
	children?: MenuitemsType[];
	chip?: string;
	chipColor?: string;
	variant?: string;
	external?: boolean;
}
import {
	IconAward,
	IconBoxMultiple,
	IconPoint,
	IconBan,
	IconStar,
	IconMoodSmile,
	IconAperture,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
	{
		navlabel: true,
		subheader: "Analyzer",
	},
	{
		id: uniqueId(),
		title: "Comprendre",
		icon: IconAperture,
		children: [
			{
				id: uniqueId(),
				title: "Tutoriel",
				icon: IconPoint,
				href: "/comprendre/tutoriel",
			},
			{
				id: uniqueId(),
				title: "Dialogues",
				icon: IconPoint,
				href: "/comprendre/dialogues",
			},
			{
				id: uniqueId(),
				title: "Etudes",
				icon: IconPoint,
				href: "/comprendre/etudes",
			},
		],
	},
	{
		id: uniqueId(),
		title: "Comparer",
		icon: IconAperture,
		href: "/#",
	},
	{
		navlabel: true,
		subheader: "Agir",
	},
	{
		id: uniqueId(),
		title: "Objectifs",
		icon: IconAperture,
		href: "/#",
	},
	{
		id: uniqueId(),
		title: "Strategy",
		icon: IconAperture,
		href: "/#",
	},
	{
		id: uniqueId(),
		title: "Ressources",
		icon: IconAperture,
		href: "/#",
	},
	// {
	// 	id: uniqueId(),
	// 	title: "Menu Level",
	// 	icon: IconBoxMultiple,
	// 	href: "/menulevel/",
	// 	children: [
	// 		{
	// 			id: uniqueId(),
	// 			title: "Level 1",
	// 			icon: IconPoint,
	// 			href: "/l1",
	// 		},
	// 		{
	// 			id: uniqueId(),
	// 			title: "Level 1.1",
	// 			icon: IconPoint,
	// 			href: "/l1.1",
	// 			children: [
	// 				{
	// 					id: uniqueId(),
	// 					title: "Level 2",
	// 					icon: IconPoint,
	// 					href: "/l2",
	// 				},
	// 				{
	// 					id: uniqueId(),
	// 					title: "Level 2.1",
	// 					icon: IconPoint,
	// 					href: "/l2.1",
	// 					children: [
	// 						{
	// 							id: uniqueId(),
	// 							title: "Level 3",
	// 							icon: IconPoint,
	// 							href: "/l3",
	// 						},
	// 						{
	// 							id: uniqueId(),
	// 							title: "Level 3.1",
	// 							icon: IconPoint,
	// 							href: "/l3.1",
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 	],
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Disabled",
	// 	icon: IconBan,
	// 	href: "",
	// 	disabled: true,
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "SubCaption",
	// 	subtitle: "This is the sutitle",
	// 	icon: IconStar,
	// 	href: "",
	// },

	// {
	// 	id: uniqueId(),
	// 	title: "Chip",
	// 	icon: IconAward,
	// 	href: "",
	// 	chip: "9",
	// 	chipColor: "primary",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "Outlined",
	// 	icon: IconMoodSmile,
	// 	href: "",
	// 	chip: "outline",
	// 	variant: "outlined",
	// 	chipColor: "primary",
	// },
	// {
	// 	id: uniqueId(),
	// 	title: "External Link",
	// 	external: true,
	// 	icon: IconStar,
	// 	href: "https://google.com",
	// },
];

export default Menuitems;
