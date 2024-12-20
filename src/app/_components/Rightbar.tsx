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
  { name: 'career', url: '/t/career' },
  { name: 'learning', url: '/t/learning' },
  { name: 'git', url: '/t/git' },
  { name: 'github', url: '/t/github' },
  { name: 'software-development', url: '/t/software-development' },
  { name: 'cloud-computing', url: '/t/cloud-computing' },
  { name: 'mobile-development', url: '/t/mobile-development' },
  { name: 'android', url: '/t/android' },
  { name: 'ios', url: '/t/ios' },
  { name: 'design', url: '/t/design' },
  { name: 'ux', url: '/t/ux' },
  { name: 'ui', url: '/t/ui' },
];

const Rightbar = () => {
  return (
    <aside className="w-96 bg-gray-50 rounded-md shadow p-4 hidden lg:block">
      <h2 className="text-lg font-medium mb-4">Popular Tags</h2>
      <ul className="space-y-2">
        {tags.map((tag) => (
          <li key={tag.name}>
            <Link
              href={tag.url}
              className="text-gray-800 hover:text-blue-500 block"
            >
              #{tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Rightbar;