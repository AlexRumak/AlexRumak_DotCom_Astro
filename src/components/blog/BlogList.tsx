import type { Key } from "react";
import BlogElement from "./BlogElement.tsx";
import styles from "./BlogList.module.css";
import { getCollection } from 'astro:content';

async function BlogList() {
  const blogPosts = await getCollection('blog');
  blogPosts.sort((a, b) => {
    return a.data.order - b.data.order;
  })

  function nextPage() {
    // Logic to handle pagination
    console.log("Next page not implemented yet");
  }

  function previousPage() {
    console.log("Previous page not implemented yet");
  }

  let paginationControls = <></>;
  if (blogPosts.length > 5) {
    // paginate the blog posts to show only the first 5
    paginationControls = <>
      <div className={styles.paginationControls}>
        <button className={styles.button} onClick={previousPage}>
           &lt;
        </button>
        <button className={styles.button} onClick={nextPage}>
           &gt;
        </button>
      </div>
    </>
  }

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
      {paginationControls}
    </div>
  )
}

export default BlogList;