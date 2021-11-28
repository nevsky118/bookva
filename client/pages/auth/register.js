import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import Head from 'next/head';

import { useRouter } from 'next/router';
import useRequest from '../../hooks/use-request';

const Register = () => {
	let { t } = useTranslation();
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { doRequest, errors } = useRequest({
		url: '/api/users/signup',
		method: 'post',
		body: {
			email,
			password,
		},
		onSuccess: () => router.push('/'),
	});

	const onSubmit = async event => {
		event.preventDefault();

		doRequest();
	};

	return (
		<>
			<Head>
				<title>{t('register:title')}</title>
			</Head>
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
							alt="Workflow"
						/>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							{t('register:header')}
						</h2>
					</div>
					<form className="mt-8 space-y-6" action="#" onSubmit={onSubmit}>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="email-address" className="sr-only">
									{t('register:email')}
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									autoComplete="email"
									required
									className="appearance-none rounded-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder={t('register:email')}
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									{t('register:password')}
								</label>
								<input
									id="password"
									name="password"
									type="password"
									value={password}
									onChange={e => setPassword(e.target.value)}
									autoComplete="current-password"
									required
									className="appearance-none rounded-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder={t('register:password')}
								/>
							</div>
						</div>

						<div className="flex items-center justify-center">
							<div className="text-sm">
								<a className="font-medium">
									{t('register:already_have_an_account')}{' '}
								</a>
								<Link href="/auth/login">
									<a rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
										{t('register:login')}
									</a>
								</Link>
							</div>
						</div>

						<div>
							<button className="group   w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								{t('register:register')}
							</button>
						</div>
						{errors}
					</form>
				</div>
			</div>
		</>
	);
};

Register.getInitialProps = async (context, client, currentUser) => {
	if (currentUser) {
		// Redirect if the user is logged in
		context.res.writeHead(303, { Location: '/' });
		context.res.end();
	}
};

export default Register;
