import { File } from 'lucide-react';

export function NoDataFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-8">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <File className="w-8 h-8 text-gray-500" />
      </div>
      <p className="text-gray-500">아직 데이터가 없습니다.</p>
    </div>
  );
}
