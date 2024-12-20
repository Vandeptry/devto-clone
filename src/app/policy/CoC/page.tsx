//src/app/policy/CoC/page.tsx
import React from 'react';

export default function page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quy tắc ứng xử</h1>
      <p>
        Chúng tôi mong muốn tạo ra một cộng đồng thân thiện và tôn trọng lẫn nhau. 
        Vui lòng tuân thủ các quy tắc sau khi sử dụng nền tảng của chúng tôi:
      </p>
      <ul className="list-disc ml-6">
        <li>Tôn trọng người khác, không sử dụng ngôn từ xúc phạm, quấy rối, hoặc phân biệt đối xử.</li>
        <li>Không đăng tải nội dung vi phạm pháp luật, khiêu dâm, hoặc bạo lực.</li>
        <li>Không spam, quảng cáo, hoặc lừa đảo.</li>
      </ul>
      <p className="mt-4">
        Việc vi phạm các quy tắc này có thể dẫn đến việc tài khoản của bạn bị khóa.
      </p>
    </div>
  );
}
