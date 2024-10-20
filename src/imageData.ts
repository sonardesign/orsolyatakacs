export interface ImageData {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

function importImage(imageName: string) {
  return new URL(`/src/assets/images/${imageName}`, import.meta.url).href;
}

export const images: ImageData[] = [
  {
    id: '1',
    src: importImage('image1.png'),
    alt: 'Artwork 1',
    width: 400,
    height: 600,
  },
  {
    id: '2',
    src: importImage('image2.png'),
    alt: 'Artwork 2',
    width: 600,
    height: 400,
  },
  {
    id: '3',
    src: importImage('image3.png'),
    alt: 'Artwork 3',
    width: 300,
    height: 400,
  },
  // Add more images here
];