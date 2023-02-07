import { findAndRenderTemplates } from 'utils';

const dir: URL = new URL('../templates/', import.meta.url);

await findAndRenderTemplates(dir);
