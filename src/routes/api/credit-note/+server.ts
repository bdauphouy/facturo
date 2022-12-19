import { createWriteStream } from 'fs';
import Printer from 'pdfmake';

import { creditNoteDefinition } from '$utils/definitions';

import type { DocumentBody, IDefinition } from '$types';
import { getStaticPath } from '$utils/methods';
import { prisma } from '$utils/prisma';
import type { CreditNote } from '@prisma/client';
import { error, type Action } from '@sveltejs/kit';

export const POST: Action = async ({ request }) => {
	const body: DocumentBody<CreditNote> = await request.json();

	const client = await prisma.client.findUnique({
		where: {
			id: body.clientId
		}
	});

	if (!client) {
		throw error(404);
	}

	const creditNote = await prisma.creditNote.create({
		data: {
			clientId: body.clientId
		}
	});

	const creditNoteNumber = creditNote.id.toString().padStart(5, '0');

	const data: IDefinition = {
		number: creditNoteNumber,
		date: new Date().toLocaleDateString('fr-FR'),
		dueDate: (() => {
			const date = new Date();
			date.setDate(date.getDate() + 30);
			return date.toLocaleDateString('fr-FR');
		})(),
		company: {
			name: 'Baptiste DAUPHOUY',
			address: '12 rue du Porte Dîner',
			zipCode: '94000',
			city: 'Créteil',
			siret: '123 456 789',
			naf: '6201Z',
			phone: '06 22 88 99 47',
			email: 'contact@bdph.me',
			website: 'bdph.me',
			logo: 'static/images/logo.png'
		},
		items: body.items,
		client
	};

	const fonts = {
		Nunito: {
			normal: getStaticPath() + '/fonts/Nunito-Medium.ttf',
			bold: getStaticPath() + '/fonts/Nunito-Bold.ttf'
		}
	};

	const printer = new Printer(fonts);

	const documentDefinition = creditNoteDefinition(data);

	const document = printer.createPdfKitDocument(documentDefinition);
	document.pipe(createWriteStream(`${getStaticPath()}/credit-notes/${creditNoteNumber}.pdf`));
	document.end();

	return new Response(document as unknown as ReadableStream, {
		headers: {
			'Content-Type': 'application/pdf'
		}
	});
};
