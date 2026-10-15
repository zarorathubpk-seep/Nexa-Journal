import test from 'node:test';
import assert from 'node:assert/strict';
import { getAssetUrl } from './imageHelper.ts';

test('getAssetUrl preserves external http and https URLs', () => {
  assert.equal(getAssetUrl('https://example.com/photo.jpg'), 'https://example.com/photo.jpg');
  assert.equal(getAssetUrl('http://example.com/photo.jpg'), 'http://example.com/photo.jpg');
});

test('getAssetUrl resolves local paths with default base', () => {
  assert.equal(getAssetUrl('/images/blog/photo.jpg', '/'), '/images/blog/photo.jpg');
  assert.equal(getAssetUrl('images/blog/photo.jpg', '/'), '/images/blog/photo.jpg');
});

test('getAssetUrl resolves local paths with GitHub Pages subfolder base', () => {
  assert.equal(
    getAssetUrl('/images/blog/photo.jpg', '/my-repo/'),
    '/my-repo/images/blog/photo.jpg'
  );
  assert.equal(
    getAssetUrl('images/blog/photo.jpg', '/my-repo'),
    '/my-repo/images/blog/photo.jpg'
  );
});
