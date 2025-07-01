import styles from './BlogElement.module.css';

type AppProps = {
  title: string;
  date: string;
  link: string;
  tags: string[];
}

function BlogElement(props: AppProps) {
  return <>
      <li className={styles.blogElement}>
        <h2>{props.title}</h2>
        <p>{props.date}</p>
        <a href={props.link} target="_blank" rel="noopener noreferrer">Read more</a>
        <p>Tags: {props.tags.join(', ')}</p>
      </li>
  </>
}

export default BlogElement;