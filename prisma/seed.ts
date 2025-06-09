import { prisma } from "../db/src/index";
const blogs = [
  {
    title: "Getting Started with Next.js 15",
    content: `Next.js 15 brings exciting new features and improvements that make building web applications even more enjoyable. The latest version includes significant performance improvements, with faster build times and optimized runtime performance. Better error messages, enhanced debugging tools, and streamlined development workflow make coding more efficient. The App Router has been further refined with new capabilities for complex routing scenarios. To create a new Next.js 15 project, you can use the create-next-app command which will set up everything you need. This version represents a significant step forward in web development, offering developers powerful tools to build fast, scalable applications with ease. The community has embraced these changes and the ecosystem continues to grow stronger.`,
    userId: "1",
    author: "Ashutosh",
  },
  {
    title: "React Best Practices for 2024",
    content: `React continues to evolve, and with it, the best practices for building robust applications. Component composition is preferred over prop drilling to create flexible and reusable components. Custom hooks help extract complex logic and promote reusability and separation of concerns. Error boundaries should be implemented to gracefully handle errors and improve user experience. Performance optimization using React.memo, useMemo, and useCallback should be used judiciously without over-optimization. TypeScript integration provides better developer experience and fewer runtime errors. These practices will help you build better React applications that are easier to maintain and scale over time.`,
    userId: "1",
    author: "Ashutosh",
  },
  {
    title: "Web Design Trends That Will Dominate 2024",
    content: `Web design is constantly evolving, and 2024 brings fresh trends that prioritize user experience and visual appeal. Clean, uncluttered interfaces continue to dominate, focusing on essential elements and white space. Dark mode isn't just a preference anymore, it's an expectation when designing for both light and dark themes. Small animations and interactions provide feedback and enhance user engagement throughout the interface. Eco-friendly design practices reduce digital carbon footprint while maintaining functionality. AI-powered personalization leverages machine learning to create personalized user experiences that adapt to individual preferences and behaviors.`,
    userId: "1",
    author: "Ashutosh",
  },
];

async function main() {
  const Blogs = await prisma.blog.createMany({
    data: blogs,
  });
  console.log("blogs created: ", Blogs);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
