import type { Key } from "react";
import BlogElement from "./BlogElement.tsx";
import styles from "./BlogList.module.css";

import React, { useState } from 'react';

type BlogListProps = {
  blogPosts: any[]; 
}

function BlogList(props: BlogListProps) {
  const [page, setPage] = useState(1);

  const blogPosts = props.blogPosts || [];

  blogPosts.sort((a, b) => {
    return a.data.order - b.data.order;
  })

  function nextPage() {
    // Logic to handle pagination
    setPage((prevPage) => {
      const totalPages = Math.ceil(blogPosts.length / 5);
      return prevPage < totalPages ? prevPage + 1 : prevPage;
    });
  }

  function previousPage() {
    console.log("Previous page not implemented yet");
  }

  let paginationControls = <></>;
  if (blogPosts.length > 5) {
    // paginate the blog posts to show only the first 5
    paginationControls = <>
      <div className={styles.paginationControls}>
        <span className={styles.pageInfo}>
          Page {page} of {Math.ceil(blogPosts.length / 5)}
        </span>

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