import type { IDefinition } from '$types';
import type { Margins } from 'pdfmake/interfaces';

const creditNoteDefinition = (data: IDefinition) => ({
	content: [
		{
			columns: [
				{
					image: data.company.logo,
					width: 90,
					height: 90
				},
				{
					text: `Avoir`,
					style: ['creditNoteText', 'alignRight']
				}
			]
		},
		{
			table: {
				widths: [200, '*', 240],
				body: [
					[
						{
							stack: [
								{
									text: data.company.name,
									style: 'bold'
								},
								{
									text: `${data.company.address},\n${data.company.zipCode} ${data.company.city}`,
									style: 'mt10'
								},
								{
									stack: [
										{
											table: {
												widths: [70, '*'],
												body: [
													[
														{
															text: 'SIRET',
															style: 'bold'
														},
														{
															text: data.company.siret
														}
													]
												]
											},
											layout: 'noBorders'
										},
										{
											table: {
												widths: [70, '*'],
												body: [
													[
														{
															text: 'Code NAF',
															style: 'bold'
														},
														{
															text: data.company.naf
														}
													]
												]
											},
											layout: 'noBorders'
										},
										{
											table: {
												widths: [70, '*'],
												body: [
													[
														{
															text: 'Téléphone',
															style: 'bold'
														},
														{
															text: data.company.phone
														}
													]
												]
											},
											layout: 'noBorders'
										},
										{
											table: {
												widths: [70, '*'],
												body: [
													[
														{
															text: 'Email',
															style: 'bold'
														},
														{
															text: data.company.email
														}
													]
												]
											},
											layout: 'noBorders'
										},
										{
											table: {
												widths: [70, '*'],
												body: [
													[
														{
															text: 'Site web',
															style: 'bold'
														},
														{
															text: data.company.website
														}
													]
												]
											},
											layout: 'noBorders'
										}
									],
									style: 'mt10'
								}
							]
						},
						{},
						{
							stack: [
								{
									text: data.client.firstName + ' ' + data.client.lastName,
									style: 'bold'
								},
								{
									text: `${data.client.address},\n${data.client.zipCode} ${data.client.city}`,
									style: 'mt10'
								},
								{
									stack: [
										{
											table: {
												widths: [70, '*'],
												body: [
													[
														{
															text: 'Téléphone',
															style: 'bold'
														},
														{
															text: data.client.phone
														}
													]
												]
											},
											layout: 'noBorders'
										},
										{
											table: {
												widths: [70, '*'],
												body: [
													[
														{
															text: 'Email',
															style: 'bold'
														},
														{
															text: data.client.email
														}
													]
												]
											},
											layout: 'noBorders'
										}
									],
									style: 'mt10'
								}
							]
						}
					]
				]
			},
			style: 'mt20',
			layout: 'noBorders'
		},
		{
			table: {
				widths: [240],
				headerRows: 1,
				body: [
					[
						{
							stack: [
								{
									table: {
										widths: [100, '*'],
										body: [
											[
												{
													text: "Date d'émission",
													style: 'bold'
												},
												{
													text: data.date
												}
											]
										]
									},
									layout: 'noBorders'
								},
								{
									table: {
										widths: [100, '*'],
										body: [
											[
												{
													text: "Site d'échéance",
													style: 'bold'
												},
												{
													text: data.dueDate
												}
											]
										]
									},
									layout: 'noBorders'
								}
							]
						}
					]
				]
			},
			layout: 'noBorders',
			style: 'mt28'
		},
		{
			text: 'Détail',
			style: ['bold', 'mt32']
		},
		{
			table: {
				widths: [60, '*', 80, 60, 80],
				headerRows: 1,
				body: [
					[
						{
							text: 'Type',
							style: ['mt4', 'bold', 'tableHeader', 'firstTableCell']
						},
						{
							text: 'Description',
							style: ['mt4', 'bold', 'tableHeader']
						},
						{
							text: 'Prix unitaire HT',
							style: ['mt4', 'bold', 'tableHeader', 'alignRight']
						},
						{
							text: 'Quantité',
							style: ['mt4', 'bold', 'tableHeader', 'alignRight']
						},
						{
							text: 'Total HT',
							style: ['mt4', 'bold', 'tableHeader', 'alignRight', 'lastTableCell']
						}
					],
					...data.items.map((item) => {
						return [
							{
								text: item.type,
								style: ['mt4', 'tableItem', 'firstTableCell']
							},
							{
								text: item.description,
								style: ['mt4', 'tableItem']
							},
							{
								text: `${item.unitPrice},00 €`,
								style: ['mt4', 'tableItem', 'alignRight']
							},
							{
								text: item.quantity.toString(),
								style: ['mt4', 'tableItem', 'alignRight']
							},
							{
								text: `${item.unitPrice * item.quantity},00 €`,
								style: ['mt4', 'tableItem', 'alignRight', 'lastTableCell']
							}
						];
					})
				]
			},
			style: 'mt10',
			layout: 'noBorders'
		},
		{
			text: 'TVA non applicable, art. 293 B du CGI',
			style: ['mt10', 'alignRight']
		},
		{
			table: {
				widths: ['*', 100],
				body: [
					[
						{
							stack: []
						},
						{
							columns: [
								{
									text: 'Total',
									style: ['bold']
								},
								{
									text: `${data.items.reduce((p, c) => p + c.quantity * c.unitPrice, 0)},00 €`,
									style: ['bold', 'alignRight', 'tableItem']
								}
							]
						}
					]
				]
			},
			style: 'mt10',
			layout: 'noBorders'
		}
	],
	styles: {
		creditNoteText: {
			fontSize: 16
		},
		mt4: {
			marginTop: 4
		},
		mt10: {
			marginTop: 10
		},
		mt20: {
			marginTop: 20
		},
		mt28: {
			marginTop: 28
		},
		mt32: {
			marginTop: 32
		},
		bold: {
			bold: true
		},
		alignRight: {
			alignment: 'right' as const
		},
		tableHeader: {
			fillColor: '#1E293B',
			color: 'white'
		},
		tableItem: {
			fillColor: '#F1F5F9',
			marginBottom: 4
		},
		firstTableCell: {
			margin: [10, 4, 0, 4] as Margins
		},
		lastTableCell: {
			margin: [0, 4, 10, 4] as Margins
		}
	},
	defaultStyle: {
		font: 'Nunito',
		fontSize: 10
	},
	pageMargins: [40, 32, 40, 32] as Margins
});

export default creditNoteDefinition;
