import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const PanoramaSlider = () => {
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
    "https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?q=80&w=1000",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000",
  ];

  return (
    <div className="w-full bg-black py-20 overflow-hidden">
      <style>{`
        .panorama-mask {
          mask-image: radial-gradient(ellipse 80% 100% at center, black 60%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 100% at center, black 60%, transparent 100%);
        }
        .panorama-mask .swiper-button-next,
        .panorama-mask .swiper-button-prev {
          color: white !important;
        }
        .panorama-mask .swiper-pagination-bullet {
          background: white;
        }
        .panorama-mask .swiper-pagination-bullet-active {
          background: #C2A37E;
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto panorama-mask">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1.5}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false, // false = derecha a izquierda (default)
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          speed={800}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={src}
                  alt={`Panorama ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PanoramaSlider;
