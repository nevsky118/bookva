import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async (props = {}) => {
		try {
			setErrors(null);
			const response = await axios[method](url, { ...body, ...props });

			if (onSuccess) {
				onSuccess(response.data);
			}

			return response.data;
		} catch (err) {
			console.log();
			setErrors(
				<ul>
					{err.response?.data.errors.map(err => (
						<li key={err.message}>{err.message}</li>
					))}
				</ul>
			);
		}
	};

	return { doRequest, errors };
};

export default useRequest;
