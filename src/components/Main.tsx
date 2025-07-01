import AboutMe from './content/AboutMe.tsx';

function Main() {
  return <>
    <div className='maincontainer'>
      <article className='article'>
        <h2 className="h2">Welcome to my website</h2>
        <p>This is a simple Astro site to showcase my projects and blog posts.</p>
        <p>Feel free to explore the links in the header.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis magnam commodi facere qui amet magni, inventore nulla dignissimos, ipsa dolor fuga deleniti ratione consequuntur ullam sequi obcaecati nam unde harum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis magnam commodi facere qui amet magni, inventore nulla dignissimos, ipsa dolor fuga deleniti ratione consequuntur ullam sequi obcaecati nam unde harum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis magnam commodi facere qui amet magni, inventore nulla dignissimos, ipsa dolor fuga deleniti ratione consequuntur ullam sequi obcaecati nam unde harum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis magnam commodi facere qui amet magni, inventore nulla dignissimos, ipsa dolor fuga deleniti ratione consequuntur ullam sequi obcaecati nam unde harum.</p> 
      </article>
      <AboutMe />
    </div>
  </>
}

export default Main;