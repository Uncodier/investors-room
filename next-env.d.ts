/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

// Suppress problematic D3 types that cause build issues
declare module '@types/d3-dispatch' {
  const content: any;
  export = content;
}

declare module 'd3-dispatch' {
  const content: any;
  export = content;
}