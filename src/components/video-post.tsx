'use client'

import { useState, useRef, useEffect } from 'react';
// import Image from 'next/image'
import { Post, User } from '@/types/db';
import { LucideMic, LucideMicOff, LucidePause, LucidePlay } from 'lucide-react';

interface Props {
  post: Post,
  user: User
}

const VideoPost = ({ post, user }: Props) => {
  user
  // const thumbnailUrl = post?.thumbnail?.image
  const videoUrl = post?.video ?? ''
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  // const [showThumbnail, setShowThumbnail] = useState(true);
  const [lastTap, setLastTap] = useState(0);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video?.pause();
    } else {
      video?.play();
      // setShowThumbnail(false);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current!;
    video.muted = !video?.muted;
    setIsMuted(!isMuted);
  };

  const handleDoubleTap = (direction: 'left' | 'right') => {
    const currentTime = new Date().getTime();
    const tapGap = currentTime - lastTap;

    if (tapGap < 300 && tapGap > 0) {
      const video = videoRef.current!;
      if (direction === 'right') {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
      } else if (direction === 'left') {
        video.currentTime = Math.max(0, video.currentTime - 10);
      }
    }
    setLastTap(currentTime);
  };

  useEffect(() => {
    const videoElement = videoRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement?.play();
          // setShowThumbnail(false);
          setIsPlaying(true);
        } else {
          videoElement?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* {showThumbnail && (
        <Image
          src={thumbnailUrl ?? ''}
          alt="video thumbnail"
          className="w-full aspect-square md:max-w-[500px] object-cover rounded-t border"
          width={500}
          height={500}
        />
      )} */}

      <video
        ref={videoRef}
        src={videoUrl}
        muted={isMuted}
        loop
        className={`w-full aspect-square md:max-w-[500px] rounded-t object-cover peer border cursor-pointer ${''}`}
        playsInline
        preload="auto"
        onClick={togglePlayPause}
      />

      <button
        onClick={togglePlayPause}
        className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white aspect-square h-10 w-10 rounded-full flex items-center justify-center cursor-pointer"
      >
        {isPlaying ? <LucidePause /> : <LucidePlay />}
      </button>

      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white aspect-square h-10 w-10 rounded-full flex items-center justify-center cursor-pointer"
      >
        {isMuted ? <LucideMicOff /> : <LucideMic />}
      </button>

      <div className="absolute inset-0 justify-between items-center hidden">
        <div
          className="w-1/2 h-full"
          onDoubleClick={() => handleDoubleTap('left')}
        />
        <div
          className="w-1/2 h-full"
          onDoubleClick={() => handleDoubleTap('right')}
        />
      </div>
    </div>
  );
};

export default VideoPost;