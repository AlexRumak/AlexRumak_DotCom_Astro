import styles from './Tags.module.css'

type TagProps = {
  tags: string[];
}

function Tags(props: TagProps) {
  // if not last element, add a comma

  return <div className={styles.p}><span className={styles.span}>Tags</span>
    {
      props.tags.map((tag) => {      
        return <>
          <span className={styles.tag} key={tag}>{tag}</span>
        </>;
      })
    }
  </div>;
}

export default Tags;