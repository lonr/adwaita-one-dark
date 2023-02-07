import { findAndRenderTemplates } from 'utils';

const srcDir: URL = new URL('../templates/', import.meta.url);

await findAndRenderTemplates(srcDir);
