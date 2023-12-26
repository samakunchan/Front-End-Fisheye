export const errorInitMessage = `L'application ne peut pas se lancer.`;
export const errorMessage = `Une érreur est survenue lors du téléchargement du fichier JSON`;
export const typeStringText = `string`;
export const typeObjectText = `object`;
export const fakeTypeText = `fake`;
export const realTypeText = `real`;
export const realOneTypeText = `one`;

/**
 * Enums
 * @type {{date: {value: string, key: string},
 * title: {value: string, key: string}, popular: {value: string, key: string}}}
 */
export const SortBy = {
  popular: {
    key: 'popular',
    value: 'popularité',
  },
  title: {
    key: 'title',
    value: 'titre',
  },
  date: {
    key: 'date',
    value: 'date',
  },
};

export const getJson = (data) => data.json();
export const getError = () => errorMessage;
// export const getError = console.log;

export const redirectToThisUrl = (page) =>
  `${window.location.protocol}//${window.location.host}/${window.location.pathname.split('/')[1]}/${page}.html`;

export const idParam = Number(new URLSearchParams(window.location.search).get('id'));
