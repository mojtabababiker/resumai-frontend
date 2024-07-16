// Make the sliding images in the hero section of the homepage
import Image from 'next/image';

export default function HeroImagesSlider() {
  const images = [
    '/hero_image_2-ready.png'
  ];

  return (
    <>
      <div className="flex items-center justify-end overflow-hidden">
        {images.map((image, index) => (
          <div className='w-full p-1'>
            <Image
              key={index}
              src={image}
              alt={`Hero Image ${index + 1}`}
              width={640}
              height={640}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}