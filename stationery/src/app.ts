import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@kringel118/common';

import { indexStationeryRouter } from './routes/index';
import { updateStationeryRouter } from './routes/update';
import { createStationeryRouter } from './routes/create';
import { deleteStationeryRouter } from './routes/delete';
import { retrieveStationeryRouter } from './routes/retrieve';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: false,
	})
);
app.use(currentUser);

app.use(indexStationeryRouter);
app.use(updateStationeryRouter);
// app.use(createStationeryRouter);
// app.use(deleteStationeryRouter);
app.use(retrieveStationeryRouter);

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
