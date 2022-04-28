import express from 'express';
import v1 from './controllers/index_v1';
import errorHandler from './middlewares/errorHandler';

var app = express();

app.set('port', process.env.PORT || 3000);

app.use('/api/v1', v1);
app.use(errorHandler)

app.listen(app.get('port'), function () {
	console.log('Listening on port ' + app.get('port'));
});