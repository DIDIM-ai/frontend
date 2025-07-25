import Lottie from 'lottie-react';
import loadingAnimation from '@/public/assets/lottie/loading.json';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Lottie animationData={loadingAnimation} loop className="w-50 h-50" />
      <h3 className="text-xl">데이터를 불러오는 중...</h3>
    </div>
  );
}
