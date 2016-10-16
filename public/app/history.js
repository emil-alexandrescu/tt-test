import createHashHistory from 'history/lib/createHashHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHashHistory();

export default history;
