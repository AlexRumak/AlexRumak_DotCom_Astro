import styles from './Tags.module.css'

type TagProps = {
  tags: string[];
}

function Tags(props: TagProps) {
  // if not last element, add a comma

  return <p className={styles.p}><span className={styles.span}>Tags</span>
    {
      props.tags.map((tag) => {      
        return <>
          <span className={styles.tag} key={tag}>{tag}</span>
        </>;
      })
    }
  </p>;
}

export default Tags;