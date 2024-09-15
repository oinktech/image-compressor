// 圖片壓縮系統
(function() {
    // 創建一個圖片壓縮函數
    function compressImage(file, quality = 0.1) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // 設置canvas的寬高
                    canvas.width = img.width;
                    canvas.height = img.height;

                    // 在canvas上繪製圖片
                    ctx.drawImage(img, 0, 0);

                    // 壓縮圖片並轉換為blob
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/jpeg', quality);
                };
                img.src = event.target.result;
            };
            reader.onerror = function() {
                reject(new Error('圖片讀取錯誤'));
            };
            reader.readAsDataURL(file);
        });
    }

    // 創建一個用戶界面
    document.addEventListener('DOMContentLoaded', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'block';
        input.style.margin = '10px auto';

        const output = document.createElement('img');
        output.style.display = 'block';
        output.style.margin = '10px auto';
        output.style.maxWidth = '100%';

        document.body.appendChild(input);
        document.body.appendChild(output);

        input.addEventListener('change', async () => {
            if (input.files && input.files[0]) {
                try {
                    const compressedBlob = await compressImage(input.files[0]);
                    const url = URL.createObjectURL(compressedBlob);
                    output.src = url;
                } catch (error) {
                    console.error(error);
                }
            }
        });
    });
})();
