'use strict';

import Article from './article'
import user from './user'
export default app => {
	app.use('/api/v1/article', Article);
	app.use('/api/v1/user', user);
}