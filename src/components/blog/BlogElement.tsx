import styles from './BlogElement.module.css';
import Tags from './Tags.tsx';

type AppProps = {
  title: string;
  date: string;
  link: string;
  tags: string[];
}

function BlogElement(props: AppProps) {
  return <>
      <li className={styles.blogElement}>
        <a href={props.link} className={styles.link}>
          <div className={styles.blogHeader}>
            <h3 className={styles.h3}>{props.title}</h3>
            <span>{props.date}</span>
          </div>
          <Tags tags={props.tags} />
        </a>
      </li>
  </>
}

export default BlogElement;