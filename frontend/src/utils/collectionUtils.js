const { ipcRenderer } = require('electron');

const COLLECTIONS_FILE = 'collections.json';

export const loadCollections = async () => {
  try {
    return await ipcRenderer.invoke('load-collections');
  } catch (error) {
    console.error('Error loading collections:', error);
    return [];
  }
};

export const saveCollections = async (collections) => {
  try {
    return await ipcRenderer.invoke('save-collections', collections);
  } catch (error) {
    console.error('Error saving collections:', error);
    return false;
  }
};

export const addCollection = async (collection) => {
  const collections = await loadCollections();
  collections.push({
    id: Date.now(),
    ...collection,
    requests: []
  });
  return saveCollections(collections);
};

export const addRequestToCollection = async (collectionId, request) => {
  const collections = await loadCollections();
  const collection = collections.find(c => c.id === collectionId);
  if (!collection) return false;

  collection.requests.push({
    id: Date.now(),
    ...request
  });
  return saveCollections(collections);
};

export const updateRequestInCollection = async (collectionId, requestId, updatedRequest) => {
  const collections = await loadCollections();
  const collection = collections.find(c => c.id === collectionId);
  if (!collection) return false;

  const request = collection.requests.find(r => r.id === requestId);
  if (!request) return false;

  Object.assign(request, updatedRequest);
  return saveCollections(collections);
};

export const deleteRequestFromCollection = async (collectionId, requestId) => {
  const collections = await loadCollections();
  const collection = collections.find(c => c.id === collectionId);
  if (!collection) return false;

  collection.requests = collection.requests.filter(r => r.id !== requestId);
  return saveCollections(collections);
};

export const deleteCollection = async (collectionId) => {
  const collections = await loadCollections();
  const filteredCollections = collections.filter(c => c.id !== collectionId);
  return saveCollections(filteredCollections);
}; 