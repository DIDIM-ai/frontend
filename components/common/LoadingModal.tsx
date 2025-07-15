interface ModalProps {
  title: string;
  desc: string;
}

export function LoadingModal({ title, desc }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-99">
      <div className="bg-white px-10 py-15 rounded-lg flex flex-col items-center">
        <div className="w-16 h-16 relative bg-zinc-100 rounded overflow-hidden mb-5">
          <div className="loader-before absolute left-0 w-10 h-10 bg-orange-300 transform rotate-45 translate-x-[30%] translate-y-[40%] shadow-[32px_-34px_0_5px_#ff3d00]"></div>
          <div className="loader-after absolute left-2.5 top-2.5 w-4 h-4 bg-red-600 rounded-full origin-[35px_145px]"></div>
        </div>
        <p className="text-xl font-semibold pb-2">{title}</p>
        <p className="text-gray-400">{desc}</p>
      </div>
    </div>
  );
}
