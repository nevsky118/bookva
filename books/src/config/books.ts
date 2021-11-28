import { Book } from '../models/book';
import { BookCreatedPublisher } from '../events/publishers/book-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const InitializeBooks = () => {
	const books = [
		{
			name: 'The Adventures of Tom Sawyer',
			author: 'Mark Twain',
			description:
				'The Adventures of Tom Sawyer is an 1876 novel by Mark Twain about a boy growing up along the Mississippi River. It is set in the 1840s in the town of St. Petersburg, which is based on Hannibal, Missouri, where Twain lived as a boy.',
			price: 800,
			currency: 'USD',
			image:
				'http://books.google.com/books/content?id=PVFnDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
		},
		{
			name: 'Harry Potter and the Deathly Hallows',
			author: 'Rowling, J.K.',
			description:
				"After Voldemort takes over the Ministry of Magic, Harry, Ron and Hermione are forced into hiding. They try to decipher the clues left to them by Dumbledore to find and destroy Voldemort's Horcruxes.",
			price: 900,
			currency: 'USD',
			image:
				'http://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
		},
		{
			name: 'Harry Potter and the Prisoner of Azkaban',
			author: 'Rowling, J.K.',
			description:
				'Harry, Ron and Hermoine return to Hogwarts just as they learn about Sirius Black and his plans to kill Harry. However, when Harry runs into him, he learns that the truth is far from reality.',
			price: 1000,
			currency: 'USD',
			image:
				'http://books.google.com/books/content?id=rx6lswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
		},

		{
			name: "Harry Potter and the Philosopher's Stone",
			author: 'Rowling, J.K.',
			description:
				'Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.',
			price: 1100,
			currency: 'USD',
			image:
				'http://books.google.com/books/content?id=35rHBAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
		},
		{
			name: 'Harry Potter and the Order of the Phoenix',
			author: 'Rowling, J.K.',
			description:
				'Harry Potter and Dumbledores warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledores authority at Hogwarts and discredit Harry.',
			price: 800,
			currency: 'USD',
			image:
				'http://books.google.com/books/content?id=kp7nugEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
		},
		{
			name: 'Harry Potter and the Goblet of Fire',
			author: 'Rowling, J.K.',
			description:
				'When Harry is chosen as a fourth participant of the inter-school Triwizard Tournament, he is unwittingly pulled into a dark conspiracy that endangers his life.',
			price: 900,
			currency: 'USD',
			image:
				'http://books.google.com/books/content?id=e3_6vQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
		},
		{
			name: 'Harry Potter and the Chamber of Secrets',
			author: 'Rowling, J.K.',
			description:
				'A house-elf warns Harry against returning to Hogwarts, but he decides to ignore it. When students and creatures at the school begin to get petrified, Harry finds himself surrounded in mystery.',
			price: 1000,
			currency: 'USD',
			image:
				'http://books.google.com/books/content?id=nmXTy4FPfcwC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
		},
		{
			name: 'Harry Potter and the Half-blood Prince',
			author: 'Rowling, J.K.',
			description:
				'Dumbledore and Harry Potter learn more about Voldemorts past and his rise to power. Meanwhile, Harry stumbles upon an old potions textbook belonging to a person calling himself the Half-Blood Prince.',
			price: 1200,
			currency: 'USD',
			image:
				'http://books.google.com/books/content?id=L2EQuwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
		},
	];

	books.map(async book => {
		const { name, price, author, description, currency, image } = book;

		// Build the book and save it to the database
		const record = Book.build({
			name,
			author,
			description,
			price,
			currency,
			image,
		});
		await record.save();

		// Publish an event saying that a book was created
		new BookCreatedPublisher(natsWrapper.client).publish({
			id: record.id,
			name: record.name,
			author: record.author,
			description: record.description,
			price: record.price,
			version: record.version,
			currency: record.currency,
			image: record?.image,
		});
	});
};

export default InitializeBooks;
