//src/app/policy/ToU/page.tsx
import React from 'react';

export default function page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Điều khoản sử dụng</h1>
      <p>
        Vui lòng đọc kỹ các điều khoản sử dụng này trước khi sử dụng nền tảng của chúng tôi.
      </p>
      <ul className="list-disc ml-6">
        <li>Bạn phải đủ 13 tuổi trở lên để sử dụng nền tảng này.</li>
        <li>Bạn chịu trách nhiệm về nội dung bạn đăng tải.</li>
        <li>Chúng tôi có quyền xóa bỏ bất kỳ nội dung nào vi phạm điều khoản sử dụng.</li>
      </ul>
      <p className="mt-4">
        Bằng cách sử dụng nền tảng này, bạn đồng ý với các điều khoản sử dụng của chúng tôi.
      </p>
    </div>
  );
}
