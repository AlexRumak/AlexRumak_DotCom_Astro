
type ResumeProps = {
  company: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  bullets: string[];
}

function ResumeElement(props: ResumeProps) {
  return <>
    <li>
      <h3>Position: {props.title}</h3>
      <p>Company: {props.company}</p>
      <p>Location: {props.location}</p>
    </li>
  </>;
}

export default ResumeElement;