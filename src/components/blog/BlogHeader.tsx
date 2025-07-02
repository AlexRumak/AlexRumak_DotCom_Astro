import syles from './BlogHeader.module.css';
import Tags from './Tags.tsx';

type HeaderProps = {
  title: string;
  tags: string[];
}

function BlogHeader(props: HeaderProps) {
  return (
    <header className={syles.header}>
      <h1 className={syles.h1}>{props.title}</h1>
      <Tags tags={props.tags} />
    </header>
  )
}

export default BlogHeader;