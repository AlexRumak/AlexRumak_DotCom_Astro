import type { Key } from "react";
import BlogElement from "./BlogElement.tsx";
import styles from "./BlogList.module.css";
import { getCollection } from 'astro:content';

async function BlogList() {
  const blogPosts = await getCollection('blog');
  blogPosts.sort((a, b) => {
    return a.data.order - b.data.order;
  })

  return (
    <div className={styles.blogListContainer}>
      <div className={styles.blogHeader}>
        <h2 className={styles.h2}>Blog List</h2>
      </div>
      <ul className={styles.blogList}>
        {
          blogPosts.map((post) => (
            <BlogElement
              key={post.data.id as Key}
              title={post.data.title}
              date={post.data.createdDate?.toLocaleDateString() || 'Unknown Date'}
              link={`/blog/${post.data.slug}`}
              tags={post.data.tags || []} />
          ))
        }
      </ul>
    </div>
  )
}

export default BlogList;