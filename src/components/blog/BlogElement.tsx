import styles from './BlogElement.module.css';

type AppProps = {
  title: string;
  date: string;
  link: string;
  tags: string[];
}

type TagProps = {
  tags: string[];
}

function Tags(props: TagProps) {
  // if not last element, add a comma

  return <p><span className={styles.span}>Tags</span>
    {
      props.tags.map((tag, index) => {      
        return <>
          <span className={styles.tag} key={tag}>{tag}</span>
          {index != props.tags.length - 1 ? ' ' : ''}
        </>;
      })
    }
  </p>;
}

function BlogElement(props: AppProps) {
  return <>
      <li className={styles.blogElement}>
        <a href={props.link} className={styles.link}>
          <h3 className={styles.h3}>{props.title}</h3>
          <Tags tags={props.tags} />
          <div className={styles.lineOne}>
          </div>
        </a>
      </li>
  </>
}

export default BlogElement;