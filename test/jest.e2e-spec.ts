import { dotizeDotify } from '@marxlnfcs/dotize';
import { smartMerge } from '../src/lib/smart-merge';

const manifestsA: any = [{
  apiVersion: 'v1',
  kind: 'ConfigMap',
  metadata: {
    name: 'config',
    namespace: 'namespace',
  },
  data: {
    name: 'data.name',
    items: [
      {
        name: 'nameA',
        path: '/data/nameA',
      },
      {
        name: 'nameB',
        path: '/data/nameB',
      },
      {
        name: 'nameC',
        path: '/data/nameC',
        subItems: [
          '/data/nameC/subItemA',
          '/data/nameC/subItemB',
        ]
      },
    ],
  }
}];

const manifestsB: any = [{
  apiVersion: 'v1',
  kind: 'ConfigMap',
  metadata: {
    name: 'config',
    namespace: 'namespace',
  },
  data: {
    enabled: true,
    items: [
      {
        name: 'nameXYZ',
        path: '/data/nameXYZ',
        crazy: true,
        nativeItems: [1,2,3,4,5,6],
      },
      {
        name: 'nameC',
        subItems: [
          '/data/nameC/subItemC',
          '/data/nameC/subItemA',
        ]
      },
    ],
  }
}];

const manifestsExpected: any = [{
  apiVersion: 'v1',
  kind: 'ConfigMap',
  metadata: {
    name: 'config',
    namespace: 'namespace',
  },
  data: {
    name: 'data.name',
    enabled: true,
    items: [
      {
        name: 'nameA',
        path: '/data/nameA',
      },
      {
        name: 'nameB',
        path: '/data/nameB',
      },
      {
        name: 'nameC',
        path: '/data/nameC',
        subItems: [
          '/data/nameC/subItemA',
          '/data/nameC/subItemB',
          '/data/nameC/subItemC',
        ]
      },
      {
        name: 'nameXYZ',
        path: '/data/nameXYZ',
        crazy: true,
        nativeItems: [1,2,3,4,5,6],
      },
    ],
  }
}];

function dotizeObject(obj: any): Record<string, any> {
  const data: any = {};
  obj = dotizeDotify(obj);
  Object.keys(obj).sort().map(key => {
    data[key] = obj[key];
  });
  return data
}

describe('Testing Library', () => {
  describe('Validate functions smartMerge', () => {
    it('The merged array should have 2 manifests', () => {
      const manifests = smartMerge(manifestsA, manifestsB, {
        matchSimilarKeys: false,
      });
      expect(manifests.length).toBe(2);
    });
    it('The merged array should have 1 manifest', () => {
      const manifests = smartMerge(manifestsA, manifestsB, {
        matchSimilarKeys: false,
        prioritizedKeys: [
          ['kind', 'metadata.name', 'metadata.namespace']
        ]
      });
      expect(manifests.length).toBe(1);
    });
    it('The merged array should be the same as the expected one', () => {
      const manifests = smartMerge(manifestsA, manifestsB, {
        prioritizedKeys: [
          ['metadata.name', 'metadata.namespace']
        ]
      });
      expect(JSON.stringify(dotizeObject(manifests))).toBe(JSON.stringify(dotizeObject(manifestsExpected)));
    });
  });
});