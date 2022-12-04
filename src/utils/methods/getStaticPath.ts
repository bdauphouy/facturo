import { join } from 'path';

const getStaticPath = () => {
	return join(process.cwd(), 'static');
};

export default getStaticPath;
