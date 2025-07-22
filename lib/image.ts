export const resizeImage = (file: File, maxSize = 300): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = maxSize / Math.max(img.width, img.height);
      const width = img.width * scale;
      const height = img.height * scale;

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
        resolve(resizedFile);
      }, 'image/jpeg', 0.8);

    };

    reader.readAsDataURL(file);
    
  });
};

