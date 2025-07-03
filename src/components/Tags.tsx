import styles from './Tags.module.css'

type TagProps = {
  tags: string[];
}

function Tags(props: TagProps) {
  // if not last element, add a comma

  return <div className={styles.tagLine}>
    <div className={styles.tagIdentifier}>
      Tags
    </div>
    {
      <div className={styles.tagContainer}>
        {
          props.tags.map((tag) => <span className={styles.tag} key={tag}>{tag}</span>)
        }
      </div>
    }
  </div>;
}

export default Tags;