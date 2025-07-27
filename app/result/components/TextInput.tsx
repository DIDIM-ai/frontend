import { Send } from 'lucide-react';

export function TextInput() {
  return (
    <div className="absolute bottom-[5px] left-2.5 w-[calc(100%-20px)]">
      <div className="relative">
        <input
          type="text"
          placeholder="멤버십 서비스를 준비 중입니다."
          disabled
          className="bg-gray-100 w-full h-[50px] border border-gray-300 rounded-sm px-4"
        />
        <Send className="absolute text-gray-500 top-1/2 right-4 -translate-y-1/2" />
      </div>
    </div>
  );
}
