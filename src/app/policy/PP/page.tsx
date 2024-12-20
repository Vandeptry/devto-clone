//src/app/policy/PP/page.tsx
import React from 'react';

export default function page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chính sách bảo mật</h1>
      <p>
        Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. 
        Chính sách này mô tả cách chúng tôi thu thập, sử dụng và chia sẻ thông tin của bạn.
      </p>
      <ul className="list-disc ml-6">
        <li>Chúng tôi thu thập thông tin bạn cung cấp khi tạo tài khoản, đăng bài viết, hoặc tương tác với nền tảng.</li>
        <li>Chúng tôi sử dụng thông tin này để cung cấp dịch vụ, cải thiện nền tảng, và liên lạc với bạn.</li>
        <li>Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba trừ khi được pháp luật yêu cầu hoặc có sự đồng ý của bạn.</li>
      </ul>
      <p className="mt-4">
        Vui lòng đọc toàn bộ chính sách bảo mật của chúng tôi để biết thêm chi tiết.
      </p>
    </div>
  );
}