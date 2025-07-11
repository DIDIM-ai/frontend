import { Send } from 'lucide-react';

export function TextInput() {
  return (
    <div className="absolute bottom-[5px] left-2.5 w-[calc(100%-20px)]">
      <div className="relative">
        <input
          type="text"
          placeholder="궁금한 내용을 물어보세요!"
          className="w-full h-[50px] border border-gray-300 rounded-sm px-4"
        />
        <Send className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer" />
      </div>
    </div>
  );
}
