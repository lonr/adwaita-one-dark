import { findAndRenderTemplates } from 'utils';

const srcDir: URL = new URL('../src/', import.meta.url);

await findAndRenderTemplates(srcDir);
