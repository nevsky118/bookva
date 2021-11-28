import 'tailwindcss/tailwind.css';
import buildClient from '../api/build-client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Header = dynamic(() => import('../components/Header'));
const Footer = dynamic(() => import('../components/Footer'));

const AppComponent = ({ Component, pageProps, currentUser, prod_total }) => {
	const router = useRouter();

	return (
		<div>
			<Header
				currentUser={currentUser}
				prod_total={prod_total}
				locale={router.locale}
			/>

			<div className="min-h-screen">
				<Component currentUser={currentUser} {...pageProps} />
			</div>
			<Footer />
		</div>
	);
};

AppComponent.getInitialProps = async appContext => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get('/api/users/currentuser');
	let prod_total;

	if (data.currentUser) {
		const {
			data: { products_total },
		} = await client.get('/api/cart?total=true');

		prod_total = products_total;
	}

	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(
			appContext.ctx,
			client,
			data.currentUser,
			prod_total
		);
	}

	return {
		pageProps,
		prod_total,
		...data,
	};
};

export default AppComponent;
