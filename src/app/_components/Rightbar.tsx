// src/components/rightbar/Rightbar.tsx
import Link from 'next/link';

interface Tag {
  name: string;
  url: string;
}

const tags: Tag[] = [
  { name: 'webdev', url: '/t/webdev' },
  { name: 'javascript', url: '/t/javascript' },
  { name: 'programming', url: '/t/programming' },
  { name: 'beginners', url: '/t/beginners' },
  { name: 'tutorial', url: '/t/tutorial' },
  { name: 'ai', url: '/t/ai' },
  { name: 'devops', url: '/t/devops' },
  { name: 'python', url: '/t/python' },
  { name: 'react', url: '/t/react' },
  { name: 'productivity', url: '/t/productivity' },
  { name: 'css', url: '/t/css' },
  { name: 'html', url: '/t/html' },
  { name: 'nodejs', url: '/t/nodejs' },
  { name: 'backend', url: '/t/backend' },
  { name: 'frontend', url: '/t/frontend' },
  { name: 'database', url: '/t/database' },
  { name: 'security', url: '/t/security' },
  { name: 'testing', url: '/t/testing' },
  // { name: 'career', url: '/t/career' },
  // { name: 'learning', url: '/t/learning' },
  // { name: 'git', url: '/t/git' },
  // { name: 'github', url: '/t/github' },
  // { name: 'software-development', url: '/t/software-development' },
  // { name: 'cloud-computing', url: '/t/cloud-computing' },
  // { name: 'mobile-development', url: '/t/mobile-development' },
  // { name: 'android', url: '/t/android' },
  // { name: 'ios', url: '/t/ios' },
  // { name: 'design', url: '/t/design' },
  // { name: 'ux', url: '/t/ux' },
  // { name: 'ui', url: '/t/ui' },
];

const newItems = [
  {
    title: "best os for coding",
    comments: 6,
  },
  {
    title: "What was your win this week?",
    comments: 13,
  },
  {
    title: "Chaos Engineering for Java Microservices: Break It Before It Breaks You",
    new: true, 
  },
  {
    title: "Runtime Type Checking with Zod in a front-end application",
    new: true, 
  },
  {
    title: "SaaS Founders: Satya Nadella is wrong about AI Agents!?",
    new: true, 
  },
];


const Rightbar = () => {
  return (
    <aside className="w-30 ">
      <div className="flex flex-col space-y-6">
        {/* Popular Tags */}
        <div className="bg-gray-200 rounded-md p-4 shadow-lg shadow-gray-300 ">
          <h2 className="text-lg font-medium mb-4">Popular Tags</h2>
          <div className="flex flex-col gap-1.5">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={tag.url}       
              >
               <span  className="text-gray-800 hover:text-blue-500 transition-all duration-100 ease-linear"> #{tag.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* #discuss */}
        <div className="bg-gray-200 rounded-md p-4 shadow-lg shadow-gray-300">
          <h2 className="text-lg font-medium mb-4">#discuss</h2>
          <p className="text-sm text-gray-600">
            Discussion threads targeting the whole community
          </p>
          <div className="flex flex-col gap-1.5 mt-2">
            {newItems.map((item, index) => (
              <Link
                key={index}
                href="#"
               
              >
                <div  className="text-gray-800 hover:text-red-700 transition-all duration-200 ease-linear">
                  {item.title}
                  {item.comments && (
                    <span className="text-gray-500 text-xs ml-2">
                      {item.comments} comments
                    </span>
                  )}
                </div>
                {item.new && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-2">
                    New
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Rightbar;